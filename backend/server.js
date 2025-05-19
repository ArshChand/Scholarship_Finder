const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const studentsroutes = require('./routes/students');
const scholarshipRoutes = require('./routes/scholarshipRoutes'); 
const authRoutes = require('./routes/authRoutes'); // Correct import

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/students', studentsroutes);
app.use('/scholarships', scholarshipRoutes);
app.use('/api/auth', authRoutes); // Correct mounting

app.get('/', (req, res) => {
    res.send("Scholarship Finder API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
