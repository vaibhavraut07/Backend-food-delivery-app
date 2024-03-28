const { Pricing, Organization, Item } = require('../models');
const { calculateDeliveryPrice } = require('../services/pricing.service');

const getPricing = async (req, res, next) => {
  try {
    const { zone, organizationId, totalDistance, itemType } = req.query;

    // Input validation
    if (!zone || !organizationId || !totalDistance || !itemType) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

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
};

module.exports = {
  getPricing,
};