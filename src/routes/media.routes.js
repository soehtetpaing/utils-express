/**
 * @swagger
 * components:
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
 *      example: C:/pj/utils/meta/app.json
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
const mediaController = require("../controllers/media.controller");

/**
 * @swagger
 * /utils/media/mediaName:
 *  post:
 *   summary: Generate media name
 *   tags: [Media]
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
 */
router.post("/mediaName", mediaController.generateMediaName);

/**
 * @swagger
 * /utils/media/mediaExists:
 *  post:
 *   summary: Check if media file exists
 *   tags: [Media]
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
 */
router.post("/mediaExists", mediaController.mediaExists);

/**
 * @swagger
 * /utils/media/mediaInfo:
 *  post:
 *   summary: Get media file information
 *   tags: [Media]
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
 */
router.post("/mediaInfo", mediaController.mediaStat);

module.exports = router;
