import crypto from 'crypto';
import DateTimeHandler from './datetime.js';
import { nanoid } from 'nanoid';

// get uuid by Genius iQ @20251107
function getUniqueId() {
    return nanoid(11);
}

// encrypt data by Genius iQ @20251107
function encrypt(plainText, secretKey = 'OhMyGenius!') {
    try {
        const secretkey = crypto.createHash('sha256').update(secretKey).digest();
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', secretkey, iv);

        let encrypted = cipher.update(plainText, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        return iv.toString('hex') + '.' + encrypted;
    } catch (err) {
        return null;
    }
}

// decrypt data by Genius iQ @20251107
function decrypt(encryptedText, secretKey = 'OhMyGenius!') {
    try {
        const secretkey = crypto.createHash('sha256').update(secretKey).digest();
        const [ivHex, data] = encryptedText.split('.');
        const iv = Buffer.from(ivHex, 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', secretkey, iv);

        let decrypted = decipher.update(data, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    } catch (err) {
        return null;
    }
}

// APIs token authorization by Genius iQ @20251108 modified @20251114
function generateApiToken(secretKey = 'OhMyGenius!', domain = '*') {
    try {
        const TIME_LIMIT = 15 * 60 * 1000; // 15 minutes, 24 * 60 * 60 * 1000 = 1 day
        const expireTime = Date.now() + TIME_LIMIT;
        const domainUse = domain || '*';
        const uuid = getUniqueId();

        const tokenBase = domainUse + uuid + expireTime + secretKey;

        const tokenHash = crypto.createHash('sha256')
            .update(tokenBase)
            .digest('hex');

        const domainHex = Buffer.from(domainUse).toString('hex');
        const uuidHex = Buffer.from(uuid).toString('hex');
        const expireHex = expireTime.toString(16);

        return {
            token: `${uuidHex}.${tokenHash}.${expireHex}.${domainHex}`,
            expireAt: DateTimeHandler.formatTokenExpireTime(expireTime),
        };
    } catch (err) {
        return null;
    }
}

function verifyApiToken(token, secretKey = 'OhMyGenius!', domain = '*') {
    try {
        const parts = token.split('.');

        if (parts.length !== 4) {
            return { status: 401, message: 'Invalid Token Format!' };
        }

        const [uuidHex, tokenHex, expireHex, domainHex] = parts;

        const domainUse = Buffer.from(domainHex, 'hex').toString('utf8');
        const uuid = Buffer.from(uuidHex, 'hex').toString('utf8');
        const expireTime = parseInt(expireHex, 16);

        if (Date.now() > expireTime) {
            return { status: 401, message: 'Token Expired!' };
        }

        if (domainUse !== domain) {
            return {
                status: 403,
                message: `Unauthorized Domain: ${domain}!`
            };
        }

        const expectedHash = crypto.createHash('sha256')
            .update(domainUse + uuid + expireTime + secretKey)
            .digest('hex');

        if (expectedHash !== tokenHex) {
            return { status: 401, message: 'Invalid Token!' };
        }

        return {
            status: 200,
            message: 'Token Verification Success.',
        };

    } catch (err) {
        return { status: 401, message: 'Token Verification Failed!' };
    }
}

const AuthHandler = {
    getUniqueId,
    encrypt,
    decrypt,
    generateApiToken,
    verifyApiToken
}

export default AuthHandler;