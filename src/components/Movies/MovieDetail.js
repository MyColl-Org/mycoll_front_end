import React from 'react';
import { Redirect } from 'react-router-dom';

class MovieDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
    }
  }
  
  componentDidMount() {
    const id = parseInt(this.props.match.params.movieID);
    const movie = this.props.movies.find( movie => (movie.id === id));
    this.setState({
      movie: movie,
    })
  }

  render() {
    return (<>
      { this.state.movie ?

        <div className="movie-detail">
          <h2>Movie Detail Page</h2>
          <p>{this.state.movie.title}</p>
          <h3>{this.state.movie.title} ({this.state.movie.release_year})</h3>
          <img src={this.state.movie.image_link} alt={`${this.state.movie.title} cover art`} />
          <p>MPAA Rating: {this.state.movie.mpaa_rating}</p>
          <p>Runtime (mins): {this.state.movie.runtime_minutes}</p>
        </div> :

        <Redirect to='/' />
      }
    </>)
  }
}

export default MovieDetail;
