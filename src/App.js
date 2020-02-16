import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Collections from './components/Collections/Collections';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Movies from './components/Movies/Movies';
import Footer from './components/Footer/Footer';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: '',
      refreshToken: '',
      movies: [],
    }

    this.storeTokens = this.storeTokens.bind(this);
  }

  async storeTokens({ access, refresh }) {
    this.setState({
      accessToken: access,
      refreshToken: refresh,
    });
  }

  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route path='/' exact>
            {/* Render collections or login depending on presence of tokens */}
            { this.state.accessToken ?
              <Collections /> :
              <>
                <h2>Welcome, We Have Such Sights To Show You!</h2>
                <p>Please Login</p>
                <Login storeTokens={this.storeTokens} />
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
    );
  }
}

export default App;
