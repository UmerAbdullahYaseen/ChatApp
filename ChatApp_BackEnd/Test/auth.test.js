const request = require('supertest');
const app = require('../server'); // Your Express app

describe('Authentication API', () => {
  let token;

  // Test user registration
  test('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/users')
      .send({ username: 'testuser31', email: 'testuser31@example.com', password: 'password12345' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('user');
  });
  // Test user login
  test('should login a user and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'testuser@example.com', password: 'password123' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  // Test getting user details with invalid token
  test('should return 401 for invalid token', async () => {
    const res = await request(app)
      .get('/api/auth/allusers/123456789012345678901234')
      .set('Authorization', 'Bearer invalidtoken');

    expect(res.statusCode).toBe(401);
  });

  // Test user registration with existing email
  test('should return 400 if user already exists', async () => {
    const res = await request(app)
      .post('/api/auth/users')
      .send({ username: 'testuser', email: 'testuser@example.com', password: 'password123' });

    expect(res.statusCode).toBe(400);
  });

  // Test user deletion
  test('should delete a user', async () => {
    const res = await request(app)
      .delete('/api/auth/users/123456789012345678901234')
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
