const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function scrapeScholarshipsCom() {
  const browser = await puppeteer.launch({
    headless: false, // Set to true later once stable
    defaultViewport: null,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36');

  await page.goto('https://www.scholarships.com/financial-aid/college-scholarships', {
    waitUntil: 'networkidle2',
    timeout: 60000
  });

  await autoScroll(page);

  await page.waitForSelector('.award-box > a', { timeout: 10000 });

  const scholarships = await page.evaluate(() => {
    return [...document.querySelectorAll('.award-box > a')].map(el => {
      const titleEl = el.querySelector('h2') || el.querySelector('em');
      const title = titleEl ? titleEl.innerText.trim() : '';

      const lis = el.querySelectorAll('ul > li');
      let amount = '';
      let deadline = '';

      lis.forEach(li => {
        const em = li.querySelector('em')?.innerText.toLowerCase();
        const spanText = li.querySelector('span')?.innerText.trim();

        if (em?.includes('amount')) amount = spanText || '';
        if (em?.includes('deadline')) deadline = spanText || '';
      });

      const link = 'https://www.scholarships.com' + (el.getAttribute('href') || '');
      const description = el.querySelector('p')?.innerText.trim() || '';

      return {
        title,
        amount,
        deadline,
        applicationLink: link,
        description,
        source: 'Scholarships.com',
      };
    });
  });

  await browser.close();
  return scholarships;
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        const loaded = document.querySelectorAll('.award-box').length;
        if (loaded >= 25 || totalHeight > 3000) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
}

module.exports = scrapeScholarshipsCom;