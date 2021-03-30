const Register = () => (
  <form className="register-form">
    <label htmlFor="email">Email</label>
    <input id="email" type="email" className="email-input"/><br/>
    <label htmlFor="username">Username</label>
    <input id="username" className="username-input"/><br/>
    <label htmlFor="password">Password</label>
    <input id="password" type="password" className="password-input"/><br/>
    <button>Register</button>
  </form>
);

export default Register;
