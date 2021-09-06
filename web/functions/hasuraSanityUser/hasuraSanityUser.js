// with thanks to https://github.com/vnovick/netlify-function-example/blob/master/functions/bad-words.js
const axios = require('axios')
const sanityClient = require('@sanity/client')

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
      display_name
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
  console.log(data)

  console.log(variables)

  let userDetail
  try {
    const variables = {
      id: data && data.new && data.new.id,
    }
    userDetail = await axios.post(
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
    console.log(userDetail.data.data.users_by_pk.display_name)
  } catch (error) {
    console.log({ eerror: error })
    return { statusCode: 500, body: error.toString() }
  }

  try {
    const newUser = {
      _id: data.new.id,
      _type: 'member',
      name: userDetail.data.data.users_by_pk.display_name,
      email: userDetail.data.data.users_by_pk.account.email,
    }
    const result = await client.createIfNotExists(newUser)
    return { statusCode: 200, body: result }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
