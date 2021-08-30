// with thanks to https://github.com/vnovick/netlify-function-example/blob/master/functions/bad-words.js
const axios = require('axios')
const sanityClient = require('@sanity/client')
const nanoid = require('nanoid').nanoid

const hgeEndpoint = process.env.HASURA_END_POINT
const hasuraSecret = process.env.HASURA_ADMIN_SECRET

const sanityDataset = process.env.GATSBY_SANITY_DATASET || 'production'
const client = sanityClient({
  projectId: 'vj470dvu',
  dataset: sanityDataset,
  apiVersion: 'v1',
  ignoreBrowserTokenWarning: true,
  token: process.env.SANITY_TOKEN,
  useCdn: false, // `false` if you want to ensure fresh data
})

const GET_EMAIL_QUERY = `
  query getEmail($id: uuid!) {
    users_by_pk(id: $id) {
      account {
        email
      }
    }
  }
`

const handler = async event => {
  let request
  try {
    request = JSON.parse(event.body)
  } catch (error) {
    return { statusCode: 400, body: 'cannot parse hasura event' }
  }

  const { data = {} } = request

  const variables = {
    id: data.new.id,
  }

  try {
    const { data } = await axios.post(
      `${hgeEndpoint}/v1alpha1/graphql`,
      {
        query: GET_EMAIL_QUERY,
        variables,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': hasuraSecret,
        },
      },
    )

    return { statusCode: 200, body: 'success' }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
