import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import About from './components/About/About';
import Collections from './components/Collections/Collections';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Movies from './components/Movies/Movies';
import Nav from './components/Nav/Nav';
import SignUp from './components/SignUp/SignUp';

import './App.scss';


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
    // Stores JWT pair in state once obtained by <Login>
    this.setState({
      accessToken: access,
      refreshToken: refresh,
    });
  }

  toggleSignUp() {
    // Toggles rendering of <SignUp>
    let newState = this.state.renderSignUp ? false : true;
    this.setState({ renderSignUp: newState });
  }

  greetNewUser(newUser) {
    // Stores new username to state to customize welcome and login messages
    this.setState({
      newUser: newUser.username,
      renderSignUp: false,
    });
  }

  render() {
    const username = this.state.newUser ? ` ${this.state.newUser}` : '';
    const welcomeMessage = `Welcome${username}, We Have Such Sights To Show You!`;
    let loginMessage = 'Please Login';
    if (this.state.newUser) loginMessage += " to Your New Account";

    return (
      <div className="app">
        <Router>
          <Header />
          { this.state.accessToken ? <Nav /> : false }
          <Switch>
            <Route path="/" exact>
              {/* Render collections or login/signup depending on presence of tokens */}
              { this.state.accessToken ?
                  <Collections /> :
                <>
                  <div className="login">
                    <h2>{ welcomeMessage }</h2>
                    <p>{ loginMessage }</p>
                    <Login storeTokens={this.storeTokens} /> 
                  </div> 
                  <div className="signup">
                    { this.state.renderSignUp ?
                      <SignUp onSuccess={this.greetNewUser} /> :
                      <button onClick={this.toggleSignUp}>Sign Up</button>
                    }
                  </div>
                </>
              }
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
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
