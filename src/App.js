import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import axios from 'axios';

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
    })
    // This URL is hard-coded for movies for now
    const URL = `http://127.0.0.1:8000/api/v1/movies/`
    const headers = {
      headers: {
        Authorization: `Bearer ${this.state.accessToken}`
      }
    }
  
    try {
      const response = await axios.get(URL, headers);
      console.log('RESPONSE:', response);
      this.setState({
        movies: response.data,
      });
    } catch(error) {
      console.error('Error Fetching Movies', error);
    }
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
          <Route path='/collections/movies'>
            <Movies movies={this.state.movies} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;
