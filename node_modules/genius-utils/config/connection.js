import sql from 'mssql';
import mysql from 'mysql2/promise';
import { Pool } from 'pg';
import AuthHandler from '../lib/auth.js';
import CommonHandler from '../lib/common.js';
import LogHandler from '../lib/log.js';

let logInfo = {};
let logging = false;

// mssql, postgre, mysql connection pool by Genius iQ @20251109
async function create(databaseInfo = {}, projectInfo = {}) {
    // logging
    const projectName = (process.env.PJ_NAME || 'GeniusUtils') + '@' + (process.env.VERSION || 'Prod');
    const deviceInfo = CommonHandler.getDeviceInfo();
    const requestBy = (projectInfo.name || deviceInfo.hostname) + '@' + (projectInfo.version || deviceInfo.userInfo.username);

    logInfo = {
        filepath: "logs",
        filename: "DatabaseConnectLog",
        projectName,
        className: "Connection",
        methodName: "create",
        requestBy
    };

    logging = projectInfo.logging || false;

    let con = null;
    let result = {
        status: 400,
        message: 'Connection create fail!'
    };

    try {            
        if (Object.keys(databaseInfo).length === 0) {
            if (logging) {
                // logging
                LogHandler.log(logInfo, databaseInfo, result, "Empty database info!");
            }

            return null;
        }

        const { secretkey, type, host, port, user, passwordhex, database, options, ssl } = databaseInfo;
        const password = AuthHandler.decrypt(passwordhex, secretkey);

        const databaseType = type.toLowerCase();
        if (databaseType === 'mssql'){
            // options: {
            //     encrypt: false, -- set true for Azure
            //     trustServerCertificate: true, -- use only for dev
            // },
            const pool = new sql.ConnectionPool({
                server: host,
                user,
                password,
                database,
                port: Number(port) || 1433,
                options,
            });

            await pool.connect();
            con = pool;

        } else if (databaseType === 'postgre' || databaseType === 'pg') {
            // ssl: {
            //     rejectUnauthorized: true, 
            //     ca: caCert, 
            // },
            con = new Pool({
                host,
                user,
                password,
                database,
                port: port || 5432,
                ssl,
            });

        } else if (databaseType === 'mysql') {
            con = mysql.createPool({
                host,
                user,
                password,
                database,
                port: port || 3306,
            });

        } else {
            if (logging) {
                // logging
                result.status = 401;
                await LogHandler.log(logInfo, databaseInfo, result, `Unsupported database type: ${databaseType}!`);
            }

            return null;
        }

        if (logging) {
            // logging
            result = {
                status: 200,
                message: 'Connection create succes.'
            };
            await LogHandler.log(logInfo, databaseInfo, result);
        }

        return con;

    } catch (err) {
        if (logging) {
            // logging
            result.status = 500;
            await LogHandler.log(logInfo, databaseInfo, result, err.message);
        }

        return null;
    }
}

async function createTemp(databaseInfo = {}, projectInfo = {}) {
    // logging
    const projectName = (process.env.PJ_NAME || 'GeniusUtils') + '@' + (process.env.VERSION || 'Prod');
    const deviceInfo = CommonHandler.getDeviceInfo();
    const requestBy = (projectInfo.name || deviceInfo.hostname) + '@' + (projectInfo.version || deviceInfo.userInfo.username);

    logInfo = {
        filepath: "logs",
        filename: "DatabaseConnectLog",
        projectName,
        className: "Connection",
        methodName: "create",
        requestBy
    };

    logging = projectInfo.logging || false;

    let con = null;
    let result = {
        status: 400,
        message: 'Connection create fail!'
    };

    try {            
        if (Object.keys(databaseInfo).length === 0) {
            if (logging) {
                // logging
                LogHandler.log(logInfo, databaseInfo, result, "Empty database info!");
            }

            return null;
        }

        // create db, vac001, vac002 IF NOT EXISTS
        await init(databaseInfo);

        const { secretkey, type, host, port, user, passwordhex, database, options, ssl } = databaseInfo;
        const password = AuthHandler.decrypt(passwordhex, secretkey);

        const databaseType = type.toLowerCase();
        if (databaseType === 'mssql'){
            // options: {
            //     encrypt: false, -- set true for Azure
            //     trustServerCertificate: true, -- use only for dev
            // },
            const pool = new sql.ConnectionPool({
                server: host,
                user,
                password,
                database,
                port: Number(port) || 1433,
                options,
            });

            await pool.connect();
            con = pool;

        } else if (databaseType === 'postgre' || databaseType === 'pg') {
            // ssl: {
            //     rejectUnauthorized: true, 
            //     ca: caCert, 
            // },
            con = new Pool({
                host,
                user,
                password,
                database,
                port: port || 5432,
                ssl,
            });

        } else if (databaseType === 'mysql') {
            con = mysql.createPool({
                host,
                user,
                password,
                database,
                port: port || 3306,
            });

        } else {
            if (logging) {
                // logging
                result.status = 401;
                await LogHandler.log(logInfo, databaseInfo, result, `Unsupported database type: ${databaseType}!`);
            }

            return null;
        }

        if (logging) {
            // logging
            result = {
                status: 200,
                message: 'Connection create succes.'
            };
            await LogHandler.log(logInfo, databaseInfo, result);
        }

        return con;

    } catch (err) {
        if (logging) {
            // logging
            result.status = 500;
            await LogHandler.log(logInfo, databaseInfo, result, err.message);
        }

        return null;
    }
}

// create db, vac001, vac002 IF NOT EXISTS
async function init(databaseInfo) {
    try {
        const { secretkey, type, host, port, user, passwordhex, database, options, ssl } = databaseInfo;
        const password = AuthHandler.decrypt(passwordhex, secretkey);

        const databaseType = type.toLowerCase();
        if (databaseType === 'mssql') {
            const pool = new sql.ConnectionPool({
                server: host,
                user,
                password,
                port: Number(port) || 1433,
                options,
            });

            await pool.connect();

            // check and create db
            const rows = await pool.request()
                .query(`SELECT name FROM sys.databases WHERE name = '${database}'`);
            if (rows.recordset.length === 0) 
                await pool.request().query(`CREATE DATABASE [${database}]`);

            // connection with db
            const dbPool = new sql.ConnectionPool({
                ...pool.config,
                database,
            });

            await dbPool.connect();

            // create version migration tables if not exists
            await dbPool.request().query(`
                IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='vac001' AND xtype='U')
                CREATE TABLE vac001 (
                    syskey BIGINT NOT NULL DEFAULT 0,
                    autokey BIGINT IDENTITY(1,1) NOT NULL,
                    createddate VARCHAR(50) NOT NULL DEFAULT '',
                    createduser VARCHAR(50) DEFAULT '',
                    t1 VARCHAR(50) NOT NULL DEFAULT '',
                    PRIMARY KEY (syskey),
                );

                IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='vac002' AND xtype='U')
                CREATE TABLE vac002 (
                    syskey BIGINT NOT NULL DEFAULT 0,
                    autokey BIGINT IDENTITY(1,1) NOT NULL,
                    createddate VARCHAR(50) NOT NULL DEFAULT '',
                    createduser VARCHAR(50) DEFAULT '',
                    t1 VARCHAR(255) NOT NULL DEFAULT '',
                    n1 INT DEFAULT 0,
                    t2 VARCHAR(255) NOT NULL DEFAULT '',
                    t3 NVARCHAR(MAX) NOT NULL DEFAULT '',
                    n2 BIGINT DEFAULT 0,
                    PRIMARY KEY (syskey),
                );
            `);

            await dbPool.close();
            await pool.close();
            
        } else if (databaseType === 'postgre' || databaseType === 'pg') {
            const dbMajor = database;
            const pool = new Pool({
                host,
                user,
                password,
                database: "postgres",
                port: port || 5432,
                ssl,
            });

            // check and create db
            const data = await pool.query(
                `SELECT 1 FROM pg_database WHERE datname = $1`,
                [dbMajor]
            );
            if (data.rowCount === 0) 
                await pool.query(`CREATE DATABASE "${dbMajor}"`);

            // connection with db
            const dbPool = new Pool({
                host,
                user,
                password,
                database: dbMajor,
                port: port || 5432,
                ssl,
            });

            // create version migration tables if not exists
            await dbPool.query(`
                CREATE TABLE IF NOT EXISTS vac001 (
                    syskey BIGINT NOT NULL DEFAULT 0,
                    autokey BIGSERIAL NOT NULL,
                    createddate VARCHAR(50) NOT NULL DEFAULT '',
                    createduser VARCHAR(50) DEFAULT '',
                    t1 VARCHAR(50) NOT NULL DEFAULT '',
                    PRIMARY KEY (syskey)
                );

                CREATE TABLE IF NOT EXISTS vac002 (
                    syskey BIGINT NOT NULL DEFAULT 0,
                    autokey BIGSERIAL NOT NULL,
                    createddate VARCHAR(50) NOT NULL DEFAULT '',
                    createduser VARCHAR(50) DEFAULT '',
                    t1 VARCHAR(255) NOT NULL DEFAULT '',
                    n1 INT DEFAULT 0,
                    t2 VARCHAR(255) NOT NULL DEFAULT '',
                    t3 TEXT NOT NULL DEFAULT '',
                    n2 BIGINT DEFAULT 0,
                    PRIMARY KEY (syskey)
                );
            `);

            await dbPool.end();
            await pool.end();

        } else if (databaseType === 'mysql') {
            const pool = mysql.createPool({
                host,
                user,
                password,
                port: port || 3306,
                waitForConnections: true,
                connectionLimit: 10,                    
            });

            // check and create db
            await pool.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);

            // connection with db
            const dbPool = mysql.createPool({
                ...pool.config.connectionConfig,
                database,
            });

            // create version migration tables if not exists
            await dbPool.query(`
                CREATE TABLE IF NOT EXISTS vac001 (
                    syskey BIGINT NOT NULL DEFAULT 0,
                    autokey BIGINT NOT NULL AUTO_INCREMENT,
                    createddate VARCHAR(50) NOT NULL DEFAULT '',
                    createduser VARCHAR(50) DEFAULT '',
                    t1 VARCHAR(50) NOT NULL DEFAULT '',
                    PRIMARY KEY (syskey),
                    UNIQUE KEY (autokey)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

                CREATE TABLE IF NOT EXISTS vac002 (
                    syskey BIGINT NOT NULL DEFAULT 0,
                    autokey BIGINT NOT NULL AUTO_INCREMENT,
                    createddate VARCHAR(50) NOT NULL DEFAULT '',
                    createduser VARCHAR(50) DEFAULT '',
                    t1 VARCHAR(255) NOT NULL DEFAULT '',
                    n1 INT DEFAULT 0,
                    t2 VARCHAR(255) NOT NULL DEFAULT '',
                    t3 TEXT NOT NULL,
                    n2 BIGINT DEFAULT 0,
                    PRIMARY KEY (syskey),
                    UNIQUE KEY (autokey)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
            `);

            await dbPool.end();
            await pool.end();

        }
            
    } catch (err) {
        if (logging) {
            // logging
            const result = {
                status: 400,
                message: 'Database create fail!'
            };
            await LogHandler.log(logInfo, databaseInfo, result, err.message);
        }
    }
}

const Connection = {
    create,
    createTemp
}

export default Connection;