import os from 'os';
import AuthHandler from './auth.js';
import DateTimeHandler from './datetime.js';

// get syskey by Genius iQ @20251017
function getSyskey() {
    return DateTimeHandler.getMyanmarTimestamp().substring(2, 17);
}

// get super admin by Genius iQ @20251017
function getSuperAdmin() {
    return {
        syskey: 1,
        autokey: 1,
        createdDate: DateTimeHandler.getMyanmarDateTime(),
        modifiedDate: DateTimeHandler.getMyanmarDateTime(),
        createdUser: "sa",
        modifiedUser: "sa",
        recordStatus: 1,
        userid: "genius.iq",
        username: "Soe Htet Paing",
        uuid: AuthHandler.getUniqueId(),
        password: AuthHandler.encrypt("123"),
        pincode: AuthHandler.encrypt("123")
    };
}

// Object to JSON by Genius iQ @20251017
function toJSON(object) {
    return JSON.stringify(object);
}

// get device info by Genius iQ @20251108
function getDeviceInfo() {
    const networkInterfaces = os.networkInterfaces();
    const allAddresses = Object.values(networkInterfaces).flat();
    const mainAddress = allAddresses.find(
        (details) => details.family === 'IPv4' && !details.internal
    );

    return {
        hostname: os.hostname(),
        ipAddress: mainAddress ? mainAddress.address : null,
        userInfo: os.userInfo(),
    };
}

// get demo user by Genius iQ @20251109
function getDemoUser() {
    return {
        syskey: getSyskey(),
        autokey: 2,
        createdDate: DateTimeHandler.getMyanmarDateTime(),
        modifiedDate: DateTimeHandler.getMyanmarDateTime(),
        createdUser: "genius.iq",
        modifiedUser: "genius,iq",
        recordStatus: 1,
        userid: "demo",
        username: "Demo User",
        uuid: AuthHandler.getUniqueId(),
        password: AuthHandler.encrypt(""),
        pincode: AuthHandler.encrypt("123")
    };
}

const CommonHandler = {
    getSyskey,
    getSuperAdmin,
    toJSON,
    getDeviceInfo,
    getDemoUser
}

export default CommonHandler;