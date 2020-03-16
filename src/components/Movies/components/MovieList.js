import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import './MovieList.scss';
import defaultImage from '../img/default_movie_cover.png';


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
    return (
      <li>
        <div className="movie-item">
          { this.props.movie.image_link ?
          <img 
            src={ this.props.movie.image_link}
            alt={`${this.props.movie.title} cover art`}
            title={this.props.movie.title} 
          /> :
          <img
            src={defaultImage}
            alt={`${this.props.movie.title} cover art`}
            title={this.props.movie.title}
            className="default-movie-image"
          />
          }
          <div className="item-details-outer">
            <div className="item-details-inner">
            <Link to={{pathname: `movies/detail/${this.props.movie.id}`, state: this.props.movie}} replace >
              <h3>{ this.props.movie.title }</h3>
            </Link>
            <p>{this.props.movie.release_year} | {this.props.movie.mpaa_rating} | {this.props.movie.runtime_minutes}mins</p>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

export default MovieList;
