const mediaModel = require("../models/media.model");

exports.generateMediaName = (req, res) => {
    const { prefix, type } = req.body;

    if (!prefix || !type) {
        return res.status(500).json({
            status: 400,
            message: "Prefix and type are required!"
        });
    }

    const mediaName = mediaModel.generateMediaName(prefix, type);

    if (!mediaName) {
        return res.status(500).json({
            status: 500,
            message: "Failed to generate media name!"
        });
    } else {
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: { mediaName }
        });
    }
}

exports.mediaExists = (req, res) => {
    const { filepath } = req.body;

    if (!filepath) {
        return res.status(500).json({
            status: 400,
            message: "Filepath is required!"
        });
    }

    const exists = mediaModel.mediaExists(filepath);

    return res.status(200).json({
        status: 200,
        message: "Success",
        data: { mediaExists : exists}
    });
}

exports.mediaStat = async (req, res) => {
    const { filepath } = req.body;

    if (!filepath) {
        return res.status(500).json({
            status: 400,
            message: "Filepath is required!"
        });
    }

    try {
        const stat = await mediaModel.readMediaStat(filepath);

        if (!stat) {
            return res.status(500).json({
                status: 500,
                message: "Failed to read media stat!"
            });
        } else {
            return res.status(200).json({
                status: 200,
                message: "Success",
                data: { mediaStat: stat }
            });
        }        
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: err.message || "Failed to read media stat!"
        });
    }  
}
