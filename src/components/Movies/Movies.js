import React from 'react';
import { Redirect } from 'react-router-dom';


export default props => {
  // Builds a list of movies if movies are present
  // Redirects to homepage otherwise
  if (!props.myMovies) {
    return <Redirect to="/" />
  }

  return (
    <>
      <h2>Your Movies:</h2>
      { props.myMovies.map(movie_data => (
        <MovieItem movie={movie_data} key={movie_data.id}/>
      ))}
    </>
  )
}


const MovieItem = props => (
  // Returns representation of a single movie
    <div className="movie-item">
      <h3>{props.movie.title} ({props.movie.release_year})</h3>
      <p>MPAA Rating: {props.movie.mpaa_rating}</p>
      <p>Runtime (mins): {props.movie.runtime_minutes}</p>
    </div>
)
