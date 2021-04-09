const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: process.env.OKTA_CLIENT_ID,
  issuer: `https://${process.env.OKTA_DOMAIN}/oauth2/default`,
  assertClaims: { cid: process.env.OKTA_CLIENT_ID },
});

const authenticationRequired = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/)[1];

  if (!match) {
    res.status(401);
    return next('No match');
  }

  const accessToken = match;
  const audience = 'api://default';
  return oktaJwtVerifier.verifyAccessToken(accessToken, audience)
    .then(jwt => {
      req.jwt = jwt;
      next();
    })
    .catch(err => {
      console.log(err.message);
      res.status(401).send(err.message);
    });
};

module.exports = authenticationRequired;
