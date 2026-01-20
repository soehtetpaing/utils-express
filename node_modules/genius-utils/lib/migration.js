import sql from 'mssql';
import Connection from '../config/connection.js';
import CommonHandler from './common.js';
import MediaHandler from './media.js';
import DateTimeHandler from './datetime.js';
import LogHandler from './log.js';

// version migration thread by Genius iQ @20251110
export async function migrateVersion(databaseInfo = {}, migrateInfo = {}) {
    const { name, version, depth } = migrateInfo;
    const projectName = (process.env.PJ_NAME || 'GeniusUtils') + '@' + (process.env.VERSION || 'Prod');
    const deviceInfo = CommonHandler.getDeviceInfo();
    const requestBy = (name || deviceInfo.hostname) + '@' + (version || deviceInfo.userInfo.username);

    const databaseType = (databaseInfo.type || '').toLowerCase();
    let pool = null;
    let migrateVersion = '1.0.0';
    const logInfo = {
        filepath: "logs",
        filename: "VersionMigrateLog",
        projectName,
        className: "Migration",
        methodName: "migrateVersion",
        requestBy
    };
    let result = {
        status: 500,
        message: 'Migrate version fail!'
    };

    try {
        migrateInfo.logging = true;
        pool = await Connection.createTemp(databaseInfo, migrateInfo);  
        
        if (!pool) {
            // logging
            result.message = 'Connection create fail!';
            await LogHandler.log(logInfo, migrateInfo, result);
            return result;
        }

        // compare versions
        if (databaseType === 'mssql') {
            const query = 'SELECT TOP 1 t1 FROM vac001 ORDER BY autokey DESC';
            const rows = await pool.request().query(query);
            if (rows.recordset.length)  migrateVersion = rows.recordset[0].t1;

        } else if (databaseType === 'postgre' || databaseType === 'pg') {
            const query = 'SELECT t1 FROM vac001 ORDER BY autokey DESC LIMIT 1';
            const data = await pool.query(query);
            if (data.rows.length) migrateVersion = data.rows[0].t1;   

        } else if (databaseType === 'mysql') {
            const query = 'SELECT t1 FROM vac001 ORDER BY autokey DESC LIMIT 1';
            const [rows] = await pool.query(query);
            if (rows.length) migrateVersion = rows[0].t1;

        }

        let compare = compareVersions(version, migrateVersion, depth);
        if (compare <= 0) {
            // logging
            result = {
                status: 201,
                message: 'No need to migrate!'
            };
            await LogHandler.log(logInfo, migrateInfo, result);
            return result;
        }

        // insert data to version migration hdr
        const hdrSyskey = CommonHandler.getSyskey();
        const createdDate = DateTimeHandler.getMyanmarDateTime();
        const createdUser = deviceInfo.hostname + '@' + deviceInfo.userInfo.username;
        if (databaseType === 'mssql') {
            const query = 'INSERT INTO vac001 (syskey, createddate, createduser, t1) VALUES (@1, @2, @3, @4)';
            await pool.request()
            .input('1', sql.BigInt, hdrSyskey)
            .input('2', sql.VarChar(50), createdDate)
            .input('3', sql.VarChar(50), createdUser)
            .input('4', sql.VarChar(50), version)
            .query(query);

        } else if (databaseType === 'postgre' || databaseType === 'pg') {
            const query = 'INSERT INTO vac001 (syskey, createddate, createduser, t1) VALUES ($1, $2, $3, $4)';
            await pool.query(query, [hdrSyskey, createdDate, createdUser, version]);

        } else if (databaseType === 'mysql') {
            const query = 'INSERT INTO vac001 (syskey, createddate, createduser, t1) VALUES (?, ?, ?, ?)';
            await pool.query(query, [hdrSyskey, createdDate, createdUser, version]);

        }

        let ver = migrateVersion.split('.').map(Number);
        while (compare > 0) {
            let major = (ver[depth - 1] || 0)  + 1;
            ver[depth - 1] = major;
            const fileVer = ver.slice().join('.');

            // check sql file exists
            const SQL_FILENAME = `${databaseType}_${name.replace(' ', '_').toLowerCase()}_v${fileVer}.sql`;
            const SQL_FILE = MediaHandler.getMediaWithDirectory('migration', SQL_FILENAME);
            const FILE_EXIST = MediaHandler.mediaExists(SQL_FILE);

            if (!FILE_EXIST) {
                // logging
                result = {
                    status: 404,
                    message: `.\\migration\\${SQL_FILENAME} does not exist!`
                };
                await LogHandler.log(logInfo, migrateInfo, result);
                return result;
            }

            // insert data to version migration dtl        
            const TEXT = await MediaHandler.readText(SQL_FILE);
            const QUERIES = TEXT.split(';').map(q => q.trim()).filter(q => q.length);

            for (const query of QUERIES) {
                try {
                    if (databaseType === 'mssql') 
                        await pool.request().query(query);
                    else 
                        await pool.query(query);

                    const dtl = {
                        dtlSyskey: CommonHandler.getSyskey(),
                        createdDate: DateTimeHandler.getMyanmarDateTime(),
                        createdUser,
                        scriptName: SQL_FILENAME,
                        status: 200,
                        message: '',
                        dtlQuery: query,
                        hdrSyskey,
                        databaseType,
                        projectName,
                        requestBy
                    };

                    await insertDetail(pool, dtl); 
                } catch (err) {
                    const dtl = {
                        dtlSyskey: CommonHandler.getSyskey(),
                        createdDate: DateTimeHandler.getMyanmarDateTime(),
                        createdUser,
                        scriptName: SQL_FILENAME,
                        status: 400,
                        message: err.message,
                        dtlQuery: query,
                        hdrSyskey,
                        databaseType,
                        projectName,
                        requestBy
                    };
                    
                    await insertDetail(pool, dtl); 
                }
            }

            compare--;
        }        
            
        // logging
        result = {
            status: 200,
            message: 'Version migration success.'
        };
        await LogHandler.log(logInfo, migrateInfo, result);
        return result;

    } catch (err) {
        // logging
        await LogHandler.log(logInfo, migrateInfo, result, err.message);
        return result;
    } finally {
        // close connection
        if (pool) {
            if (databaseType === 'mssql' && pool.close)
                await pool.close();
            else if (databaseType !== 'mssql' && pool.end)
                await pool.end();
        }
    }
       
}

async function insertDetail(pool, dtl = {}) {
    try {
        const { dtlSyskey, createdDate, createdUser, scriptName, status, message, dtlQuery, hdrSyskey, databaseType } = dtl;

        if (databaseType === 'mssql') {
            const query = 'INSERT INTO vac002 (syskey, createddate, createduser, t1, n1, t2, t3, n2) VALUES (@1, @2, @3, @4, @5, @6, @7, @8)';
            await pool.request()
            .input('1', sql.BigInt, dtlSyskey)
            .input('2', sql.VarChar(50), createdDate)
            .input('3', sql.VarChar(50), createdUser)
            .input('4', sql.VarChar(255), scriptName)
            .input('5', sql.Int, status)
            .input('6', sql.VarChar(255), message)
            .input('7', sql.NVarChar(sql.MAX), dtlQuery)
            .input('8', sql.BigInt, hdrSyskey)
            .query(query);

        } else if (databaseType === 'postgre' || databaseType === 'pg') {
            const query = 'INSERT INTO vac002 (syskey, createddate, createduser, t1, n1, t2, t3, n2) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
            await pool.query(query, [
                dtlSyskey,
                createdDate,
                createdUser,
                scriptName,
                status,
                message,
                dtlQuery,
                hdrSyskey
            ]);

        } else if (databaseType === 'mysql') {
            const query = 'INSERT INTO vac002 (syskey, createddate, createduser, t1, n1, t2, t3, n2) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            await pool.query(query, [
                dtlSyskey,
                createdDate,
                createdUser,
                scriptName,
                status,
                message,
                dtlQuery,
                hdrSyskey
            ]);

        }
        
    } catch (err) {
        // logging
        const { projectName, requestBy } = dtl;
        const logInfo = {
            filepath: "logs",
            filename: "VersionMigrateLog",
            projectName,
            className: "Migration",
            methodName: "insertDetail",
            requestBy
        };
        const result = {
            status: 500,
            message: 'Version migration crash!'
        };
        await LogHandler.log(logInfo, dtl, result, err.message);
    }

}

function compareVersions(version = '', migrateVersion = '', depth = 3) {
    const v1 = version.split('.').map(Number);
    const v2 = migrateVersion.split('.').map(Number);
    // 1.0.21, 1.0.0, 2 => 1 - 1 = 0, 0 - 0 = 0
    // 1.21.22, 1.19.0, 2 => 1 - 1 = 0, 21 - 19 = 2
    // 1.21.22, 1.21.5, 3 => 1 - 1 = 0, 21 - 21 = 0, 22 - 5 = 17
    // 1.0.21, 1.2.0, 2 => 1 - 1 = 0, 0 - 2 = -2

    for (let i = 0; i < depth; i++) {
        const diff = (v1[i] || 0) - (v2[i] || 0);
        if (diff) return diff;
    }
    return 0;
}
