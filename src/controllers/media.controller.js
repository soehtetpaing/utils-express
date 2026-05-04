const mediaModel = require("../models/media.model");
const { CommonHandler, DateTimeHandler } = require("genius-utils");
const { app } = require("../configs/app.config");

const APP_VERSION = process.env.APP_VERSION || app.version;

exports.generateMediaName = (req, res) => {
    const { prefix, type } = req.body;

    if (!prefix || !type) {
        return res.status(500).json({
            status: 400,
            message: "Prefix and type are required!",
            metadata: generateMetadata()
        });
    }

    const mediaName = mediaModel.generateMediaName(prefix, type);

    if (!mediaName) {
        return res.status(500).json({
            status: 500,
            message: "Failed to generate media name!",
            metadata: generateMetadata()
        });
    } else {
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: { mediaName },
            metadata: generateMetadata()
        });
    }
}

exports.mediaExists = (req, res) => {
    const { filepath } = req.body;

    if (!filepath) {
        return res.status(500).json({
            status: 400,
            message: "Filepath is required!",
            metadata: generateMetadata()
        });
    }

    const exists = mediaModel.mediaExists(filepath);

    return res.status(200).json({
        status: 200,
        message: "Success",
        data: { mediaExists : exists },
        metadata: generateMetadata()
    });
}

exports.mediaStat = async (req, res) => {
    const { filepath } = req.body;

    if (!filepath) {
        return res.status(500).json({
            status: 400,
            message: "Filepath is required!",
            metadata: generateMetadata()
        });
    }

    try {
        const stat = await mediaModel.readMediaStat(filepath);

        if (!stat) {
            return res.status(500).json({
                status: 500,
                message: "Failed to read media stat!",
                metadata: generateMetadata()
            });
        } else {
            return res.status(200).json({
                status: 200,
                message: "Success",
                data: { mediaStat: stat },
                metadata: generateMetadata()
            });
        }        
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: err.message || "Failed to read media stat!",
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
