import React from 'react';
import { Redirect } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import LoginForm from './LoginForm';

const Login = () => {
  const { authState } = useOktaAuth();

  if (authState.isPending) {
    return <div>Loading...</div>;
  }
  return authState.isAuthenticated
    ? <Redirect to={{ pathname: '/' }}/>
    : <LoginForm />;
};

export default Login;
