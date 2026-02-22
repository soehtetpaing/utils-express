const commonModel =  require('../models/common.model');

exports.getSyskey = (req, res) => {
    const syskey = commonModel.getSyskey();

    if (!syskey) {
        return res.status(500).json(
            {
                status: 500,
                message: "Failed to generate syskey!"
            }
        );
    } else {
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: { syskey}
        });
    }
}

exports.getSuperAdmin = (req, res) => {
    const superAdmin = commonModel.getSuperAdmin();

    if (!superAdmin) {
        return res.status(500).json({
            status: 500,
            message: "Failed to fetch super admin!"
        });
    } else {
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: { superAdmin }
        });
    }
}

exports.getDemoUser = (req, res) => {
    const demoUser = commonModel.getDemoUser();

    if (!demoUser) {
        return res.status(500).json({
            status: 500,
            message: "Failed to fetch demo user!"
        });
    } else {
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: { demoUser }
        });
    }
}

exports.getDeviceInfo = (req, res) => {
    const deviceInfo = commonModel.getDeviceInfo();

    if (!deviceInfo) {
        return res.status(500).json({
            status: 500,
            message: "Failed to fetch device info!"
        });
    } else {
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: { deviceInfo }
        });
    }
}
