// backend/scrapers/cheggScraper.js
const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeScholarshipsCom() {
  const scholarships = [];

  try {
    const url = 'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major'; // sample category URL
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    $('.scholarship__item').each((i, element) => {
      const title = $(element).find('.scholarship__title').text().trim();
      const link = 'https://www.scholarships.com' + $(element).find('a').attr('href');
      const amount = $(element).find('.scholarship__amount').text().trim();
      const deadline = $(element).find('.scholarship__deadline').text().trim();
      const eligibility = $(element).find('.scholarship__info').text().trim();

      scholarships.push({
        title,
        amount,
        deadline,
        applicationLink: link,
        description: eligibility,
        source: 'Scholarships.com'
      });
    });

    return scholarships;

  } catch (error) {
    console.error('Error scraping Scholarships.com:', error.message);
    return [];
  }
}

module.exports = scrapeScholarshipsCom;
