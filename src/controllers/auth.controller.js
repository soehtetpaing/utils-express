const authModel = require('../models/auth.model');

exports.getUniqueId = (req, res) => {
    const uuid = authModel.getUniqueId();

    if (!uuid) {
        return res.status(500).json({
            status: 500,
            message: "UUID Generation Failed!",
        });
    } else {
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: { uuid }
        });
    }
}

exports.encryptData = (req, res) => {
    const { plainText, secretKey } = req.body;
    const encryptedText = authModel.encryptData(plainText, secretKey);

    if (!encryptedText) {
        return res.status(500).json({
            status: 500,
            message: "Encryption Failed!",
        });
    } else {
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: { encryptedText }
        });
    }
};

exports.decryptData = (req, res) => {
    const { encryptedText, secretKey } = req.body;
    const decryptedText = authModel.decryptData(encryptedText, secretKey);

    if (decryptedText == null) {
        return res.status(500).json({
            status: 500,
            message: "Wrong secret key!",
        });
    } else {
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: { decryptedText }
        });
    }
};

exports.generateApiToken = (req, res) => {
    const { secretKey, domain } = req.body;
    const tokenData = authModel.generateApiToken(secretKey, domain);

    if (!tokenData) {
        return res.status(500).json({
            status: 500,
            message: "Token generation failed!",
        });
    } else {
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: { tokenData }
        });
    }
};

exports.verifyApiToken = (req, res) => {
    const { token, secretKey, domain } = req.body;
    const result = authModel.verifyApiToken(token, secretKey, domain);

    return res.status(result.status).json({
        status: result.status,
        message: result.message,
    });
}
