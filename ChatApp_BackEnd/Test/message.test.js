const request = require('supertest');
const app = require('../server');

describe('Message API', () => {
    let token;
    let channelId;
    let messageId;

    // Setup
    beforeAll(async () => {
        // Ensure the test user exists or create one
        const signupRes = await request(app)
            .post('/api/auth/users')
            .send({ email: 'testuser44@example.com', password: 'password1231', username: 'testuser44' });
        
        // Login to get a token
        const loginRes = await request(app)
            .post('/api/auth/login')
            .send({ email: 'testuser@example.com', password: 'password123' });
        token = loginRes.body.token;

        // Create a channel for testing
        const channelRes = await request(app)
            .post('/api/channels/channels')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Test Channel12', description: 'Channel description12' });
        channelId = channelRes.body.channel._id;
    });

    // Test sending a message
    test('should send a message to a channel', async () => {
        const res = await request(app)
            .post(`/api/messages/channels/${channelId}/messages`)
            .set('Authorization', `Bearer ${token}`)
            .send({ content: 'Hello, world!1' });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toHaveProperty('content', 'Hello, world!1');
        messageId = res.body.message._id;
    });

    // Test getting messages from a channel
    test('should get messages from a channel', async () => {
        const res = await request(app)
            .get(`/api/messages/channels/${channelId}/messages`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('messages');
    });

    // Test deleting a message
    test('should delete a message from a channel', async () => {
        const res = await request(app)
            .delete(`/api/messages/messages/${messageId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Message has been deleted successfully');
    });

    afterAll(async () => {
      if (messageId) {
        await request(app)
          .delete(`/api/messages/messages/${messageId}`)
          .set('Authorization', `Bearer ${token}`);
      }
      if (channelId) {
        await request(app)
          .delete(`/api/channels/channels/${channelId}`)
          .set('Authorization', `Bearer ${token}`);
      }
    });
});
