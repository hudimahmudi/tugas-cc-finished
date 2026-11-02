const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const channelRoutes = require('./routes/channel.routes');
const contentRoutes = require('./routes/content.routes');
const userRoutes = require('./routes/user.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) req.body = {};
  next();
});

app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/channels', channelRoutes);
app.use('/api/v1/contents', contentRoutes);
app.use('/api/v1/users', userRoutes);

app.use(errorHandler);

module.exports = app;