import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';

const RegistrationForm = () => {
  const { oktaAuth, authService } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const checkAuthentication = async () => {
    const token = await authService.getIdToken();
    if (token) {
      setSessionToken({ token });
    }
  }

  useEffect(() => {
    checkAuthentication();
  });

  const handleSubmit = e => {
    e.preventDefault();

    fetch('api/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password, firstName, lastName})
    })
    .then(user => {
      oktaAuth.signInWithCredentials({ username, password })
      .then(res => {
        const token = res.sessionToken;
        setSessionToken(token);
        oktaAuth.signInWithRedirect({ sessionToken });
      })
    })
    .catch(err => console.error('Error', err));

  
  };

  const handleFirstNameChange = e => {
    setFirstName(e.target.value);
  }

  const handleLastNameChange = e => {
    setLastName(e.target.value);
  }

  const handleEmailChange = e => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  if (sessionToken) {
    // Hide form while sessionToken is converted into id/access tokens
    return null;
  }
  
  return (
  <form onSubmit={handleSubmit} className="register-form">
    <label value={email} htmlFor="email">Email</label>
    <input id="email" type="email" className="email-input"/><br/>
    <label htmlFor="password">Password</label>
    <input id="password" type="password" className="password-input"/><br/>
    <button>Register</button>
  </form>
)};

export default RegistrationForm;
