const puppeteer = require('puppeteer-core')
const pTestingLibrary = require('puppeteer-testing-library')
require('puppeteer-testing-library/extend-expect')

const { launchArgs } = pTestingLibrary
;(async () => {
  const browser = await puppeteer.launch({
    args: launchArgs(),
    headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  })

  global.page = await browser.newPage()

  const userNameInput = await find({ role: 'link', name: 'الاشتراك في إحدى العضويات ←' })
  await userNameInput.type('My name')

  await page.setViewport({ width: 1366, height: 768 })
  await page.goto('http://localhost:8888/membership')
  await page.waitForSelector('a[data-testid="next"]', { timeout: 2000 })
  const anchorText = await page.$eval('a[data-testid="next"]', elem => elem.click())
  console.log(anchorText)
  await page.waitForSelector('button[data-testid="prenext"]')
  await page.click('button[data-testid="prenext"]')
  await page.waitForSelector('input[type="email"]', { timeout: 2000 })
  await page.focus('input[type="email"]')
  await page.keyboard.type('saleh.mahdi12@gmail.com')
  await page.focus('input[type=password]')
  await page.keyboard.type('82546sas')
  await page.keyboard.press('Enter')
  page.on('close', async () => {
    // will not get here!
    browser.close()
  })
})()
