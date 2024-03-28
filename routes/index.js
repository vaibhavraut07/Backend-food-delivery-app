const express = require('express');
const router = express.Router();
const pricingController = require('../controllers/pricing.controller');

router.get('/pricing', pricingController.getPricing);

module.exports = router;
/**
 * @swagger
 * /pricing:
 *   get:
 *     summary: Get delivery pricing
 *     parameters:
 *       - in: query
 *         name: zone
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: organizationId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: totalDistance
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: itemType
 *         required: true
 *         schema:
 *           type: string
 *           enum: [perishable, non-perishable]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PricingResponse'
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Not found
 * components:
 *   schemas:
 *     PricingResponse:
 *       type: object
 *       properties:
 *         totalPrice:
 *           type: integer
 *           description: Total price in cents
 *           example: 2050
 */