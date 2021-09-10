// with thanks to https://github.com/vnovick/netlify-function-example/blob/master/functions/bad-words.js
const { axiosInstance, sanityClient } = require('../../src/lib/functions/perparation')

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

  const { data = {} } = request.event

  let userDetail
  try {
    const variables = {
      id: data && data.new && data.new.id,
    }
    console.log({ variables })
    userDetail = await axiosInstance.post(`/`, {
      query: GET_EMAIL_QUERY,
      variables,
    })
    if (userDetail && userDetail.data && userDetail.data.data)
      console.log(userDetail.data.data.users_by_pk.display_name)
    else console.log('userDetail.data error')
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
    const result = await sanityClient.createIfNotExists(newUser)
    return { statusCode: 200, body: result }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
