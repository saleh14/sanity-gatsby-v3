const axios = require('axios')
const sanityClient = require('@sanity/client')({
  projectId: 'vj470dvu',
  dataset: process.env.GATSBY_SANITY_DATASET || 'production',
  apiVersion: 'v1',
  ignoreBrowserTokenWarning: true,
  token: process.env.SANITY_TOKEN,
  useCdn: false, // `false` if you want to ensure fresh data
})

const hasuraSecret = process.env.HASURA_ADMIN_SECRET

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'x-hasura-admin-secret': hasuraSecret,
  },
})

exports.sanityClient = sanityClient
exports.axiosInstance = axiosInstance
