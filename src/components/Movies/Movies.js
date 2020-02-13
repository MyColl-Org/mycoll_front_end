import React from 'react';
import { Route } from 'react-router-dom';

import MovieList from './MovieList';
// import MovieDetail from './MovieDetail';


class Movies extends React.Component {

  render() {
    return (<>
      <Route path='/collections/movies'>
        <MovieList movies={this.props.movies} />
      </Route>
      {/* <Route path='/collections/movies/:movieID' component={MovieDetail} /> */}
    </>)
  }
}

export default Movies;
