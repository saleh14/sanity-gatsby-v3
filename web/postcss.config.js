const pImport = require('postcss-import')
const pUrl = require('postcss-url')
const pMedia = require('postcss-custom-media')
const  pNesting= require('postcss-nesting')
module.exports = () => ({
  plugins: [
  pImport(),pUrl(),pNesting(),pMedia()
  ],
});
