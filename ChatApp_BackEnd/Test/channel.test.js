const request = require('supertest');
const app = require('../server');

describe('Channel API', () => {
  let token;
  let channelId;

  // Setup
  beforeAll(async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'testuser@example.com', password: 'password123' });
    token = loginRes.body.token;
  });

  // Test creating a new channel
  test('should create a new channel', async () => {
    const res = await request(app)
      .post('/api/channels/channels')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test Channel 2', description: 'Channel description 2' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('channel');
    channelId = res.body.channel._id;
  });

  // Test getting channel details
  test('should get channel details', async () => {
    const res = await request(app)
      .get(`/api/channels/channels/${channelId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('channel');
  });


  // Test updating channel details
  test('should update channel details', async () => {
    const res = await request(app)
      .put(`/api/channels/channels/${channelId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated Channel', description: 'Updated description' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Channel updated successfully');
  });


  // Test deleting a channel
  test('should delete a channel', async () => {
    const res = await request(app)
      .delete(`/api/channels/channels/${channelId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Channel deleted successfully');
  }); 

  afterAll(async () => {
    if (channelId) {
      await request(app)
        .delete(`/api/channels/channels/${channelId}`)
        .set('Authorization', `Bearer ${token}`);
    }
  });
});
