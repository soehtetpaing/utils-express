const { AuthHandler } = require("genius-utils");

class AuthModel {
    static generateJwtToken(user, jwtSecret, refreshSecret) {
        return AuthHandler.generateJwtToken(user, jwtSecret, refreshSecret);
    }

    static getUniqueId() {
        return AuthHandler.getUniqueId();
    }

    static encryptData(plainText, secretKey) {
        if (!secretKey)
            return AuthHandler.encrypt(plainText);
        else
            return AuthHandler.encrypt(plainText, secretKey);
    }

    static decryptData(encryptedText, secretKey) {
        if (!secretKey)
            return AuthHandler.decrypt(encryptedText);
        else
            return AuthHandler.decrypt(encryptedText, secretKey);
    }

    static generateApiToken(secretKey, domain) {
        if (!secretKey && !domain)
            return AuthHandler.generateApiToken();
        else if (secretKey && !domain)
            return AuthHandler.generateApiToken(secretKey);
        else if (secretKey && domain)
            return AuthHandler.generateApiToken(secretKey, domain);
    }

    static verifyApiToken(token, secretKey, domain) {
        if (!secretKey && !domain)
            return AuthHandler.verifyApiToken(token);
        else if (secretKey && !domain)
            return AuthHandler.verifyApiToken(token, secretKey);
        else if (secretKey && domain)
            return AuthHandler.verifyApiToken(token, secretKey, domain);
    }
}

module.exports = AuthModel;
