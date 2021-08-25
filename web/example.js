const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  await page.goto('http://localhost:8888/member');
  await page.waitForSelector('input[type=email]')
  await page.focus('input[type=email]')
  await page.keyboard.type('saleh.mahdi12@gmail.com')
  await page.focus('input[type=password]')
  await page.keyboard.type('82546sas')
  await page.keyboard.press('Enter')
  page.on('close', async () => {
    // will not get here!
    browser.close();
  }
  )

})();
