const datetimeModel = require("../models/datetime.model");
const { CommonHandler, DateTimeHandler } = require("genius-utils");
const { app } = require("../configs/app.config");

const APP_VERSION = process.env.APP_VERSION || app.version;

exports.getMyanmarDateTime = (req, res) => {
    const currentDateTime = datetimeModel.getMyanmarDateTime();

    if (!currentDateTime) {
        return res.status(500).json({
            status: 500,
            message: "Failed to fetch Myanmar datetime!",
            metadata: generateMetadata()
        });
    } else {
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: { myanmarDateTime: currentDateTime },
            metadata: generateMetadata()
        });
    }
}

exports.getMyanmarDate = (req, res) => {
    const currentDate = datetimeModel.getMyanmarDate();

    if (!currentDate) {
        return res.status(500).json({
            status: 500,
            message: "Failed to fetch Myanmar date!",
            metadata: generateMetadata()
        });
    } else {
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: { myanmarDate: currentDate },
            metadata: generateMetadata()
        });
    }
}

exports.getMyanmarHour = (req, res) => {
    const currentHour = datetimeModel.getMyanmarHour();

    if (!currentHour) {
        return res.status(500).json({
            status: 500,
            message: "Failed to fetch Myanmar hour!",
            metadata: generateMetadata()
        });
    } else {
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: { myanmarHour: currentHour },
            metadata: generateMetadata()
        });
    }
}

exports.getDateTimeByZone = (req, res) => {
    const { datetime, targetZone } = req.query;

    if (!targetZone) {
        return res.status(500).json({
            status: 400,
            message: "Target timezone is required!",
            metadata: generateMetadata()
        });
    }

    const targetZoneDateTime = datetimeModel.getDateTimeByZone(datetime, targetZone);

    if (!targetZoneDateTime) {
        return res.status(500).json({
            status: 500,
            message: "Failed to convert datetime to target timezone!",
            metadata: generateMetadata()
        });
    } else {
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: { targetZoneDateTime },
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
