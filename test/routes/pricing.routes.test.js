const request = require('supertest');
const app = require('../../app');
const { sequelize } = require('../../models');

describe('Pricing API', () => {
  beforeAll(async () => {
    // Sync the database and seed data
    await sequelize.sync({ force: true });
    // Add seed data for organizations, items, and pricings
  });

  afterAll(async () => {
    // Clean up the database
    await sequelize.drop();
  });

  test('should return total price for a valid request', async () => {
    const response = await request(app)
      .get('/api/pricing')
      .query({
        zone: 'central',
        organizationId: '1',
        totalDistance: 12,
        itemType: 'perishable',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('totalPrice');
  });

  test('should return 400 Bad Request for missing parameters', async () => {
    const response = await request(app)
      .get('/api/pricing')
      .query({
        zone: 'central',
        organizationId: '1',
        totalDistance: 12,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  test('should return 404 Not Found for invalid organization', async () => {
    const response = await request(app)
      .get('/api/pricing')
      .query({
        zone: 'central',
        organizationId: '999',
        totalDistance: 12,
        itemType: 'perishable',
      });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Organization not found');
  });

  // Add more test cases for other scenarios and edge cases
});