const Scholarship = require('../models/scholarship');
const User = require('../models/User'); // Changed from Student to User
const scrapeScholarshipsCom = require('../scrapers/scholarshipScraper');

function convertDeadlineToDate(deadlineStr) {
  return new Date(deadlineStr);
}

const getAllScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find();

    scholarships.sort((a, b) => {
      const dateA = convertDeadlineToDate(a.deadline);
      const dateB = convertDeadlineToDate(b.deadline);
      return dateA - dateB;
    });

    res.json(scholarships);
  } catch (error) {
    console.error('Error fetching scholarships:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const fetchScholarshipsCom = async (req, res) => {
  try {
    const scraped = await scrapeScholarshipsCom();

    for (let item of scraped) {
      await Scholarship.updateOne(
        { title: item.title },
        { $set: item },
        { upsert: true }
      );
    }

    res.status(200).json({ inserted: scraped.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATED: Get scholarships relevant to the logged-in user
const getScholarshipsForStudent = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { gpa, course, location } = user;

    const matchedScholarships = await Scholarship.find({
      minGPA: { $lte: gpa },
      eligibleCourses: course,       // or { $in: [course] } if it's an array
      location: location
    });

    matchedScholarships.sort((a, b) => {
      const dateA = convertDeadlineToDate(a.deadline);
      const dateB = convertDeadlineToDate(b.deadline);
      return dateA - dateB;
    });

    res.status(200).json(matchedScholarships);
  } catch (error) {
    console.error('Error filtering scholarships:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  fetchScholarshipsCom,
  getAllScholarships,
  getScholarshipsForStudent
};
