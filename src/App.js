import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Collections from './components/Collections/Collections';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Movies from './components/Movies/Movies';
import SignUp from './components/SignUp/SignUp';

import './App.scss'


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: '',
      refreshToken: '',
      renderSignUp: false,
      newUser: '',
    };

    this.greetNewUser = this.greetNewUser.bind(this);
    this.storeTokens = this.storeTokens.bind(this);
    this.toggleSignUp = this.toggleSignUp.bind(this);
  }

  async storeTokens({ access, refresh }) {
    this.setState({
      accessToken: access,
      refreshToken: refresh,
    });
  }

  toggleSignUp() {
    let newState = true;
    if (this.state.renderSignUp) newState = false;
    this.setState({
      renderSignUp: newState
    });
  }

  greetNewUser(newUser) {
    this.setState({
      newUser: newUser.username,
      renderSignUp: false,
    });
  }

  render() {
    return (
      <div className="app">
        <Router>
          <Header />
          <Switch>
            <Route path='/' exact>
              {/* Render collections or login/signup depending on presence of tokens */}
              { this.state.accessToken ?
                <Collections /> :
                <>
                  { this.state.newUser ?
                    <div className="login">
                      <h2>Welcome {this.state.newUser}, We Have Such Sights To Show You!</h2>
                      <p>Please Login to Your New Account</p>
                      <Login storeTokens={this.storeTokens} /> 
                    </div> :
                    <div className="login">
                      <h2>Welcome, We Have Such Sights To Show You!</h2>
                      <p>Please Login</p>
                      <Login storeTokens={this.storeTokens} />
                    </div>
                  }
                  { this.state.renderSignUp ?
                    <SignUp onSuccess={this.greetNewUser} /> :
                    <button onClick={this.toggleSignUp}>Sign Up</button>
                  }
                </>
              }
            </Route>
            <Route path='/movies'>
              <Movies 
                accessToken={this.state.accessToken}
                refreshToken={this.state.refreshToken} 
              />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
