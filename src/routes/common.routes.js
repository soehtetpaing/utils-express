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
const commonController = require("../controllers/common.controller");
const { checkToken } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /utils/common/syskey:
 *  get:
 *   summary: Generate Syskey
 *   tags: [Common]
 *   security:
 *    - bearerAuth: []
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
 *             syskey: 100301882257448960
 *            metadata:
 *             requestId: "100301884220379136"
 *             timestamp: 2026-04-26 05:25:24 PM
 *             version: 1.0.0
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
 *            metadata:
 *             requestId: "100301884220379136"
 *             timestamp: 2026-04-26 05:25:24 PM
 *             version: 1.0.0
 */
router.get("/syskey", checkToken, commonController.getSyskey);

/**
 * @swagger
 * /utils/common/superAdmin:
 *  get:
 *   summary: Get Super Admin
 *   tags: [Common]
 *   security:
 *    - bearerAuth: []
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
 *            data: {}
 *            metadata:
 *             requestId: "100301884220379136"
 *             timestamp: 2026-04-26 05:25:24 PM
 *             version: 1.0.0
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
 *            metadata:
 *             requestId: "100301884220379136"
 *             timestamp: 2026-04-26 05:25:24 PM
 *             version: 1.0.0
 */
router.get("/superAdmin", checkToken, commonController.getSuperAdmin);

/**
 * @swagger
 * /utils/common/demoUser:
 *  get:
 *   summary: Get Demo User
 *   tags: [Common]
 *   security:
 *    - bearerAuth: []
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
 *            data: {}
 *            metadata:
 *             requestId: "100301884220379136"
 *             timestamp: 2026-04-26 05:25:24 PM
 *             version: 1.0.0
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
 *            metadata:
 *             requestId: "100301884220379136"
 *             timestamp: 2026-04-26 05:25:24 PM
 *             version: 1.0.0
 */
router.get("/demoUser", checkToken, commonController.getDemoUser);

/**
 * @swagger
 * /utils/common/deviceInfo:
 *  get:
 *   summary: Get Device Info
 *   tags: [Common]
 *   security:
 *    - bearerAuth: []
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
 *            metadata:
 *             requestId: "100301884220379136"
 *             timestamp: 2026-04-26 05:25:24 PM
 *             version: 1.0.0
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
 *            metadata:
 *             requestId: "100301884220379136"
 *             timestamp: 2026-04-26 05:25:24 PM
 *             version: 1.0.0
 */
router.get("/deviceInfo", checkToken, commonController.getDeviceInfo);

module.exports = router;
