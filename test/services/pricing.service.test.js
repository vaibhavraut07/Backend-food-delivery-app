const { calculateDeliveryPrice } = require('../../services/pricing.service');

describe('PricingService', () => {
  test('should calculate delivery price correctly for perishable items', () => {
    const pricing = {
      baseDistanceInKm: 5,
      kmPrice: 1.5,
      fixPrice: 10,
    };
    const totalDistance = 10;

    const totalPrice = calculateDeliveryPrice(pricing, totalDistance);

    expect(totalPrice).toBe(1750); // 17.50 EUR * 100 (in cents)
  });

  test('should calculate delivery price correctly for non-perishable items', () => {
    const pricing = {
      baseDistanceInKm: 5,
      kmPrice: 1.0,
      fixPrice: 8,
    };
    const totalDistance = 8;

    const totalPrice = calculateDeliveryPrice(pricing, totalDistance);

    expect(totalPrice).toBe(1100); // 11.00 EUR * 100 (in cents)
  });

  test('should return base price if total distance is within base distance', () => {
    const pricing = {
      baseDistanceInKm: 10,
      kmPrice: 1.5,
      fixPrice: 15,
    };
    const totalDistance = 8;

    const totalPrice = calculateDeliveryPrice(pricing, totalDistance);

    expect(totalPrice).toBe(1500); // 15.00 EUR * 100 (in cents)
  });
});