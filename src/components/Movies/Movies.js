import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import MovieForm from './MovieForm';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';


class Movies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    }

    this.fetchMovies = this.fetchMovies.bind(this);
  }

  componentDidMount() {
    this.fetchMovies();
  }

  async fetchMovies() {
    // This URL is hard-coded for movies for now
    const URL = `http://127.0.0.1:8000/api/v1/movies/`
    const headers = {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`
      }
    }
  
    try {
      const response = await axios.get(URL, headers);
      this.setState({
        movies: response.data,
      });
    } catch(error) {
      console.error('Error Fetching Movies', error);
    }
  }

  render() {
    return (<>
      <Route path='/movies' exact >
        <h2>Your Movies:</h2>
        <MovieList movies={this.state.movies} />
      </Route>
      <Route path='/movies/new' exact >
        <MovieForm />
      </Route>
      <Route 
        path='/movies/:movieID' 
        exact
        // Using render and routerProps allows you to pass 
        // match, history, location, and your own props into the component 
        render={ routerProps => <MovieDetail {...routerProps} movies={this.state.movies}/>} 
      />
    </>)
  }
}

export default Movies;
