const pTestingLibrary = require('puppeteer-testing-library')
const { QueryEmptyError, find } = pTestingLibrary
require('puppeteer-testing-library/extend-expect')
jest.setTimeout(10000)
describe('localhost/membership', () => {
  beforeAll(async () => {
    // await jestPuppeteer.resetPage()
    await page.goto('http://localhost:8888/membership')
  })

  it('should login and display the user data', async () => {
    await expect(find({ role: 'button', name: 'إغلاق' }, { timeout: 50 })).rejects.toThrow(
      QueryEmptyError,
    )
    const membershipLink = await find({ role: 'link', name: 'الاشتراك في إحدى العضويات ←' })
    await membershipLink.click()
    const preSignup = await find({ role: 'button', name: 'إغلاق' })
    await expect(preSignup).toBeVisible()
    await preSignup.click()
    await expect(preSignup).not.toBeVisible()
    const emailInput = await find({ role: 'textbox', name: 'email' })
    const passowrdInput = await find({ role: 'textbox', name: 'password' })
    const btn = await find({ role: 'button', name: 'Login' })
    await emailInput.type('saleh.mearaj@gmail.com')
    await passowrdInput.type('82546sas')
    await btn.evaluateHandle(e => e.click())
    await find({ role: 'link', name: 'Join' })
  })

  it('should update the db when typing', async () => {
    await find({ role: 'textbox', name: 'gender', value: 'male' })
    await expect(
      find({ role: 'textbox', name: 'id' }, { timeout: 100 }),
    ).rejects.toThrow(QueryEmptyError)
    await expect(
      find({ role: 'textbox', name: '__typename' }, { timeout: 100 }),
    ).rejects.toThrow(QueryEmptyError)
  })
})
