// backend/routes/scholarshipRoutes.js
const express = require('express');
const router = express.Router();
const { fetchScholarshipsCom } = require('../controllers/scholarshipController');
const { getAllScholarships } = require('../controllers/scholarshipController');

router.get('/fetch', fetchScholarshipsCom);
router.get('/all', getAllScholarships);

module.exports = router;