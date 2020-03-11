import React from 'react';
import axios from 'axios';

import './Login.scss';

const URL = 'https://db.mycoll.app/accounts/';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.obtainTokens = this.obtainTokens.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  async obtainTokens(event) {
    // Sends token pair to <App/> to be stored in state upon success
    event.preventDefault();

    try {
      const response = await axios.post(URL + 'token/', {
        username: this.state.username,
        password: this.state.password,
      });

      this.props.storeTokens(response.data);
    } catch (error) {
      console.error('Error ocurred while obtaining tokens.', error);
    }
  }

  changeHandler(event) {
    // Handles changes in the form inputs.
    this.setState({
      // This square bracket syntax uses a variable as a key
      [event.target.name]: event.target.value
    });
  }

  render() {
    if (this.props.renderSignUpForm) return <></>;
    const userGreeting = this.props.newUser ? 
      `Welcome ${this.props.newUser}!` : 
      false;

    return (
      <div className="login">
        { userGreeting ? <h2>{ userGreeting }</h2> : false}
        {/* <h3>We Have Such Sights To Show You!</h3> */}
        <form onSubmit={this.obtainTokens} className="login-form">
          <label htmlFor="username">Username:</label>
          <input
            required
            id="username"
            name="username"
            type="text"
            value={this.state.username}
            placeholder="username"
            onChange={this.changeHandler}
          />
          <label htmlFor="password">Password:</label>
          <input
            required
            id="password"
            name="password"
            type="password"
            value={this.state.password}
            placeholder="password"
            onChange={this.changeHandler}
          />
          <button>Login</button>
        </form>
      </div>
    )
  }
}

export default Login;
