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
      <h2>Your Movies:</h2>
      { props.movies.map(movie_data => (
        <MovieItem movie={movie_data} key={movie_data.id}/>
      ))}
    </>
  )
}


const MovieItem = props => (
  // Returns representation of a single movie
    <div className="movie-item">
      <Link to={`movies/${props.movie.id}`} replace >
        <h3>{props.movie.title} ({props.movie.release_year})</h3>
      </Link>
      <img src={props.movie.image_link} alt={`${props.movie.title} cover art`} />
      <p>MPAA Rating: {props.movie.mpaa_rating}</p>
      <p>Runtime (mins): {props.movie.runtime_minutes}</p>
    </div>
)
