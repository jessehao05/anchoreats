import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import Restaurant from '../src/models/Restaurant.js';

// Test /api/data endpoint
describe('GET /api/data', () => {
  
  it('should return 200 status and empty array when no restaurants exist', async () => {
    const res = await request(app).get('/api/data');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(0);
  });

  it('should return all restaurants when they exist', async () => {
    // Arrange: create test restaurants
    const testRestaurants = [
      {
        name: 'Test Restaurant 1',
        description: 'A test restaurant',
        website: 'https://test1.com',
        location: { lat: 36.144362, lng: -86.803072 },
        hours: {
          mon: [{ open: '09:00', close: '17:00' }],
          tue: [{ open: '09:00', close: '17:00' }],
          wed: [{ open: '09:00', close: '17:00' }],
          thu: [{ open: '09:00', close: '17:00' }],
          fri: [{ open: '09:00', close: '17:00' }],
          sat: [{ open: '10:00', close: '16:00' }],
          sun: [{ open: '10:00', close: '16:00' }],
        },
      },
      {
        name: 'Test Restaurant 2',
        description: 'Another test restaurant',
        website: 'https://test2.com',
        location: { lat: 36.144200, lng: -86.804810 },
        hours: {
          mon: [{ open: '08:00', close: '18:00' }],
          tue: [{ open: '08:00', close: '18:00' }],
          wed: [{ open: '08:00', close: '18:00' }],
          thu: [{ open: '08:00', close: '18:00' }],
          fri: [{ open: '08:00', close: '18:00' }],
          sat: [{ open: '09:00', close: '17:00' }],
          sun: [{ open: '09:00', close: '17:00' }],
        },
      },
    ];

    // Add restaurants
    await Restaurant.insertMany(testRestaurants);

    // Act: Send GET request
    const res = await request(app).get('/api/data');

    // Assert
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toHaveProperty('name', 'Test Restaurant 1');
    expect(res.body[1]).toHaveProperty('name', 'Test Restaurant 2');
  });

  it('should return correct restaurant structure', async () => {
    // Arrange
    const testRestaurant = {
      name: 'Structure Test Restaurant',
      description: 'Testing the response structure',
      website: 'https://structure-test.com',
      location: { lat: 36.144362, lng: -86.803072 },
      hours: {
        mon: [{ open: '09:00', close: '17:00' }],
        tue: [{ open: '09:00', close: '17:00' }],
        wed: [{ open: '09:00', close: '17:00' }],
        thu: [{ open: '09:00', close: '17:00' }],
        fri: [{ open: '09:00', close: '17:00' }],
        sat: [{ open: '10:00', close: '16:00' }],
        sun: [{ open: '10:00', close: '16:00' }],
      },
    };

    await Restaurant.create(testRestaurant);

    // Act
    const res = await request(app).get('/api/data');

    // Assert
    expect(res.body[0]).toHaveProperty('_id');
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('description');
    expect(res.body[0]).toHaveProperty('website');
    expect(res.body[0]).toHaveProperty('location');
    expect(res.body[0].location).toHaveProperty('lat');
    expect(res.body[0].location).toHaveProperty('lng');
    expect(res.body[0]).toHaveProperty('hours');
  });
});
