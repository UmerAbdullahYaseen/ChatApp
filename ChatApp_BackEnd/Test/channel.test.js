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
  test('should create a new channel with hypermedia links', async () => {
    const res = await request(app)
      .post('/api/channels/channels')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test Channel 211ssssssss', description: 'Channel description 211ssssssss' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('channel');
    expect(res.body.channel).toHaveProperty('_id');
    expect(res.body).toHaveProperty('links');
    expect(res.body.links).toHaveProperty('self');
    expect(res.body.links).toHaveProperty('allChannels');

    channelId = res.body.channel._id; // Save channelId for later use

    expect(res.body.links.self).toBe(`/api/channels/channels/{channelId}`);
    expect(res.body.links.allChannels).toBe(`/api/channels/channels`);
  });

  // Test getting all channels
  test('should get all channels', async () => {
    const res = await request(app)
      .get('/api/channels/channels')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('channels');
    expect(res.body).toHaveProperty('links');
    expect(res.body.links).toHaveProperty('self');
    expect(res.body.links).toHaveProperty('createChannel');

    expect(res.body.links.self).toBe('/api/channels/channels');
    expect(res.body.links.createChannel).toBe('/api/channels/channels');
  });

  test('should get the details of a specific channel', async () => {
    const res = await request(app)
      .get(`/api/channels/channels/${channelId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('channel');
    expect(res.body.channel).toHaveProperty('_id', channelId);
    expect(res.body).toHaveProperty('links');
    expect(res.body.links).toHaveProperty('self');
    expect(res.body.links).toHaveProperty('update');
    expect(res.body.links).toHaveProperty('delete');

    expect(res.body.links.self).toBe(`/api/channels/channels/{channelId}`);
    expect(res.body.links.update).toBe(`/api/channels/channels/{channelId}`);
    expect(res.body.links.delete).toBe(`/api/channels/channels/{channelId}`);
  });

  // Test updating channel details
  test('should update a channel', async () => {
    const uniqueName = `Updated Unique Channel Name ${Date.now()}`;
    const updatedData = { name: uniqueName, description: 'Updated description' };

    // Perform the update request
    const res = await request(app)
      .put(`/api/channels/channels/${channelId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedData);

    // Verify the update response
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Channel updated successfully');
    expect(res.body).toHaveProperty('links');
    expect(res.body.links).toHaveProperty('self');
    expect(res.body.links).toHaveProperty('allChannels');
    expect(res.body.links.self).toBe(`/api/channels/channels/{channelId}`);
    expect(res.body.links.allChannels).toBe(`/api/channels/channels`);

    // Verify the channel was updated
    const channelRes = await request(app)
      .get(`/api/channels/channels/${channelId}`)
      .set('Authorization', `Bearer ${token}`);

    // Expect 200 and verify updated properties
    expect(channelRes.statusCode).toBe(200);
    expect(channelRes.body.channel).toHaveProperty('name', uniqueName);
    expect(channelRes.body.channel).toHaveProperty('description', updatedData.description);
  });

  test('should delete a channel', async () => {

    // Attempt to delete the channel
    const deleteRes = await request(app)
      .delete(`/api/channels/channels/${channelId}`)
      .set('Authorization', `Bearer ${token}`);

    // Verify the response
    expect(deleteRes.statusCode).toBe(200);
    expect(deleteRes.body).toHaveProperty('message', 'Channel deleted successfully');
    expect(deleteRes.body).toHaveProperty('links');
    expect(deleteRes.body.links).toHaveProperty('allChannels');
    expect(deleteRes.body.links.allChannels).toBe(`/api/channels/channels`);

    // Verify the channel was deleted
    const channelRes = await request(app)
      .get(`/api/channels/channels/${channelId}`)
      .set('Authorization', `Bearer ${token}`);

    // Expect 404 and correct error message
    expect(channelRes.statusCode).toBe(404);
    expect(channelRes.body).toHaveProperty('error', 'Channel not found');
  });

  afterAll(async () => {
    await request(app)
      .delete(`/api/channels/channels/${channelId}`)
      .set('Authorization', `Bearer ${token}`);
  });

}); 
