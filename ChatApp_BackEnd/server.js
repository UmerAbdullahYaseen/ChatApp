const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const { swaggerUi, swaggerSpec } = require('./swagger');

require('dotenv').config();

const app = express();
// Middleware
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Database connection { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect("process.evn.MONGODB_URL")
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));
    
app.use(express.static(path.join(__dirname, '../messageboard/build')));
// Routes
const authRouter = require('./routes/authRouter');
app.use('/api/auth', authRouter);

const channelRouter = require('./routes/channelListRoute');
app.use('/api/channels', channelRouter);

const messageRouter = require('./routes/messagesRoute');
app.use('/api/messages', messageRouter);

console.log(`Swagger UI available at http://localhost:3001/api-docs`);

// Start server
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../messageboard/build/index.html'));
});


module.exports = app;
