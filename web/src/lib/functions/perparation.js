const axios = require('axios')
export const sanityClient = require('@sanity/client')({
  projectId: 'vj470dvu',
  dataset: process.env.GATSBY_SANITY_DATASET || 'production',
  apiVersion: 'v1',
  ignoreBrowserTokenWarning: true,
  token: process.env.SANITY_TOKEN,
  useCdn: false, // `false` if you want to ensure fresh data
})

const hgeEndpoint = process.env.HASURA_END_POINT
const hasuraSecret = process.env.HASURA_ADMIN_SECRET

export const axiosInstance = axios.create({
  baseUrl: `${hgeEndpoint}/v1alpha1/graphql`,
  headers: {
    'Content-Type': 'application/json',
    'x-hasura-admin-secret': hasuraSecret,
  },
})
