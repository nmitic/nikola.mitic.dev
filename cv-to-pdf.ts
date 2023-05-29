const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://nikola-mitic-dev.vercel.app/cv');
  await page.pdf({ path: `./public/nikola_mitic_cv.pdf`, printBackground: true });
  await browser.close();
})();