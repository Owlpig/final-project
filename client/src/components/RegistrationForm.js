import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';

const RegistrationForm = () => {
  const { oktaAuth } = useOktaAuth();
  const [triggerAuthCheck, setTriggerAuthCheck] = useState(false);
  const [sessionToken, setSessionToken] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const checkAuthentication = async () => {
    console.log(oktaAuth);
    const token = await oktaAuth.getIdToken();
    if (token) {
      setSessionToken(token);
    }
  };

  const addToDB = () => {
    fetch('api/mongodb/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, password, firstName, lastName,
      }),
    });
  };

  useEffect(() => {
    if (triggerAuthCheck) {
      checkAuthentication();
    }
  });

  const handleSubmit = e => {
    e.preventDefault();

    setTriggerAuthCheck(true);
    fetch('api/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, password, firstName, lastName,
      }),
    })
      .then(() => {
        oktaAuth.signInWithCredentials({ username: email, password })
          .then(res => {
            const token = res.sessionToken;
            setSessionToken(token);
            oktaAuth.signInWithRedirect({ sessionToken: token });
          });
      })
      .then(() => addToDB())
      .catch(err => console.error('Error', err));
  };

  const handleFirstNameChange = e => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = e => {
    setLastName(e.target.value);
  };

  const handleEmailChange = e => {
    setEmail(e.target.value);
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
      <label htmlFor="firstName">First Name</label>
      <input onChange={handleFirstNameChange} value={firstName} id="firstName" className="firstName-input"/><br/>
      <label htmlFor="lastName">Last Name</label>
      <input onChange={handleLastNameChange} value={lastName} id="lastName" className="lastName-input"/><br/>
      <label htmlFor="email">Email</label>
      <input onChange={handleEmailChange} value={email} id="email" type="email" className="email-input"/><br/>
      <label htmlFor="password">Password</label>
      <input onChange={handlePasswordChange} value={password }id="password" type="password" className="password-input"/><br/>
      <button>Register</button>
    </form>
  );
};

export default RegistrationForm;
