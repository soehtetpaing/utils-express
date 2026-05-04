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
const datetimeController = require("../controllers/datetime.controller");
const { checkToken } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /utils/datetime/currentDatetime:
 *   get:
 *     summary: Get Myanmar Datetime
 *     tags: [Datetime]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Fetch Myanmar Datetime Success
 *         content:
 *           application/json:
 *             schema:
 *              allOf:
 *               - $ref: '#/components/schemas/baseResponse'
 *               - type: object
 *                 properties:
 *                  data:
 *                   type: object
 *                 example:
 *                  status: 200
 *                  message: Success
 *                  data:
 *                    myanmarDateTime: 2026-01-20 10:10:15 AM
 *                  metadata:
 *                   requestId: "100301884220379136"
 *                   timestamp: 2026-04-26 05:25:24 PM
 *                   version: 1.0.0
 *       500:
 *        description: Get Myanmar Datetime Failed
 *        content:
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
router.get("/currentDatetime", checkToken, datetimeController.getMyanmarDateTime);

/**
 * @swagger
 * /utils/datetime/currentDate:
 *   get:
 *     summary: Get Myanmar Date
 *     tags: [Datetime]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Fetch Myanmar Date Success
 *         content:
 *           application/json:
 *             schema:
 *              allOf:
 *               - $ref: '#/components/schemas/baseResponse'
 *               - type: object
 *                 properties:
 *                  data:
 *                   type: object
 *                 example:
 *                  status: 200
 *                  message: Success
 *                  data:
 *                    myanmarDate: 20260222
 *                  metadata:
 *                   requestId: "100301884220379136"
 *                   timestamp: 2026-04-26 05:25:24 PM
 *                   version: 1.0.0
 *       500:
 *        description: Get Myanmar Date Failed
 *        content:
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
router.get("/currentDate", checkToken, datetimeController.getMyanmarDate);

/**
 * @swagger
 * /utils/datetime/currentHour:
 *   get:
 *     summary: Get Myanmar Hour
 *     tags: [Datetime]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Fetch Myanmar Hour Success
 *         content:
 *           application/json:
 *             schema:
 *              allOf:
 *               - $ref: '#/components/schemas/baseResponse'
 *               - type: object
 *                 properties:
 *                  data:
 *                   type: object
 *                 example:
 *                  status: 200
 *                  message: Success
 *                  data:
 *                    myanmarHour: 10:10:15 AM
 *                  metadata:
 *                   requestId: "100301884220379136"
 *                   timestamp: 2026-04-26 05:25:24 PM
 *                   version: 1.0.0
 *       500:
 *        description: Get Myanmar Hour Failed
 *        content:
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
router.get("/currentHour", checkToken, datetimeController.getMyanmarHour);

/**
 * @swagger
 * /utils/datetime/convertDateTimeByZone:
 *  get:
 *   summary: Convert Datetime by Target Timezone
 *   tags: [Datetime]
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - in: query
 *      name: datetime
 *      schema:
 *       type: string
 *       example: 2026-02-22 06:19:10 PM
 *      description: Datetime to be converted
 *    - in: query
 *      name: targetZone
 *      required: true
 *      schema:
 *       type: string
 *       example: Asia/Seoul
 *      description: Target timezone to convert datetime
 *   responses:
 *    200:
 *     description: Convert Datetime By Zone Success
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
 *             convertedDateTime: 2026-02-22 08:49:10 PM
 *            metadata:
 *             requestId: "100301884220379136"
 *             timestamp: 2026-04-26 05:25:24 PM
 *             version: 1.0.0
 *    500:
 *     description: Convert Datetime By Zone Failed
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
router.get("/convertDateTimeByZone", checkToken, datetimeController.getDateTimeByZone);

module.exports = router;
