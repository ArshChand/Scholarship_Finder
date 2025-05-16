const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const studentsroutes = require('./routes/students');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use('/students', studentsroutes);

app.get('/', (req, res) => {
    res.send("Scholarship Finder API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});