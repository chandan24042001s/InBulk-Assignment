

const express = require('express');
const dbConnect=require("./config/database")
const bodyParser = require('body-parser');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
// const profileRoutes = require('./routes/profileRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
// app.use(cors());

// MongoDB connection
dbConnect();

// Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/profile', profileRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
