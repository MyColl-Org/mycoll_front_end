import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import './movies.css';


// <MovieList /> Component
export default props => {
  // Builds a list of movies if movies are present
  // Redirects to homepage otherwise
  if (!props.movies) {
    return <Redirect to="/" />
  }

  return (
    <>
      { props.movies.map(movie_data => (
        <MovieItem movie={movie_data} key={movie_data.id}/>
      ))}
    </>
  )
}


// <MovieItem /> Component
const MovieItem = props => {
  // Returns representation of a single movie
  
  // Pre-assemble text content for clarity
  let movieTitle = `${props.movie.title} (${props.movie.release_year})`
  let movieRating = `MPAA Rating: ${props.movie.mpaa_rating}`
  let movieRuntime = `Runtime (mins): ${props.movie.runtime_minutes}`
  
  return (
    <div className="movie-item">
      <Link to={{pathname: `movies/${props.movie.id}`, state: props.movie}} replace >
        <h3>{ movieTitle }</h3>
      </Link>
      <img src={props.movie.image_link} alt={`${props.movie.title} cover art`} />
      <p>{ movieRating }</p>
      <p>{ movieRuntime }</p>
    </div>
  )
}