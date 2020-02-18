import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import './movies.css';


class MovieList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      sortFunction: this.runtimeSort,
      orderAscending: true, 
    }

    this.runtimeSort = this.runtimeSort.bind(this);
    this.titleAlphaSort = this.titleAlphaSort.bind(this);
  }

  titleAlphaSort(a, b) {
    let sortIndicator = 0;
    const ascending = this.state.orderAscending;
    if (a.title < b.title) ascending ? sortIndicator = -1 : sortIndicator = 1;
    if (a.title > b.title) ascending ? sortIndicator = 1 : sortIndicator = -1;
    return sortIndicator;
  }

  runtimeSort(a, b) {
    let sortIndicator = 0;
    const ascending = this.state.orderAscending;
    const runtime_a = parseInt(a.runtime_minutes);
    const runtime_b = parseInt(b.runtime_minutes);
    if (runtime_a < runtime_b) ascending ? sortIndicator = -1 : sortIndicator = 1;
    if (runtime_a > runtime_b) ascending ? sortIndicator = 1 : sortIndicator = -1;
    return sortIndicator;
  }

  render () {
  
    const movies = this.props.movies.sort(this.state.sortFunction.bind(this));

    return (
      <>
        {/* Render movies if there are any in state, or redirect to root */}
        { this.props.movies ?

          movies.map(movie_data => (
            <MovieItem movie={movie_data} key={movie_data.id}/>
          )) :

          <Redirect to="/" />
      }
      </>
    );
  }
}


// <MovieItem /> Component
const MovieItem = props => {
  // Returns representation of a single movie
  
  // Pre-assemble text content for clarity
  const movieTitle = `${props.movie.title} (${props.movie.release_year})`;
  const movieRating = `MPAA Rating: ${props.movie.mpaa_rating}`;
  const movieRuntime = `Runtime (mins): ${props.movie.runtime_minutes}`;
  
  return (
    <div className="movie-item">
      <Link to={{pathname: `movies/detail/${props.movie.id}`, state: props.movie}} replace >
        <h3>{ movieTitle }</h3>
      </Link>
      <img src={props.movie.image_link} alt={`${props.movie.title} cover art`} />
      <p>{ movieRating }</p>
      <p>{ movieRuntime }</p>
    </div>
  );
}

export default MovieList;
