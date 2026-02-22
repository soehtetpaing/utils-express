/**
 * @swagger
 * components:
 *  schemas:
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
const commonController = require("../controllers/common.controller");

/**
 * @swagger
 * /utils/common/syskey:
 *  get:
 *   summary: Generate Syskey
 *   tags: [Common]
 *   responses:
 *    200:
 *     description: Syskey Generation Success
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
 *             syskey: 260222043504177
 *    500:
 *     description: Syskey Generation Failed
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
router.get("/syskey", commonController.getSyskey);

/**
 * @swagger
 * /utils/common/superAdmin:
 *  get:
 *   summary: Get Super Admin
 *   tags: [Common]
 *   responses:
 *    200:
 *     description: Super Admin Fetch Success
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
 *    500:
 *     description: Super Admin Fetch Failed
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
router.get("/superAdmin", commonController.getSuperAdmin);

/**
 * @swagger
 * /utils/common/demoUser:
 *  get:
 *   summary: Get Demo User
 *   tags: [Common]
 *   responses:
 *    200:
 *     description: Demo User Fetch Success
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
 *    500:
 *     description: Demo User Fetch Failed
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
router.get("/demoUser", commonController.getDemoUser);

/**
 * @swagger
 * /utils/common/deviceInfo:
 *  get:
 *   summary: Get Device Info
 *   tags: [Common]
 *   responses:
 *    200:
 *     description: Device Info Fetch Success
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
 *    500:
 *     description: Device Info Fetch Failed
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
router.get("/deviceInfo", commonController.getDeviceInfo);

module.exports = router;
