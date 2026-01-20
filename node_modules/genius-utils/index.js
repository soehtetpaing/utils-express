import AuthHandler from './lib/auth.js';
import CommonHandler from './lib/common.js';
import DateTimeHandler from './lib/datetime.js';
import MediaHandler from './lib/media.js';
import LogHandler from './lib/log.js';
import Connection from './config/connection.js';
import { migrateVersion } from './lib/migration.js';

// CommonHandler
// console.log("syskey: ", CommonHandler.getSyskey());
// console.log("Super Admin: ", CommonHandler.getSuperAdmin());
// console.log("Object to JSON: ", CommonHandler.toJSON(CommonHandler.getSuperAdmin()));
// console.log("Device: ", CommonHandler.getDeviceInfo());
// console.log("Demo User: ", CommonHandler.getDemoUser());


// DateTimeHandler
// console.log("Myanmar Timestamp: ", DateTimeHandler.getMyanmarTimestamp());
// console.log("Myanmar Date: ", DateTimeHandler.getMyanmarDate());
// console.log("Myanmar Hour: ", DateTimeHandler.getMyanmarHour());
// console.log("Myanmar Millisecond: ", DateTimeHandler.getMyanmarMillisecond());   
// console.log("Myanmar Zoned DateTime: ", DateTimeHandler.getMyanmarDateTime());
// console.log("Seoul Zoned DateTime: ", DateTimeHandler.getDateTimeByZone(DateTimeHandler.getMyanmarDateTime(), "Asia/Seoul"));
// console.log("Format API Execute Time: ", DateTimeHandler.formatApiExecuteTime(9999));
// console.log("Format Token Expire Time: ", DateTimeHandler.formatTokenExpireTime(1731171785123))


// MediaHandler
// console.log("Generated Media Name (Image):", MediaHandler.generateMediaName("IMG", "png"));
// console.log("Generated Media Name (Video):", MediaHandler.generateMediaName("VID", "mp4"));
// console.log("Generated Media Name (Text):", MediaHandler.generateMediaName("Log", "txt"));
// console.log("Root Path:", MediaHandler.getRootDirectoryName());
// console.log("User Path:", MediaHandler.getMediaWithDirectory('data', 'user.json'));

// const png = MediaHandler.getMediaWithDirectory('', 'user.png');
// const pp = MediaHandler.getMediaWithDirectory('media', 'pp-default-v1.png');
// const sql = MediaHandler.getMediaWithDirectory('migration', 'mssql_utils_v1.1.0.sql');
// const vid =  MediaHandler.getMediaWithDirectory('media', 'vid-251115.mp4');

// console.log("Image Path:", png);
// console.log(MediaHandler.mediaExists(png));
// console.log("Image Statistics:", await MediaHandler.readMediaStat(pp));
// console.log("Read Text:", await MediaHandler.readText(sql));
// console.log("Read Image as Base64:", await MediaHandler.readImage(pp));
// console.log("Read Video as Stream:", await MediaHandler.readVideo(vid));


// LogHandler
// await LogHandler.log();
// const logInfo = {
//   filepath: "logs",
//   filename: "TokenLog",
//   projectName: "GeniusUtils",
//   className: "login",
//   methodName: "verifyApiToken",
//   requestBy: "demo",
// };
// const apiToken = AuthHandler.generateApiToken("iLoveU");
// const verified = AuthHandler.verifyApiToken(apiToken.token);
// await LogHandler.log(logInfo, apiToken, verified);


// AuthHandler
// console.log("UUID: ", AuthHandler.getUniqueId());
// console.log("Encrypt:", AuthHandler.encrypt("123"));
// console.log("Decrypt:", AuthHandler.decrypt("a2e0548aff2e9c66ddd382dc13b85b24.7adab5796bbaa3f6fe34207d3b99231e"));
// console.log("Decrypt (With Secret):", AuthHandler.decrypt("a2e0548aff2e9c66ddd382dc13b85b24.7adab5796bbaa3f6fe34207d3b99231e", "OhMyGenius!"));

// console.log("Encrypt:", AuthHandler.encrypt("@dminP@ssw0rd", "iLoveU"));
// console.log("Decrypt:", AuthHandler.decrypt("338e11354ec83633cbc3e9027dc5830a.6d0d1783a879677513c41b0ddcd6b826", "iLoveU"));
// console.log("Decrypt (Wrong Secret):", AuthHandler.decrypt("338e11354ec83633cbc3e9027dc5830a.6d0d1783a879677513c41b0ddcd6b826"));

// console.log("API Token:", AuthHandler.generateApiToken());
// console.log("Verify API Token:", AuthHandler.verifyApiToken('304470755248365f336b78.10c2b48c7d15d67448fcf57928c031f0063d60f778a6d2896764d86ee54b2fcf.19a8553ed5b.2a'));
// console.log("Verify API Token (Wrong Secret):", AuthHandler.verifyApiToken("304470755248365f336b78.10c2b48c7d15d67448fcf57928c031f0063d60f778a6d2896764d86ee54b2fcf.19a8553ed5b.2a", "Portfolio"));

// console.log("API Token:", AuthHandler.generateApiToken('iLoveU', 'demo'));
// console.log("Verify API Token:", AuthHandler.verifyApiToken("7666654d5a437852357765.e16673a5394468f03aa1aecbcff79dcb6f37b3ff25305de89f1a8579996ea95e.19a855db3c0.64656d6f", "iLoveU", "demo"));
// console.log("Verify API Token (Wrong Secret):", AuthHandler.verifyApiToken("7666654d5a437852357765.e16673a5394468f03aa1aecbcff79dcb6f37b3ff25305de89f1a8579996ea95e.19a855db3c0.64656d6f", "iLoveU", 'canva'));


// version migration
// const databaseInfo = {
//     secretkey: process.env.SECRET_KEY, // OhMyGenius!
//     type: process.env.DB_TYPE, // mssql, postgre, pg, mysql
//     host: process.env.DB_HOST, // localhost
//     port: process.env.DB_PORT, // 1433
//     user: process.env.DB_USER, // sa
//     passwordhex: process.env.DB_PASS, // encrypt
//     database: process.env.DB_NAME, // GeniusPortfolio
//     options: { // mssql use for Azure
//         encrypt: false,
//         trustServerCertificate: true,
//     },
//     // ssl: { // postgre use for AWS
//     //     rejectUnauthorized: true, 
//     //     ca: caCert, 
//     // }
// };
// const migrateInfo = {
//   name: 'Utils',
//   version: '1.5.0', // major.minor.patch
//   depth: 2, // compare major.minor
//   logging: false // DatabaseConnectLog_20251111.txt
// };

// const pool = await Connection.create(databaseInfo);
// const migrate = await migrateVersion(databaseInfo, migrateInfo);

// try {
//   const data = await pool.query('SELECT * FROM vac001');
//   console.log(data);
// } catch (err) {
//   console.log('Error:', err);
// }


export {
  AuthHandler,
  CommonHandler,
  DateTimeHandler,
  MediaHandler,
  LogHandler,
  Connection,
  migrateVersion
};

export default {
  AuthHandler,
  CommonHandler,
  DateTimeHandler,
  MediaHandler,
  LogHandler,
  Connection,
  migrateVersion
};