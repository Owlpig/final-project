import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';

const LoginForm = () => {
  const { oktaAuth } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    oktaAuth.signInWithCredentials({ username, password })
      .then(res => {
        const token = res.sessionToken;
        setSessionToken(token);
        oktaAuth.signInWithRedirect({ sessionToken: token });
      })
      .catch(err => setError(err.message));
  };

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  if (sessionToken) {
    return null;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
  <form onSubmit={handleSubmit} className="login-form">
    <label htmlFor="username">Username: </label>
    <input value={username} onChange={handleUsernameChange} id="username" className="username-input"/><br/>
    <label htmlFor="password">Password: </label>
    <input value={password} onChange={handlePasswordChange} id="password" type="password" className="password-input"/><br/>
    <button id="submit">Login</button>
  </form>
  );
};

export default LoginForm;
