import React, { useState } from 'react';
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
  const [country, setCountry] = useState();
  const history = useHistory();
  const onAuthRequired = () => {
    history.push('/login');
  };
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };

  const oktaAuth = new OktaAuth({
    issuer: `https://${process.env.REACT_APP_OKTA_DOMAIN}/oauth2/default`,
    clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
    redirectUri: `${window.location.origin}/login/callback`,
    onAuthRequired,
    pkce: true,
  });

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <header className="main-header">
        <img className='logo' alt='logo' src='https://media.discordapp.net/attachments/798450868423884804/829314234587545660/StreamCompass_logo.png.png'/>
        <h1><Link className="main-heading" to="/">StreamCompass</Link></h1>
      </header>
      <main className="main">
        <Switch>
          <Route path="/register">
            <RegistrationForm/>
          </Route>
          <Route path="/tvShow-details/:id">
            <Details country={country}/>
          </Route>
          <Route path='/profile' component={ProfilePage} />
          <Route path='/login/callback' component={LoginCallback} />
          <Route path='/login' render={() => <Login />} />
          <Route path='/' exact={true}>
            <Home setCountry={setCountry}/>
          </Route>
        </Switch>
      </main>
      <footer class="page-footer">
        <p>© 2021 hackCapone. All rights reserved.</p>
        <a href="https://github.com/Owlpig/final-project-StreamCompass">
          <img className='github-logo' alt="GitHub logo" src="https://media.discordapp.net/attachments/798450868423884804/829681474671345694/GitHub-Mark-Light-32px.png"/>
        </a>
      </footer>
    </Security>
  );
};
export default AppWithRouterAccess;
