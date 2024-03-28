const express = require('express');
const router = express.Router();
const pricingController = require('../controllers/pricing.controller');

router.get('/pricing', pricingController.getPricing);

module.exports = router;