import React from 'react';
import {
  Route, useHistory, Switch, Link,
} from 'react-router-dom';
import { Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';

import Home from './Home';
import Login from './Login';
import ProfilePage from './ProfilePage';
import RegistrationForm from './RegistrationForm';
import Details from './Details';

const AppWithRouterAccess = () => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push('/login');
  };
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };

  const oktaAuth = new OktaAuth({
    issuer: 'https://dev-32761676.okta.com/oauth2/default',
    clientId: '0oag63erk4H4bSk7t5d6',
    redirectUri: `${window.location.origin}/login/callback`,
    onAuthRequired,
    pkce: true,
  });

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <header className="main-header">
        <h1><Link className="main-heading" to="/">StreamCompass</Link></h1>
      </header>
      <main className="main">
        <Switch>
          <Route path="/register">
            <RegistrationForm/>
          </Route>
          <Route path="/tvShow-details/:id">
            <Details />
          </Route>
          <Route path='/profile' component={ProfilePage} />
          <Route path='/login/callback' component={LoginCallback} />
          <Route path='/login' render={() => <Login />} />
          <Route path='/' exact={true} component={Home} />
        </Switch>
      </main>
    </Security>
  );
};
export default AppWithRouterAccess;
