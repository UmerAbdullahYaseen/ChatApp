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
  test('should login a user and return a token with hypermedia links', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'testuser3111@example.com', password: 'password12345' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('links');
    expect(res.body.links).toHaveProperty('self', '/api/auth/login');
    expect(res.body.links).toHaveProperty('user', `/api/auth/users/${userId}`);
    token = res.body.token;
  });
  

  // Test user registration with existing email
  test('should return 400 if user already exists', async () => {
    const res = await request(app)
      .post('/api/auth/users')
      .send({ username: 'testuser', email: 'testuser3111@example.com', password: 'password12345' });

    expect(res.statusCode).toBe(400);
  });
  
  test('should fetch all users and return correct hypermedia links', async () => {
    const res = await request(app)
      .get('/api/auth/users')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('users');
    expect(Array.isArray(res.body.users)).toBe(true);
    expect(res.body.users.length).toBeGreaterThan(0); // Check if there are users in the response
    expect(res.body).toHaveProperty('links');
    expect(res.body.links).toHaveProperty('self', '/api/auth/users');
    expect(res.body.links).toHaveProperty('register', '/api/auth/users');
  });


  test('should get a specific user by ID and return correct hypermedia links', async () => {
    const res = await request(app)
      .get(`/api/auth/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('_id', userId);
    expect(res.body).toHaveProperty('links');
    expect(res.body.links).toHaveProperty('self', `/api/auth/users/${userId}`);
    expect(res.body.links).toHaveProperty('delete', `/api/auth/users/${userId}`);
    expect(res.body.links).toHaveProperty('update', `/api/auth/users/${userId}`); 
  });


  // Test fetching a user with missing or invalid token
  test('should return 401 for unauthorized access', async () => {
    const invalidToken = 'Bearer invalidtoken';

    const res = await request(app)
      .get(`/api/auth/users/${userId}`)
      .set('Authorization', invalidToken);

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message', 'Unauthorized: Token invalid or expired');
});

  // Test user deletion
  test('should delete a user', async () => {
    const res = await request(app)
      .delete(`/api/auth/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'User has been deleted successfully');
  });

  afterAll(async () => {
    if (userId) {
      await request(app)
        .delete(`/api/auth/users/${userId}`)
        .set('Authorization', `Bearer ${token}`);
    }
  });
});
