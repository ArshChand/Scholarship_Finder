const express = require('express');
const router = express.Router();
const {
  fetchScholarshipsCom,
  getAllScholarships,
  getScholarshipsForStudent
} = require('../controllers/scholarshipController');
const requireAuth = require('../middleware/requireAuth');

router.get('/fetch', fetchScholarshipsCom); // For admin or cron usage
router.get('/all', getAllScholarships); // Public/all users
router.get('/my-scholarships', requireAuth, getScholarshipsForStudent); // 🔐 Protected

module.exports = router;
