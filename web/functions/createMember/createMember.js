// with thanks to https://github.com/vnovick/netlify-function-example/blob/master/functions/bad-words.js
const sanityClient = require('@sanity/client')
const nanoid = require('nanoid').nanoid
const sanityDataset = process.env.GATSBY_SANITY_DATASET || 'production'
const client = sanityClient({
  projectId: 'vj470dvu',
  dataset: sanityDataset,
  apiVersion: 'v1',
  ignoreBrowserTokenWarning: true,
  token: process.env.SANITY_TOKEN,
  useCdn: false, // `false` if you want to ensure fresh data
})

const event = {
  body: JSON.stringify({
    data: {
      new: {
        id: '87575a10-0880-4490-891a-76bc95554f52',
        display_name: 'Saleh Almeraj - 2',
      },
    },
  }),
}
const handler = async event => {
  let request
  try {
    request = JSON.parse(event.body)
  } catch (error) {
    return { statusCode: 400, body: 'c annot parse hasura event' }
  }

  const { data = {} } = request.event
  console.log(data)

  //code for sanity
  const newMemberships = [
    {
      _type: 'membership',
      type: { _ref: data.new.membership_id, _type: 'reference' },
    },
  ]
  const params = {
    memberId: data.new.user_id,
    draftMemberId: `drafts.${data.new.user_id}`,
  }
  let oldMemberData
  try {
    oldMemberData = await client.fetch(
      `*[_type== "member"
          && (_id == $memberId || _id == $draftMemberId) ]
          | order (_updatedAt desc)[0]`,
      params,
    )
  } catch (e) {
    console.log({ e })
    return { status: '400', error: e.toString() }
  }

  if (!oldMemberData) return { status: '400', error: 'no member found with this userID' }

  console.log(oldMemberData.memberships)
  try {
    const result = await client
      .patch(oldMemberData._id)
      .setIfMissing({ memberships: [] })
      .prepend('memberships', newMemberships)
      .commit()
    console.log(result)

    return { statusCode: 200, body: 'success' }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
