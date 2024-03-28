const calculateDeliveryPrice = (pricing, totalDistance) => {
    const { baseDistanceInKm, kmPrice, fixPrice } = pricing;
    const extraDistance = Math.max(0, totalDistance - baseDistanceInKm);
    const extraPrice = extraDistance * kmPrice;
    const totalPrice = fixPrice + extraPrice;
    return Math.round(totalPrice * 100); // Return price in cents
  };
  
  module.exports = {
    calculateDeliveryPrice,
  };