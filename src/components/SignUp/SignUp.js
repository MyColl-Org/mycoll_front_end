import React from 'react';
import axios from 'axios';

import './SignUp.scss';


const URL = 'https://104.248.238.221/accounts/create/';


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
    // Handles changes in the signup form fields and state
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async createUser(event) {
    // Makes a POST request to the DB to create a new user
    // Updates state through the addNewUser() chain
    event.preventDefault();

    try {
      const response = await axios.post(URL, {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      });

      this.props.addNewUser(response.data);
    } catch(error) {
      console.error('Error ocurred while creating new user.', error);
    }
  }

  render() {
    if (this.props.newUser) return <></>;
    return (
      <div className="signup">
        {/* Render form or button */}
        { this.props.renderSignUpForm ?
          <>
            <form onSubmit={this.createUser} className="signup-form">
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
              <label htmlFor="password">Password (min 8 characters):</label>
              <input
                required
                id="password"
                name="password"
                type="password"
                value={this.state.password}
                placeholder="password"
                onChange={this.changeHandler}
              />
              <label htmlFor="email">Email Address:</label>
              <input
                required
                id="email"
                name="email"
                type="email"
                value={this.state.email}
                placeholder="email"
                onChange={this.changeHandler}
              />
              <button>Submit</button>
            </form>
            <button onClick={this.props.toggleSignUpForm}>Cancel</button> 
          </>:
          <button onClick={this.props.toggleSignUpForm}>Create Account</button>
        }
      </div>
    );
  }
}

export default SignUp;
