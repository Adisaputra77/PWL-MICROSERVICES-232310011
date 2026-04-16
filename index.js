const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup MongoDB connection
const mongoURI = 'mongodb://127.0.0.1:27017/user_management_db';
mongoose.connect(mongoURI)
    .then(() => console.log('Successfully connected to MongoDB.'))
    .catch(err => console.error('MongoDB connection error:', err));

// Register User Routes
app.use('/', userRoutes);

// Root route for initial ping or fallback test
app.get('/ping', (req, res) => {
    res.status(200).json({ message: 'User Management Service is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
