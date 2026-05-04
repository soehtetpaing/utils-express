/**
 * @swagger
 * components:
 *  securitySchemes:
 *   bearerAuth:
 *    type: http
 *    scheme: bearer
 *    bearerFormat: JWT
 *    description: Enter JWT token as "Bearer <token>"
 *  schemas:
 *   jwtTokenRequest:
 *    type: object
 *    required:
 *     - id
 *     - username
 *    properties:
 *     id:
 *      type: bigInt
 *      description: Unique Id
 *      example: 100301884228767744
 *     username:
 *      type: string
 *      description: User Name
 *      example: demo
 *     role:
 *      type: string
 *      description: User Role
 *      example: admin
 *     tokenVersion:
 *      type: number
 *      description: Token Version
 *      example: 1
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
 *      example: Eh57PMcC6vTQd4SChkNfMwzAw5Ogb5Z62RriMwbCBIc=
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
 *     metadata:
 *      type: object
 *      properties:
 *       requestId:
 *        type: string
 *       timestamp:
 *        type: string
 *       version:
 *        type: string
 */

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { checkToken } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /utils/auth/jwt/token:
 *  post:
 *   summary: Generate JWT Tokens
 *   tags: [Auth]
 *   requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/jwtTokenRequest'
 *   responses:
 *    200:
 *     description: Tokens Generate Success
 *     content:
 *      application/json:
 *       schema:
 *        allOf:
 *         - $ref: '#/components/schemas/baseResponse'
 *         - type: object
*           properties:
 *            data:
 *             type: object
 *             properties:
 *              tokens:
 *               type: object
 *              tokenType:
 *               type: string
 *              expireAt:
 *               type: string
 *           example:
 *            status: 200
 *            message: JWT tokens generate successfully
 *            data:
 *             tokens:
 *              accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI0NDI3NjAwNzg5MTI0MzAwMCwidXNlcm5hbWUiOiJkZW1vIiwicm9sZSI6ImFkbWluIiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTc3NzQ0OTEzMiwiZXhwIjoxNzc3NDUwMDMyfQ.0AdbTDI-UO0rSR8rgYJjaJqogr5-zprb771NA0PR-m4
 *              refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI0NDI3NjAwNzg5MTI0MzAwMCwidHlwZSI6InJlZnJlc2giLCJ2ZXJzaW9uIjoxLCJpYXQiOjE3Nzc0NDkxMzIsImV4cCI6MTc3ODA1MzkzMn0.VKSLqdkwhgbB2BAC3Rjrz8WO5qHOQifL0HecfnFMW-c
 *             tokenType: Bearer
 *             expireAt: 15m
 *            metadata:
 *             requestId: "100301884220379136"
 *             timestamp: 2026-04-26 05:25:24 PM
 *             version: 1.0.2
 *    500:
 *     description: Tokens Generate Failed
 *     content:
 *      application/json:
 *       schema:
 *        allOf:
 *         - $ref: '#components/schemas/baseResponse'
 *         - type: object
 *           example:
 *            status: 500
 *            message: Failed to generate jwt tokens
 *            metadata:
 *             requestId: "100301884220379136"
 *             timestamp: 2026-04-26 05:25:24 PM
 *             version: 1.0.2
 */
router.post("/jwt/token", authController.generateJwtToken);

/**
 * @swagger
 * /utils/auth/uuid:
 *  get:
 *   summary: Generate UUID
 *   tags: [Auth]
 *   security:
 *    - bearerAuth: []
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
 *            metadata:
 *             requestId: "100301884220379136"
 *             timestamp: 2026-04-26 05:25:24 PM
 *             version: 1.0.0
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
 *            metadata:
 *             requestId: "100301884220379136"
 *             timestamp: 2026-04-26 05:25:24 PM
 *             version: 1.0.0
 */
router.get("/uuid", checkToken, authController.getUniqueId);

/**
 * @swagger
 * /utils/auth/encrypt:
 *  post:
 *    summary: Encrypt Data
 *    tags: [Auth]
 *    security:
 *     - bearerAuth: []
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
 *                  encryptedText: Eh57PMcC6vTQd4SChkNfMwzAw5Ogb5Z62RriMwbCBIc=
 *                 metadata:
 *                  requestId: "100301884220379136"
 *                  timestamp: 2026-04-26 05:25:24 PM
 *                  version: 1.0.0
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
 *                 metadata:
 *                  requestId: "100301884220379136"
 *                  timestamp: 2026-04-26 05:25:24 PM
 *                  version: 1.0.0
 */
router.post("/encrypt", checkToken, authController.encryptData);

/**
 * @swagger
 * /utils/auth/decrypt:
 *  post:
 *   summary: Decrypt Data
 *   tags: [Auth]
 *   security:
 *    - bearerAuth: []
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
 *               metadata:
 *                requestId: "100301884220379136"
 *                timestamp: 2026-04-26 05:25:24 PM
 *                version: 1.0.0
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
 *               metadata:
 *                requestId: "100301884220379136"
 *                timestamp: 2026-04-26 05:25:24 PM
 *                version: 1.0.0
 */
router.post("/decrypt", checkToken, authController.decryptData);

/**
 * @swagger
 * /utils/auth/generateApiToken:
 *  post:
 *   summary: Generate API Token
 *   tags: [Auth]
 *   security:
 *    - bearerAuth: []
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
 *               token: 34755f59386e6f78646349.28ff9e892cea756ff11fcc201c2e5bc507a217f36c4755a8805ffe2a604e6f03.19c0047ef61.6d73333635
 *               tokenType: x-access-token
 *               expireAt: 2026-01-27 10:35:59 PM
 *              metadata:
 *               requestId: "100301884220379136"
 *               timestamp: 2026-04-26 05:25:24 PM
 *               version: 1.0.0
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
 *              metadata:
 *               requestId: "100301884220379136"
 *               timestamp: 2026-04-26 05:25:24 PM
 *               version: 1.0.0
 */
router.post("/generateApiToken", checkToken, authController.generateApiToken);

/**
 * @swagger
 * /utils/auth/verifyApiToken:
 *  post:
 *   summary: Verify API Token
 *   tags: [Auth]
 *   security:
 *    - bearerAuth: []
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
 *              metadata:
 *               requestId: "100301884220379136"
 *               timestamp: 2026-04-26 05:25:24 PM
 *               version: 1.0.0
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
 *              metadata:
 *               requestId: "100301884220379136"
 *               timestamp: 2026-04-26 05:25:24 PM
 *               version: 1.0.0
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
 *              metadata:
 *               requestId: "100301884220379136"
 *               timestamp: 2026-04-26 05:25:24 PM
 *               version: 1.0.0
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
 *              metadata:
 *               requestId: "100301884220379136"
 *               timestamp: 2026-04-26 05:25:24 PM
 *               version: 1.0.0
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
 *              metadata:
 *               requestId: "100301884220379136"
 *               timestamp: 2026-04-26 05:25:24 PM
 *               version: 1.0.0
 */
router.post("/verifyApiToken", checkToken, authController.verifyApiToken);

module.exports = router;
