const { Pricing, Organization, Item } = require('../models');
const { calculateDeliveryPrice } = require('../services/pricing.service');
const { body, validationResult } = require('express-validator');

const getPricing = [
  // Express-validator middleware
  body('zone').notEmpty().withMessage('Zone is required'),
  body('organizationId').notEmpty().withMessage('Organization ID is required'),
  body('totalDistance').notEmpty().isNumeric().withMessage('Total distance must be a number'),
  body('itemType').notEmpty().isIn(['perishable', 'non-perishable']).withMessage('Invalid item type'),

  // Route handler
  async (req, res, next) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { zone, organizationId, totalDistance, itemType } = req.query;

      const organization = await Organization.findByPk(organizationId);
      if (!organization) {
        return res.status(404).json({ error: 'Organization not found' });
      }

      const item = await Item.findOne({ where: { type: itemType } });
      if (!item) {
        return res.status(404).json({ error: 'Item type not found' });
      }

      const pricing = await Pricing.findOne({
        where: { organizationId, itemId: item.id, zone },
        include: [
          { model: Organization, as: 'organization' },
          { model: Item, as: 'item' },
        ],
      });

      if (!pricing) {
        return res.status(404).json({ error: 'Pricing not found' });
      }

      const totalPrice = calculateDeliveryPrice(pricing, totalDistance);

      res.json({ totalPrice });
    } catch (error) {
      next(error);
    }
  },
];

module.exports = {
  getPricing,
};