

const express = require('express');
const dbConnect=require("./config/database")
const bodyParser = require('body-parser');
const User=require("./routes/authRoutes")
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
// const profileRoutes = require('./routes/profileRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("api/v1",User);

// MongoDB connection
dbConnect();



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
