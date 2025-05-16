const Scholarship = require('../models/Scholarship');
const scrapeScholarshipsCom = require('../scrapers/scholarshipsComScraper');

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
  fetchScholarshipsCom
};
