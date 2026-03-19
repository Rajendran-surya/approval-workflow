const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
const requestRoutes = require('./routes/requestRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

// Routes
app.use('/api/requests', requestRoutes);

// Error handling middleware
app.use(errorHandler);

// Database connection and server start
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    // Sync models (create tables if not exist)
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });