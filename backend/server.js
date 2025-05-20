const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const scholarshipRoutes = require('./routes/scholarshipRoutes'); 
const auth = require('./routes/auth'); 

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));


app.get('/', (req, res) => {
    res.send("Scholarship Finder API");
});
app.use('/scholarships', scholarshipRoutes);
app.use('/api/auth', auth); // Correct mounting


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
