import { describe, it, expect } from 'vitest';
import Restaurant from '../src/models/Restaurant.js';

// Test Restaurant model 
describe('Restaurant Model Validation', () => {
  it('should create a valid restaurant successfully', async () => {
    const validRestaurant = {
      name: 'Valid Restaurant',
      description: 'A valid restaurant description',
      website: 'https://valid-restaurant.com',
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

    const restaurant = await Restaurant.create(validRestaurant);

    expect(restaurant._id).toBeDefined();
    expect(restaurant.name).toBe('Valid Restaurant');
    expect(restaurant.description).toBe('A valid restaurant description');
    expect(restaurant.website).toBe('https://valid-restaurant.com');
    expect(restaurant.location.lat).toBe(36.144362);
    expect(restaurant.location.lng).toBe(-86.803072);
  });

  it('should fail validation when name is missing', async () => {
    const invalidRestaurant = {
      description: 'Missing name',
      website: 'https://test.com',
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

    await expect(Restaurant.create(invalidRestaurant)).rejects.toThrow();
  });

  it('should fail validation when description is missing', async () => {
    const invalidRestaurant = {
      name: 'Test Restaurant',
      website: 'https://test.com',
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

    await expect(Restaurant.create(invalidRestaurant)).rejects.toThrow();
  });

  it('should fail validation when website is missing', async () => {
    const invalidRestaurant = {
      name: 'Test Restaurant',
      description: 'Test description',
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

    await expect(Restaurant.create(invalidRestaurant)).rejects.toThrow();
  });

  it('should fail validation when location is missing', async () => {
    const invalidRestaurant = {
      name: 'Test Restaurant',
      description: 'Test description',
      website: 'https://test.com',
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

    await expect(Restaurant.create(invalidRestaurant)).rejects.toThrow();
  });

  it('should enforce unique restaurant names', async () => {
    const restaurant1 = {
      name: 'Unique Name Test',
      description: 'First restaurant',
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
    };

    const restaurant2 = {
      name: 'Unique Name Test', // Same name
      description: 'Second restaurant',
      website: 'https://test2.com',
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

    await Restaurant.create(restaurant1);
    await expect(Restaurant.create(restaurant2)).rejects.toThrow();
  });
});
