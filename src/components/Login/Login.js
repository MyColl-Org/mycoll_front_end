import React from 'react';
import axios from 'axios';

const url = 'http://127.0.0.1:8000/accounts/'
// Add 'token/' to URL for obtaining a token pair
// Add 'create/' to URL to create a user

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.obtainTokens = this.obtainTokens.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  async obtainTokens(event) {
    // Sends token pair to <App/> to be stored in state upon success
    event.preventDefault();

    try {
      const response = await axios.post(url + 'token/', {
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
    return (<>
      <form onSubmit={this.obtainTokens}>
        <input
          name='username'
          type='text'
          value={this.state.username}
          placeholder='username'
          onChange={this.changeHandler}
        />
        <input
          name='password'
          type='password'
          value={this.state.password}
          placeholder='password'
          onChange={this.changeHandler}
        />
        <button>Login</button>

      </form>
    </>)
  }
}

export default Login;