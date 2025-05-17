const Scholarship = require('../models/Scholarship');
const scrapeScholarshipsCom = require('../scrapers/scholarshipsComScraper');

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

    // Optional: prevent duplicate insertions by checking title + source
    for (let item of scraped) {
      await Scholarship.updateOne(
        { title: item.title, source: item.source },
        { $set: item },
        { upsert: true }
      );
    }

    res.status(200).json({ inserted: scraped.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  fetchScholarshipsCom,
  getAllScholarships
};

