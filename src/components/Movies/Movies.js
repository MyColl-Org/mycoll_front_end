import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
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
    this.addCreatedMovieCopy = this.addCreatedMovieCopy.bind(this);
    this.fetchMovies = this.fetchMovies.bind(this);
    this.removeMovie = this.removeMovie.bind(this);
    this.updateMovie = this.updateMovie.bind(this);
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

  addCreatedMovieCopy(newCopy) {
    const id = newCopy.movie;
    
    // Inspiration: https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
    this.setState( prevState => ({
      movies: prevState.movies.map( movie => (
        movie.id === id ?
        // IF this is the related movie: update the copies
        // TIP: Spread objects before adding new properties to be merged
        {...movie, copies: [...movie.copies, newCopy]} :
        // ELSE: return the unaltered movie
        movie
      ))
    }));
  }

  removeMovie(id) {
    // Filter out the movie that was just deleted from the database
    this.setState( prevState => ({
      movies: prevState.movies.filter( movie => (movie.id !== id))
    }));
  };

  updateMovie(updatedMovie) {
    this.setState( prevState => ({
      movies: prevState.movies.map( movie => (
        movie.id === updatedMovie.id ?
        { ...updatedMovie } :
        movie
      ))
    }));
  }

  render() {
    return (<>
      <Switch>

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
              return  <MovieDetail 
                        accessToken={this.props.accessToken}
                        addCopy={this.addCreatedMovieCopy}
                        onDeleteSuccess={this.removeMovie}
                        onUpdateSuccess={this.updateMovie}
                        movie={movie} 
                      /> 
            }
          }
        />
      </Switch>
    </>);
  }
}

export default Movies;
