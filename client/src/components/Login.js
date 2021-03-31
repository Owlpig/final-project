const Login = () => (
  <form className="login-form">
    <label htmlFor="username">Username</label>
    <input id="username" className="username-input"/><br/>
    <label htmlFor="password">Password</label>
    <input id="password" type="password" className="password-input"/><br/>
    <button>Login</button>
  </form>
);

export default Login;
