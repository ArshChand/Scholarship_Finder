// backend/routes/scholarshipRoutes.js
const express = require('express');
const router = express.Router();
const { fetchScholarshipsCom } = require('../controllers/scholarshipController');

router.get('/scrape/scholarships-com', fetchScholarshipsCom);

module.exports = router;
