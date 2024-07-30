const request = require('supertest');
const app = require('../server');

describe('Message API', () => {
    let token;
    let channelId;
    let messageId;

    // Setup
    beforeAll(async () => {
        // Log in to get a token
        const loginRes = await request(app)
            .post('/api/auth/login')
            .send({ email: 'testuser@example.com', password: 'password123' });
        token = loginRes.body.token;

        // Create a channel to test with
        const channelRes = await request(app)
            .post('/api/channels/channels')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Test Channelax1111', description: 'Channel descriptionaxx1111' });
        channelId = channelRes.body.channel._id;
    });

    // Test sending a message
    test('should send a message', async () => {
        const messageContent = 'Hello, world!1';

        const res = await request(app)
            .post(`/api/messages/channels/${channelId}/messages`)
            .set('Authorization', `Bearer ${token}`)
            .send({ content: messageContent });
            messageId = res.body.message._id

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toHaveProperty('_id');
        expect(res.body.message).toHaveProperty('content', messageContent);
        expect(res.body).toHaveProperty('links');
        expect(res.body.links).toHaveProperty('self');
        expect(res.body.links).toHaveProperty('channelMessages');

        expect(res.body.links.self).toBe(`/api/messages/${res.body.message._id}`);
        expect(res.body.links.channelMessages).toBe(`/api/channels/${channelId}/messages`);
    });

    test('should handle errors if message creation fails', async () => {
        // Simulate a failure by sending invalid data
        const res = await request(app)
            .post(`/api/messages/channels/${channelId}/messages`)
            .set('Authorization', `Bearer ${token}`)
            .send({});

        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error', 'Internal Server Error');

    });

    // Test getting messages from a channel
    test('should get all messages for a channel and return correct hypermedia links', async () => {
        const res = await request(app)
            .get(`/api/messages/channels/${channelId}/messages`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('messages');
        expect(Array.isArray(res.body.messages)).toBe(true);
        expect(res.body.messages.length).toBeGreaterThan(0); // Check if at least one message exists
        expect(res.body).toHaveProperty('links');
        expect(res.body.links).toHaveProperty('self');
        expect(res.body.links).toHaveProperty('sendMessage');

        expect(res.body.links.self).toBe(`/api/channels/${channelId}/messages`);
        expect(res.body.links.sendMessage).toBe(`/api/channels/${channelId}/messages`);
    });

    // Test error handling
    test('should handle errors if fetching messages fails', async () => {
        // Simulate a failure by using an invalid channel ID
        const invalidChannelId = 'invalidchannelid';
        const res = await request(app)
            .get(`/api/messages/channels/${invalidChannelId}/messages`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error', 'Internal Server Error');
    });


    test('should delete a message and return correct hypermedia links', async () => {
        // Perform the delete request
        const deleteRes = await request(app)
            .delete(`/api/messages/channels/${channelId}/messages/${messageId}`)
            .set('Authorization', `Bearer ${token}`);

        // Check the response
        expect(deleteRes.statusCode).toBe(200);
        expect(deleteRes.body).toHaveProperty('message', 'Message has been deleted successfully');
        expect(deleteRes.body.links).toHaveProperty('allMessages', `/api/channels/${channelId}/messages`);
    });


    afterAll(async () => {
        if (messageId) {
            await request(app)
                .delete(`/api/messages/channels/${channelId}/messages/${messageId}`)
                .set('Authorization', `Bearer ${token}`);
        }
        if (channelId) {
            await request(app)
                .delete(`/api/channels/channels/${channelId}`)
                .set('Authorization', `Bearer ${token}`);
        }
    });
});
