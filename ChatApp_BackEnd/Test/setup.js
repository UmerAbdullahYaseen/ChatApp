const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server');
const http = require('http');

let mongoServer;
let server;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  server = http.createServer(app);
  await new Promise(resolve => server.listen(3001, resolve));
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  await new Promise(resolve => server.close(resolve));
});
