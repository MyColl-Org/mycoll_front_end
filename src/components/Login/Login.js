import React from 'react';
import axios from 'axios';


const URL = 'http://127.0.0.1:8000/accounts/';


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
    const username = this.props.newUser ? ` ${this.props.newUser}` : '';
    const welcomeMessage = `Welcome${username}, We Have Such Sights To Show You!`;
    let loginMessage = 'Please Login';
    if (this.props.newUser) loginMessage += " to Your New Account";

    return (
      <div className="login">
        <h2>{ welcomeMessage }</h2>
        <p>{ loginMessage }</p>
        <form onSubmit={this.obtainTokens} className="login-form">
          <label>
            Username
            <input
              name='username'
              type='text'
              value={this.state.username}
              placeholder='username'
              onChange={this.changeHandler}
            />
          </label>
          <label>
            Password
            <input
              name='password'
              type='password'
              value={this.state.password}
              placeholder='password'
              onChange={this.changeHandler}
            />
          </label>
          <button>Login</button>
        </form>
      </div>
    )
  }
}

export default Login;
