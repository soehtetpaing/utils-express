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
 *   generateMediaNameRequest:
 *    type: object
 *    required:
 *     - prefix
 *     - type
 *    properties:
 *     prefix:
 *      type: string
 *      description: The prefix for the media name
 *      example: IMG
 *     type:
 *      type: string
 *      description: The extension/type of the media file
 *      example: png
 *   filePathRequest:
 *    type: object 
 *    required:
 *     - filepath
 *    properties:
 *     filepath:
 *      type: string
 *      description: The file path of the media file
 *      example: c:/pj/utils-express/configs/app.config.js
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
const mediaController = require("../controllers/media.controller");
const { checkToken } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /utils/media/mediaName:
 *  post:
 *   summary: Generate media name
 *   tags: [Media]
 *   security:
 *    - bearerAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/generateMediaNameRequest'
 *   responses:
 *    200:
 *     description: Generate Media Name Success
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
 *             mediaName: IMG_20260222075357892.png
 *            metadata:
 *             requestId: "100301884220379136"
 *             timestamp: 2026-04-26 05:25:24 PM
 *             version: 1.0.0
 *    500:
 *     description: Generate Media Name Failed
 *     content:
 *      application/json:
 *       schema:
 *        allOf:
 *         - $ref: '#/components/schemas/baseResponse'
 *         - type: object
 *           example:
 *            status: 500
 *            message: Failed
 *            metadata:
 *             requestId: "100301884220379136"
 *             timestamp: 2026-04-26 05:25:24 PM
 *             version: 1.0.0 
 */
router.post("/mediaName", checkToken, mediaController.generateMediaName);

/**
 * @swagger
 * /utils/media/mediaExists:
 *  post:
 *   summary: Check if media file exists
 *   tags: [Media]
 *   security:
 *    - bearerAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/filePathRequest'
 *   responses:
 *    200:
 *     description: Media File Exists
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
 *             mediaExists: true
 *            metadata:
 *             requestId: "100301884220379136"
 *             timestamp: 2026-04-26 05:25:24 PM
 *             version: 1.0.0
 *    500:
 *     description: Check Media File Exists Failed
 *     content:
 *      application/json:
 *       schema:
 *        allOf:
 *         - $ref: '#/components/schemas/baseResponse'
 *         - type: object
 *           example:
 *            status: 500
 *            message: Failed
 *            metadata:
 *             requestId: "100301884220379136"
 *             timestamp: 2026-04-26 05:25:24 PM
 *             version: 1.0.0 
 */
router.post("/mediaExists", checkToken, mediaController.mediaExists);

/**
 * @swagger
 * /utils/media/mediaInfo:
 *  post:
 *   summary: Get media file information
 *   tags: [Media]
 *   security:
 *    - bearerAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/filePathRequest'
 *   responses:
 *    200:
 *     description: Fetch Media Info Success
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
 *             mediaInfo: {}
 *            metadata:
 *             requestId: "100301884220379136"
 *             timestamp: 2026-04-26 05:25:24 PM
 *             version: 1.0.0
 *    500:
 *     description: Fetch Media Info Failed
 *     content:
 *      application/json:
 *       schema:
 *        allOf:
 *         - $ref: '#/components/schemas/baseResponse'
 *         - type: object
 *           example:
 *            status: 500
 *            message: Failed 
 *            metadata:
 *             requestId: "100301884220379136"
 *             timestamp: 2026-04-26 05:25:24 PM
 *             version: 1.0.0
 */
router.post("/mediaInfo", checkToken, mediaController.mediaStat);

module.exports = router;
