import React from 'react';
import axios from 'axios';


const URL = 'http://127.0.0.1:8000/accounts/create/';


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
      email: '',
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  changeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async createUser(event) {
    event.preventDefault();

    try {
      const response = await axios.post(URL, {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      });

      this.props.onSuccess(response.data);
    } catch(error) {
      console.error('Error ocurred while creating new user.', error);
    }
  }

  render() {
    return (
      <form onSubmit={this.createUser} className="signup-form">
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
        <input
          name='email'
          type='email'
          value={this.state.email}
          placeholder='email'
          onChange={this.changeHandler}
        />
        <button>Create Account</button>
      </form>
    )
  }
}

export default SignUp;
