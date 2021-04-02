const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: process.env.OKTA_DOMAIN,
  token: process.env.OKTA_API_TOKEN,
});

module.exports = client;
