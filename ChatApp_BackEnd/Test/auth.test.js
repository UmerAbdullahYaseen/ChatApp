const request = require('supertest');
const app = require('../server'); // Your Express app

describe('Authentication API', () => {
  let token;
  let userId;

  // Test user registration
  test('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/users')
      .send({ username: 'testuser3111', email: 'testuser3111@example.com', password: 'password12345' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body).toHaveProperty('links');
    expect(res.body.links).toHaveProperty('self');
    expect(res.body.links).toHaveProperty('login');
    expect(res.body.links).toHaveProperty('allUsers');

    userId = res.body.user._id;
  });

  // Test user login
  test('should login a user and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'testuser3111@example.com', password: 'password12345' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  // Test user registration with existing email
  test('should return 400 if user already exists', async () => {
    const res = await request(app)
      .post('/api/auth/users')
      .send({ username: 'testuser', email: 'testuser3111@example.com', password: 'password12345' });

    expect(res.statusCode).toBe(400);
  });

  test('should return 401 for invalid token', async () => {
    const res = await request(app)
      .get('/api/auth/allusers/${userId}')
      .set('Authorization', 'Bearer invalidtoken');

    expect(res.statusCode).toBe(401);
  });

  // Test user deletion
  test('should delete a user', async () => {
    const res = await request(app)
      .delete(`/api/auth/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  afterAll(async () => {
    if (userId) {
      await request(app)
        .delete(`/api/auth/users/${userId}`)
        .set('Authorization', `Bearer ${token}`);
    }
  });
});
