const commonModel =  require('../models/common.model');
const { CommonHandler, DateTimeHandler } = require("genius-utils");
const { app } = require("../configs/app.config");

const APP_VERSION = process.env.VERSION || app.version;

exports.getSyskey = (req, res) => {
    const syskey = commonModel.getSyskey();

    if (!syskey) {
        return res.status(500).json(
            {
                status: 500,
                message: "Failed to generate syskey!",
                metadata: generateMetadata()
            }
        );
    } else {
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: { syskey },
            metadata: generateMetadata()
        });
    }
}

exports.getSuperAdmin = (req, res) => {
    const superAdmin = commonModel.getSuperAdmin();

    if (!superAdmin) {
        return res.status(500).json({
            status: 500,
            message: "Failed to fetch super admin!",
            metadata: generateMetadata()
        });
    } else {
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: { superAdmin },
            metadata: generateMetadata()
        });
    }
}

exports.getDemoUser = (req, res) => {
    const demoUser = commonModel.getDemoUser();

    if (!demoUser) {
        return res.status(500).json({
            status: 500,
            message: "Failed to fetch demo user!",
            metadata: generateMetadata()
        });
    } else {
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: { demoUser },
            metadata: generateMetadata()
        });
    }
}

exports.getDeviceInfo = (req, res) => {
    const deviceInfo = commonModel.getDeviceInfo();

    if (!deviceInfo) {
        return res.status(500).json({
            status: 500,
            message: "Failed to fetch device info!",
            metadata: generateMetadata()
        });
    } else {
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: { deviceInfo },
            metadata: generateMetadata()
        });
    }
}

// metadata
function generateMetadata() {
    return {
        requestId: CommonHandler.getSyskey(),
        timestamp: DateTimeHandler.getMyanmarDateTime(),
        version: APP_VERSION
    }
}
