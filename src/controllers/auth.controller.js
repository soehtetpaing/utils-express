const authModel = require('../models/auth.model');
const { CommonHandler, DateTimeHandler } = require("genius-utils");
const { app } = require("../configs/app.config");

const APP_VERSION = process.env.VERSION || app.version;

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

exports.generateJwtToken = (req, res) => {
    const requestBody = jwtTokenRequest(req.body);
    const user = requestBody;

    if (user.id == 0 || !user.username) {
        return res.status(401).json({
            status: 401,
            message: "Invalid user credentials!",
            metadata: generateMetadata()
        });
    }

    try {
        const result = authModel.generateJwtToken(user, JWT_SECRET, REFRESH_SECRET);

        return res.status(result.status).json({
            status: result.status,
            message: result.message,
            data: { 
                tokens: result.tokens,
                tokenType: "Bearer",
                expireAt: "15m"
            },
            metadata: generateMetadata()
        });

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Failed to generate jwt tokens!",
            metadata: generateMetadata()
        });
    }
}

exports.getUniqueId = (req, res) => {
    const uuid = authModel.getUniqueId();

    if (!uuid) {
        return res.status(500).json({
            status: 500,
            message: "UUID Generation Failed!",
            metadata: generateMetadata()
        });
    } else {
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: { uuid },
            metadata: generateMetadata()
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
            metadata: generateMetadata()
        });
    } else {
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: { encryptedText },
            metadata: generateMetadata()
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
            metadata: generateMetadata()
        });
    } else {
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: { decryptedText },
            metadata: generateMetadata()
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
            metadata: generateMetadata()
        });
    } else {
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: { 
                token: tokenData.token,
                tokenType: 'x-access-token',
                expireAt: tokenData.expireAt
            },
            metadata: generateMetadata()
        });
    }
};

exports.verifyApiToken = (req, res) => {
    const { token, secretKey, domain } = req.body;
    const result = authModel.verifyApiToken(token, secretKey, domain);

    return res.status(result.status).json({
        status: result.status,
        message: result.message,
        metadata: generateMetadata()
    });
}

// metadata
function generateMetadata() {
    return {
        requestId: CommonHandler.getSyskey(),
        timestamp: DateTimeHandler.getMyanmarDateTime(),
        version: APP_VERSION
    }
}

// private function
function jwtTokenRequest(param = {}) {
    return {
        id: param.id || 0,
        username: param.username || "",
        role: param.role || "",
        tokenVersion: param.tokenVersion || 0
    }
}
