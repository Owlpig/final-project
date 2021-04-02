const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: 'https://dev-32761676.okta.com',
  token: process.env.OKTA_API_TOKEN,
});

module.exports = client;
