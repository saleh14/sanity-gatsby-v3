const { launchArgs } = require('puppeteer-testing-library')

module.exports = {
  launch: {
    args: launchArgs(),
    // devtools: true,
  },
}
