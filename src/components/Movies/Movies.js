import React from 'react';
import { Route } from 'react-router-dom';

import MovieList from './MovieList';
import MovieDetail from './MovieDetail';


class Movies extends React.Component {

  render() {
    return (<>
      <Route path='/collections/movies' exact >
        <MovieList movies={this.props.movies} />
      </Route>
      <Route 
        path='/collections/movies/:movieID' 
        exact
        // Using render and routerProps allows you to pass 
        // match, history, location, and your own props into the component 
        render={ routerProps => <MovieDetail {...routerProps} movies={this.props.movies}/>} 
      />
    </>)
  }
}

export default Movies;
