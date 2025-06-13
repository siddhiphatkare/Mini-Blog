const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes'); // ✅ Add this line

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get('/', (req, res) => {
  res.send('Mini Blog API is running...');
});

// API Routes
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes); // ✅ Enable login & signup API

// MongoDB & Server Initialization
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit on failure
  }
};

startServer();
