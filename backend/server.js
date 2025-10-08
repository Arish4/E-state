const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./utils/db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: ['https://resilient-souffle-b6032e.netlify.app'], // frontend (Vite)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const estateRoutes = require('./routes/estateRoute');
const userRoutes = require('./routes/userRoute');
app.use('/estates', estateRoutes);
app.use('/users', userRoutes);

// Connect to DB and start server
const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await db(); // ensure DB is connected before starting server
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to DB:', err);
    process.exit(1); // exit process so deployment knows it failed
  }
}

startServer();
