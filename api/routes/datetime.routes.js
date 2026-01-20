const express = require("express");
const router = express.Router();
const datetimeController = require("../controllers/datetime.controller");

/**
 * @swagger
 * /utils/datetime/now:
 *   get:
 *     summary: Get Myanmar Datetime
 *     tags: [Datetime]
 *     responses:
 *       200:
 *         description: Current Myanmar Datetime
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: int
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: object
 *                   properties:
 *                     myanmarDateTime:
 *                       type: string
 *                       example: 2026-01-20 10:10:15 AM
 */
router.get("/now", datetimeController.getMyanmarDateTime);

module.exports = router;
