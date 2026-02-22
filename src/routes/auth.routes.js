/**
 * @swagger
 * components:
 *  schemas:
 *   encryptRequest:
 *    type: object
 *    properties:
 *     plainText:
 *      type: string
 *      description: The plain text to be encrypted
 *      example: myPassw0rd
 *     secretKey:
 *      type: string
 *      description: The secret key used for encryption (optional)
 *      example: OhMyGenius!
 *   decryptRequest:
 *    type: object
 *    required:
 *     - encryptedText
 *    properties:
 *     encryptedText:
 *      type: string
 *      description: The encrypted text to be decrypted
 *      example: 8118237d2e47262d349b0e23e0f1854a.6fa9b098674928a9cfbd87a499f04809
 *     secretKey:
 *      type: string
 *      description: The secret key used for decryption (optional)
 *      example: OhMyGenius!
 *   generateApiTokenRequest:
 *    type: object
 *    properties:
 *     secretKey:
 *      type: string
 *      description: The secret key used for token generation
 *      example: OhMyGenius!
 *     domain:
 *      type: string
 *      description: The domain for which the token is valid
 *      example: ms365
 *   verifyApiTokenRequest:
 *    type: object
 *    required:
 *     - token
 *    properties:
 *     token:
 *      type: string
 *      description: The API token to be verified
 *      example: 34755f59386e6f78646349.28ff9e892cea756ff11fcc201c2e5bc507a217f36c4755a8805ffe2a604e6f03.19c0047ef61.6d73333635
 *     secretKey:
 *      type: string
 *      description: The secret key used for token verification (optional)
 *      example: OhMyGenius!
 *     domain:
 *      type: string
 *      description: The domain for which the token is valid (optional)
 *      example: ms365
 *   baseResponse:
 *    x-internal: true
 *    type: object
 *    properties:
 *     status:
 *      type: integer
 *     message:
 *      type: string
 */

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

/**
 * @swagger
 * /utils/auth/uuid:
 *  get:
 *   summary: Generate UUID
 *   tags: [Auth]
 *   responses:
 *    200:
 *     description: UUID Generation Success
 *     content:
 *      application/json:
 *       schema:
 *        allOf:
 *         - $ref: '#/components/schemas/baseResponse'
 *         - type: object
 *           properties:
 *            data:
 *             type: object
 *           example:
 *            status: 200
 *            message: Success
 *            data:
 *             uuid: Nb9DF272TIE
 *    500:
 *     description: UUID Generation Failed
 *     content:
 *      application/json:
 *       schema:
 *        allOf:
 *         - $ref: '#components/schemas/baseResponse'
 *         - type: object
 *           example:
 *            status: 500
 *            message: Failed
 */
router.get("/uuid", authController.getUniqueId);

/**
 * @swagger
 * /utils/auth/encrypt:
 *  post:
 *    summary: Encrypt Data
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           $ref: '#/components/schemas/encryptRequest'
 *    responses:
 *      200:
 *        description: Encryption Success
 *        content:
 *          application/json:
 *            schema:
 *             allOf:
 *              - $ref: '#/components/schemas/baseResponse'
 *              - type: object
 *                properties:
 *                 data:
 *                  type: object
 *                example:
 *                 status: 200
 *                 message: Success
 *                 data: 
 *                  encryptedText: 8118237d2e47262d349b0e23e0f1854a.6fa9b098674928a9cfbd87a499f04809
 *      500:
 *        description: Encryption Failed
 *        content:
 *          application/json:
 *            schema:
 *             allOf:
 *              - $ref: '#/components/schemas/baseResponse'
 *              - type: object
 *                example:
 *                 status: 500
 *                 message: Failed
 */
router.post("/encrypt", authController.encryptData);

/**
 * @swagger
 * /utils/auth/decrypt:
 *  post:
 *   summary: Decrypt Data
 *   tags: [Auth]
 *   requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/decryptRequest'
 *   responses:
 *     200:
 *       description: Decryption Success
 *       content:
 *         application/json:
 *          schema:
 *           allOf:
 *            - $ref: '#/components/schemas/baseResponse'
 *            - type: object
 *              properties:
 *               data:
 *                type: object
 *              example:
 *               status: 200
 *               message: Success
 *               data:
 *                decryptedText: myPassw0rd
 *     500:
 *       description: Decryption Failed
 *       content:
 *         application/json:
 *          schema:
 *           allOf:
 *            - $ref: '#/components/schemas/baseResponse'
 *            - type: object
 *              example:
 *               status: 500
 *               message: Failed
 */
router.post("/decrypt", authController.decryptData);

/**
 * @swagger
 * /utils/auth/generateApiToken:
 *  post:
 *   summary: Generate API Token
 *   tags: [Auth]
 *   requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/generateApiTokenRequest'
 *   responses:
 *     200:
 *       description: Token Generation Success
 *       content:
 *        application/json:
 *         schema:
 *          allOf:
 *           - $ref: '#/components/schemas/baseResponse'
 *           - type: object
 *             properties:
 *              data:
 *               type: object
 *             example:
 *              status: 200
 *              message: Success
 *              data:
 *               tokenData:
 *                token: 34755f59386e6f78646349.28ff9e892cea756ff11fcc201c2e5bc507a217f36c4755a8805ffe2a604e6f03.19c0047ef61.6d73333635
 *                expireAt: 2026-01-27 10:35:59 PM
 *     500:
 *       description: Token Generation Failed
 *       content:
 *        application/json:
 *         schema:
 *          allOf:
 *           - $ref: '#/components/schemas/baseResponse'
 *           - type: object
 *             example:
 *              status: 500
 *              message: Failed
 */
router.post("/generateApiToken", authController.generateApiToken);

/**
 * @swagger
 * /utils/auth/verifyApiToken:
 *  post:
 *   summary: Verify API Token
 *   tags: [Auth]
 *   requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/verifyApiTokenRequest'
 *   responses:
 *     200:
 *       description: Token Verification Success
 *       content:
 *        application/json:
 *         schema:
 *          allOf:
 *           - $ref: '#/components/schemas/baseResponse'
 *           - type: object
 *             example:
 *              status: 200
 *              message: Success
 *     400:
 *       description: Invalid Token Format
 *       content:
 *        application/json:
 *         schema:
 *          allOf:
 *           - $ref: '#/components/schemas/baseResponse'
 *           - type: object
 *             example:
 *              status: 400
 *              message: Invalid Token Format
 *     401:
 *       description: Unauthorized
 *       content:
 *        application/json:
 *         schema:
 *          allOf:
 *           - $ref: '#/components/schemas/baseResponse'
 *           - type: object
 *             example:
 *              status: 401
 *              message: Unauthorized Domain
 *     403:
 *       description: Token Expired
 *       content:
 *        application/json:
 *         schema:
 *          allOf:
 *           - $ref: '#/components/schemas/baseResponse'
 *           - type: object
 *             example:
 *              status: 403
 *              message: Token Expired
 *     500:
 *       description: Token Verification Failed
 *       content:
 *        application/json:
 *         schema:
 *          allOf:
 *           - $ref: '#/components/schemas/baseResponse'
 *           - type: object
 *             example:
 *              status: 500
 *              message: Invalid Token
 */
router.post("/verifyApiToken", authController.verifyApiToken);

module.exports = router;
