// Load variables from `.env` as soon as possible
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const clientConfig = require("./client-config");

const isProd = process.env.NODE_ENV === "production";

let conditionalPlugin = []
if (process.env.RUN_ANALYSER)
  conditionalPlugin.push("gatsby-plugin-webpack-bundle-analyser-v2")
module.exports = {
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-sanity",
      options: {
        ...clientConfig.sanity,
        token: process.env.SANITY_READ_TOKEN,
        watchMode: !isProd,
        overlayDrafts: !isProd,
      },
    },
    ...conditionalPlugin
  ],
}
