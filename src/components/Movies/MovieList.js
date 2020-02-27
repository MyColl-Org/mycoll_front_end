import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import './MovieList.scss';


class MovieList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      sortFunction: this.titleAlphaSort,
      orderAscending: true, 
    }

    this.runtimeSort = this.runtimeSort.bind(this);
    this.titleAlphaSort = this.titleAlphaSort.bind(this);
  }

  titleAlphaSort(a, b) {
    // Sorts movies based on their title
    let sortIndicator = 0;
    const ascending = this.state.orderAscending;
    if (a.title < b.title) ascending ? sortIndicator = -1 : sortIndicator = 1;
    if (a.title > b.title) ascending ? sortIndicator = 1 : sortIndicator = -1;
    return sortIndicator;
  }

  runtimeSort(a, b) {
    // Sorts movies based on length of their runtime
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
    // Redirect to home page if there are no movies in state
    if (!this.props.movies) return <Redirect to="/" />

    return (
      <ul className="movie-list">
        {movies.map(movie_data => (
          <MovieItem movie={movie_data} key={movie_data.id}/>
        ))}
      </ul> 
    );
  }
}


class MovieItem extends React.Component{
  render() {
    const movieTitle = `${this.props.movie.title} (${this.props.movie.release_year})`;
    return (
      <li className="movie-item">
        <img 
          src={this.props.movie.image_link} 
          alt={`${this.props.movie.title} cover art`}
          title={this.props.movie.title} 
        />
        <div className="item-details-outer">
          <div className="item-details-inner">
          <Link to={{pathname: `movies/detail/${this.props.movie.id}`, state: this.props.movie}} replace >
            <h3>{ movieTitle }</h3>
          </Link>
          <p><span className="detail-heading">Rating: </span>{ this.props.movie.mpaa_rating }</p>
          <p><span className="detail-heading">Runtime: </span>{ this.props.movie.runtime_minutes }</p>
          </div>
        </div>
      </li>
    )
  }
}

export default MovieList;
