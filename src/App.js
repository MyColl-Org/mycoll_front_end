import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import About from './components/About/About';
import Books from './components/Books/Books';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Movies from './components/Movies/Movies';
import Nav from './components/Nav/Nav';
import Shows from './components/Shows/Shows';
import SignUp from './components/SignUp/SignUp';

import './App.scss';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: '',
      refreshToken: '',
      newUser: '',
      renderSignUpForm: false,
    };

    this.addNewUser = this.addNewUser.bind(this);
    this.storeTokens = this.storeTokens.bind(this);
    this.toggleSignUpForm = this.toggleSignUpForm.bind(this);
  }

  addNewUser(newUser) {
    // Stores new username to state to customize welcome and login messages
    this.setState({
      newUser: newUser.username,
      renderSignUpForm: false,
    });
  }

  async storeTokens({ access, refresh }) {
    // Stores JWT pair in state once obtained by <Login>
    this.setState({
      accessToken: access,
      refreshToken: refresh,
    });
  }

  toggleSignUpForm() {
    // Toggles rendering of the signup form
    let newState = this.state.renderSignUpForm ? false : true;
    this.setState({ renderSignUpForm: newState });
  }

  render() {
    return (
      <div className="app">
        <Router>
          <div className="wrapper">
            { this.state.accessToken ? <Nav /> : false }
            <div className="content">
              <Switch>
                <Route path="/" exact>
                  <div className="welcome">
                    {/* Render collections or login/signup depending on presence of tokens */}
                    { this.state.accessToken ?
                      <Redirect to="/movies" /> :
                      <>
                        <h1>MyColl</h1>
                        <Login 
                          newUser={this.state.newUser}
                          renderSignUpForm={this.state.renderSignUpForm}
                          storeTokens={this.storeTokens} 
                        />
                        <SignUp 
                          addNewUser={this.addNewUser}
                          newUser={this.state.newUser}
                          renderSignUpForm={this.state.renderSignUpForm}
                          toggleSignUpForm={this.toggleSignUpForm} 
                        /> 
                      </>
                    }
                  </div>
                </Route>
                <Route path='/about' exact>
                  <About />
                </Route>
                <Route path='/movies'>
                  <Movies 
                    accessToken={this.state.accessToken}
                    refreshToken={this.state.refreshToken} 
                  />
                </Route>
                <Route path='/books'>
                  <Books />
                </Route>
                <Route path='/shows'>
                  <Shows />
                </Route>
              </Switch>
            </div>
          </div>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
