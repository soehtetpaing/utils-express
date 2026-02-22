const { CommonHandler} = require("genius-utils");

class CommonModel {
    static getSyskey() {
        return CommonHandler.getSyskey();
    }

    static getSuperAdmin() {
        return CommonHandler.getSuperAdmin();
    }

    static getDemoUser() {
        return CommonHandler.getDemoUser();
    }

    static getDeviceInfo() {
        return CommonHandler.getDeviceInfo();
    }
}

module.exports = CommonModel;