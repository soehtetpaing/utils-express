const datetimeModel = require("../models/datetime.model");

exports.getMyanmarDateTime = (req, res) => {
    const currentDateTime = datetimeModel.getMyanmarDateTime();

    res.status(200).json({
        status: 200,
        message: "Success",
        data: { myanmarDateTime: currentDateTime } 
    });
};