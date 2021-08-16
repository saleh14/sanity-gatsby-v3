/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
const React = require('react')
const provider = require('./src/lib/MemberContext')
const { ProviderWrapper } = provider
exports.wrapRootElement = ({ element }) => {
  return (
    <ProviderWrapper>
      {element}
    </ProviderWrapper>
  )
}
