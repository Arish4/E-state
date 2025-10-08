const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./utils/db');
require('dotenv').config();

const app = express();

// Connect DB
db();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173'], // frontend (Vite)
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

// Server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
