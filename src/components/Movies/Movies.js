import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import AddMovie from './AddMovie';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';

import './Movies.css';


class Movies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };

    this.addMovie = this.addMovie.bind(this);
    this.addMovieCopy = this.addMovieCopy.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.removeMovie = this.removeMovie.bind(this);
    this.removeMovieCopy = this.removeMovieCopy.bind(this);
    this.updateMovie = this.updateMovie.bind(this);
  }

  componentDidMount() {
    // Populate state with all Movies in user's collection from the DB
    this.getMovies();
  }

  async getMovies() {
    // Gathers all Movies in user's collection from the DB and updates state
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

  addMovie(newMovie) {
    // Adds new Movie to state after being added to the DB
    this.setState({ movies: this.state.movies.concat([newMovie]) });
  }

  addMovieCopy(newCopy) {
    // Adds new MovieCopy to state after being added to the DB
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
    // Filters out the Movie that was just deleted from the DB
    this.setState( prevState => ({
      movies: prevState.movies.filter( movie => (movie.id !== id))
    }));
  };

  removeMovieCopy({ movieID, copyID }) {
    // Filters out the MovieCopy that was just deleted from the DB
    this.setState( prevState => ({
      movies: prevState.movies.map( movie => (
        movie.id === movieID ?
        {
          ...movie,
          copies: movie.copies.filter( copy => (copy.id !== copyID))
        } :
        movie
      ))
    }));
  }

  updateMovie(updatedMovie) {
    // Updates Movie in state after updating the DB
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
      <div className="movies">
        <Switch>
          <Route path='/movies' exact >
            <h2>Your Movies:</h2>
            <Link to='/movies/new'>Add Movie</Link>
            <MovieList movies={this.state.movies} />
          </Route>
          <Route path='/movies/new' exact >
            <AddMovie
              accessToken={this.props.accessToken}
              addMovie={this.addMovie} />
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
                          addMovieCopy={this.addMovieCopy}
                          removeMovie={this.removeMovie}
                          removeMovieCopy={this.removeMovieCopy}
                          updateMovie={this.updateMovie}
                          movie={movie} 
                        /> 
              }
            }
          />
        </Switch>
      </div>
    </>);
  }
}

export default Movies;
