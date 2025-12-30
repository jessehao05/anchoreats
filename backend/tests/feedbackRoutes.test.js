import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import Feedback from '../src/models/Feedback.js';

// Test GET /api/feedback endpoint
describe('GET /api/feedback', () => {
  it('should return 200 status and empty array when no feedback exists', async () => {
    const res = await request(app).get('/api/feedback');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('message', 'Feedback successfully fetched!');
    expect(Array.isArray(res.body.feedback)).toBe(true);
    expect(res.body.feedback).toHaveLength(0);
  });

  it('should return all feedback when they exist', async () => {
    const testFeedback = [
      {
        text: 'good job',
        author: 'John Johnson',
        email: 'john@me.com'
      },
      {
        text: "I mean it's alright",
        author: 'Joe Johnson',
        email: 'joe@me.com'
      },
      {
        text: 'Anonymous feedback here'
      }
    ];

    await Feedback.insertMany(testFeedback);

    const res = await request(app).get('/api/feedback');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(Array.isArray(res.body.feedback)).toBe(true);
    expect(res.body.feedback).toHaveLength(3);
  });

  it('should return feedback in reverse chronological order', async () => {
    await Feedback.create({
      text: 'First feedback'
    });

    // Wait a bit to ensure different timestamps
    await new Promise(resolve => setTimeout(resolve, 10));

    await Feedback.create({
      text: 'Second feedback'
    });

    const res = await request(app).get('/api/feedback');

    // newest should be first
    expect(res.body.feedback[0].text).toBe('Second feedback');
    expect(res.body.feedback[1].text).toBe('First feedback');
  });

  it('should return correct feedback structure', async () => {
    const testFeedback = {
      text: 'Structure test feedback',
      author: 'Test Author',
      email: 'test@example.com'
    };

    await Feedback.create(testFeedback);

    const res = await request(app).get('/api/feedback');

    expect(res.body.feedback[0]).toHaveProperty('_id');
    expect(res.body.feedback[0]).toHaveProperty('text');
    expect(res.body.feedback[0]).toHaveProperty('author');
    expect(res.body.feedback[0]).toHaveProperty('email');
    expect(res.body.feedback[0]).toHaveProperty('createdAt');
  });
});

// Test POST /api/feedback endpoint
describe('POST /api/feedback', () => {
  it('should create new feedback with all fields', async () => {
    const newFeedback = {
      text: 'This is new feedback',
      author: 'New User',
      email: 'newuser@example.com'
    };

    const res = await request(app)
      .post('/api/feedback')
      .send(newFeedback);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('message', 'Feedback added successfully!');
    expect(res.body.feedback).toHaveProperty('text', 'This is new feedback');
    expect(res.body.feedback).toHaveProperty('author', 'New User');
    expect(res.body.feedback).toHaveProperty('email', 'newuser@example.com');
    expect(res.body.feedback).toHaveProperty('_id');
  });

  it('should create feedback with only text field', async () => {
    const newFeedback = {
      text: 'Anonymous feedback'
    };

    const res = await request(app)
      .post('/api/feedback')
      .send(newFeedback);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.feedback).toHaveProperty('text', 'Anonymous feedback');
  });

  it('should create feedback without author', async () => {
    const newFeedback = {
      text: 'Feedback without author',
      email: 'nonauthor@example.com'
    };

    const res = await request(app)
      .post('/api/feedback')
      .send(newFeedback);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.feedback).toHaveProperty('text', 'Feedback without author');
    expect(res.body.feedback).toHaveProperty('email', 'nonauthor@example.com');
  });

  it('should create feedback without email', async () => {
    const newFeedback = {
      text: 'Feedback without email',
      author: 'Author Only'
    };

    const res = await request(app)
      .post('/api/feedback')
      .send(newFeedback);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.feedback).toHaveProperty('text', 'Feedback without email');
    expect(res.body.feedback).toHaveProperty('author', 'Author Only');
  });

  it('should fail when text is missing', async () => {
    const invalidFeedback = {
      author: 'No Text User',
      email: 'notext@example.com'
    };

    const res = await request(app)
      .post('/api/feedback')
      .send(invalidFeedback);

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', 'Internal server error.');
  });

  it('should persist feedback to database', async () => {
    const newFeedback = {
      text: 'Persistence test feedback',
      author: 'DB Test User',
      email: 'dbtest@example.com'
    };

    const res = await request(app)
      .post('/api/feedback')
      .send(newFeedback);

    // Verify it was saved to database
    const savedFeedback = await Feedback.findById(res.body.feedback._id);
    expect(savedFeedback).toBeDefined();
    expect(savedFeedback.text).toBe('Persistence test feedback');
    expect(savedFeedback.author).toBe('DB Test User');
    expect(savedFeedback.email).toBe('dbtest@example.com');
  });
});
