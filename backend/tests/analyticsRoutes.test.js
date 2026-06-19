import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import PageView from '../src/models/PageView.js';

beforeAll(() => {
    process.env.ANALYTICS_USERNAME = 'testuser';
    process.env.ANALYTICS_PASSWORD = 'testpassword';
    process.env.ANALYTICS_SECRET = 'testsecret';
});

// Test POST /api/analytics/auth endpoint
describe('POST /api/analytics/auth', () => {
    it('should return 200 and a token with valid credentials', async () => {
        const res = await request(app)
            .post('/api/analytics/auth')
            .send({ username: 'testuser', password: 'testpassword' });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('token', 'testsecret');
    });

    it('should return 401 with wrong password', async () => {
        const res = await request(app)
            .post('/api/analytics/auth')
            .send({ username: 'testuser', password: 'wrongpassword' });

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('success', false);
    });

    it('should return 401 with wrong username', async () => {
        const res = await request(app)
            .post('/api/analytics/auth')
            .send({ username: 'wronguser', password: 'testpassword' });

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('success', false);
    });

    it('should return 401 with both fields wrong', async () => {
        const res = await request(app)
            .post('/api/analytics/auth')
            .send({ username: 'wronguser', password: 'wrongpassword' });

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('success', false);
    });

    it('should return 401 with missing fields', async () => {
        const res = await request(app)
            .post('/api/analytics/auth')
            .send({});

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('success', false);
    });
});

// Test GET /api/analytics endpoint
describe('GET /api/analytics', () => {
    it('should return 401 with no authorization header', async () => {
        const res = await request(app).get('/api/analytics');

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('success', false);
    });

    it('should return 401 with wrong token', async () => {
        const res = await request(app)
            .get('/api/analytics')
            .set('Authorization', 'Bearer wrongtoken');

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('success', false);
    });

    it('should return 401 with malformed authorization header', async () => {
        const res = await request(app)
            .get('/api/analytics')
            .set('Authorization', 'testsecret');

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('success', false);
    });

    it('should return 200 and correct response shape with valid token', async () => {
        const res = await request(app)
            .get('/api/analytics')
            .set('Authorization', 'Bearer testsecret');

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body.data).toHaveProperty('totalViews');
        expect(res.body.data).toHaveProperty('uniqueSessions');
        expect(Array.isArray(res.body.data.byPage)).toBe(true);
        expect(Array.isArray(res.body.data.byDay)).toBe(true);
        expect(Array.isArray(res.body.data.byMonth)).toBe(true);
    });

    it('should return counts that reflect seeded page views', async () => {
        // Arrange: seed some page views
        await PageView.insertMany([
            { page: '/swipes', sessionId: 'session-1' },
            { page: '/swipes', sessionId: 'session-2' },
            { page: '/map', sessionId: 'session-1' },
        ]);

        // Act
        const res = await request(app)
            .get('/api/analytics')
            .set('Authorization', 'Bearer testsecret');

        // Assert
        expect(res.body.data.totalViews).toBe(3);
        expect(res.body.data.uniqueSessions).toBe(2);
        expect(res.body.data.byPage).toContainEqual({ _id: '/swipes', count: 2 });
        expect(res.body.data.byPage).toContainEqual({ _id: '/map', count: 1 });
    });
});

// Test POST /api/analytics endpoint
describe('POST /api/analytics', () => {
    it('should return 201 and save a page view with valid body', async () => {
        // Arrange
        const pageView = { page: '/swipes', referrer: '', sessionId: 'session-abc' };

        // Act
        const res = await request(app)
            .post('/api/analytics')
            .send(pageView);

        // Assert
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('success', true);

        const saved = await PageView.findOne({ page: '/swipes' });
        expect(saved).toBeDefined();
        expect(saved.sessionId).toBe('session-abc');
    });

    it('should return 400 when page field is missing', async () => {
        const res = await request(app)
            .post('/api/analytics')
            .send({ sessionId: 'session-abc' });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('success', false);
    });

    it('should return 200 and not save anything for bot user agents', async () => {
        // Act
        const res = await request(app)
            .post('/api/analytics')
            .set('User-Agent', 'Googlebot/2.1 (+http://www.google.com/bot.html)')
            .send({ page: '/swipes', sessionId: 'bot-session' });

        // Assert
        expect(res.status).toBe(200);

        const saved = await PageView.findOne({ sessionId: 'bot-session' });
        expect(saved).toBeNull();
    });
});
