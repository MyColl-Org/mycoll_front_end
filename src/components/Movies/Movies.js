import React from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';

import MovieForm from './MovieForm';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';


class Movies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };

    this.addCreatedMovie = this.addCreatedMovie.bind(this);
    this.fetchMovies = this.fetchMovies.bind(this);
  }

  componentDidMount() {
    this.fetchMovies();
  }

  async fetchMovies() {
    const URL = "http://127.0.0.1:8000/api/v1/movies/";
    const headers = {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`
      }
    };
  
    try {
      const response = await axios.get(URL, headers);
      this.setState({
        movies: response.data,
      });
    } catch(error) {
      console.error('Error Fetching Movies', error);
    }
  }

  addCreatedMovie(newMovie) {
    this.setState({
      movies: this.state.movies.concat([newMovie])
    });
  }

  render() {
    return (<>
      <Route path='/movies' exact >
        <h2>Your Movies:</h2>
        <Link to='/movies/new'>Add Movie</Link>
        <MovieList movies={this.state.movies} />
      </Route>
      <Route path='/movies/new' exact >
        <MovieForm
          accessToken={this.props.accessToken}
          onSuccess={this.addCreatedMovie}
        />
      </Route>
      <Route 
        path='/movies/detail/:movieID' 
        exact
        // render allows access to routerProps (match, history, location)
        // used here for filtering state before passing props and rendering
        render={ routerProps => {
            const id = parseInt(routerProps.match.params.movieID);
            const movie = this.state.movies.find( movie => (movie.id === id));
            return <MovieDetail movie={movie}/> 
          }
        }
      />
    </>);
  }
}

export default Movies;
