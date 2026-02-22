const datetimeModel = require("../models/datetime.model");

exports.getMyanmarDateTime = (req, res) => {
    const currentDateTime = datetimeModel.getMyanmarDateTime();

    if (!currentDateTime) {
        return res.status(500).json({
            status: 500,
            message: "Failed to fetch Myanmar datetime!"
        });
    } else {
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: { myanmarDateTime: currentDateTime}
        });
    }
}

exports.getMyanmarDate = (req, res) => {
    const currentDate = datetimeModel.getMyanmarDate();

    if (!currentDate) {
        return res.status(500).json({
            status: 500,
            message: "Failed to fetch Myanmar date!"
        });
    } else {
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: { myanmarDate: currentDate }
        });
    }
}

exports.getMyanmarHour = (req, res) => {
    const currentHour = datetimeModel.getMyanmarHour();

    if (!currentHour) {
        return res.status(500).json({
            status: 500,
            message: "Failed to fetch Myanmar hour!"
        });
    } else {
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: { myanmarHour: currentHour }
        });
    }
}

exports.getDateTimeByZone = (req, res) => {
    const { datetime, targetZone } = req.query;

    if (!targetZone) {
        return res.status(500).json({
            status: 400,
            message: "Target timezone is required!"
        });
    }

    const targetZoneDateTime = datetimeModel.getDateTimeByZone(datetime, targetZone);

    if (!targetZoneDateTime) {
        return res.status(500).json({
            status: 500,
            message: "Failed to convert datetime to target timezone!"
        });
    } else {
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: { targetZoneDateTime }
        });
    }
}
