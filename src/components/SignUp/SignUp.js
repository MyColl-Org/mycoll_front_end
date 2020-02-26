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
      renderSignUpForm: false,
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.createUser = this.createUser.bind(this);
    this.toggleSignUp = this.toggleSignUp.bind(this);
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

  toggleSignUp() {
    // Toggles rendering of the signup form
    let newState = this.state.renderSignUpForm ? false : true;
    this.setState({ renderSignUpForm: newState });
  }

  render() {
    return (
      <div className="signup">
        {/* Render form or button */}
        { this.state.renderSignUpForm ?
          <form onSubmit={this.createUser} className="signup-form">
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
              Password (min 8 characters)
              <input
                name='password'
                type='password'
                value={this.state.password}
                placeholder='password'
                onChange={this.changeHandler}
              />
            </label>
            <label>
              Email Address
              <input
                name='email'
                type='email'
                value={this.state.email}
                placeholder='email'
                onChange={this.changeHandler}
              />
            </label>
            <button>Create Account</button>
          </form> :
          <button onClick={this.toggleSignUp}>Sign Up</button>
        }
      </div>
    );
  }
}

export default SignUp;
