<<<<<<< HEAD
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));
    

// Routes
const authRouter = require('./routes/authRouter');
app.use('/api/auth', authRouter);

const channelRouter = require('./routes/channelListRoute');
app.use('/api/channels', channelRouter);

const messageRouter = require('./routes/messagesRoute');
app.use('/api/messages', messageRouter);

// Start server
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }

module.exports = app;
=======
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Routes
const authRouter = require('./routes/authRouter');
app.use('/api/auth', authRouter);

const channelRouter = require('./routes/channelListRoute');
app.use('/api/channels', channelRouter);

const messageRouter = require('./routes/messagesRoute');
app.use('/api/messages', messageRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
>>>>>>> origin/master
