import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import Home from './Home';
import Login from './Login';
import Protected from './Protected';

const AppWithRouterAccess = () => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push('/login');
  };

  const oktaAuth = new OktaAuth({
    issuer: 'https://dev-32761676.okta.com/oauth2/default',
    clientId: '0oag63erk4H4bSk7t5d6',
    redirectUri: window.location.origin + '/login/callback',
    onAuthRequired: onAuthRequired,
    pkce: true
  });

  return (
    <Security oktaAuth={oktaAuth}>
      <Route path='/' exact={true} component={Home} />
      <SecureRoute path='/protected' component={Protected} />
      <Route path='/login' render={() => <Login />} />
      <Route path='/login/callback' component={LoginCallback} />
    </Security>
  );
};
export default AppWithRouterAccess;