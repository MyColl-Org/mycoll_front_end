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
      copies: movie.copies,
    })
  }

  render() {
    return (<>
      { this.state.movie ?

        <div className="movie-detail">
          
          <h2>Movie Detail Page</h2>
          <h3>{this.state.movie.title} ({this.state.movie.release_year})</h3>
          <img src={this.state.movie.image_link} alt={`${this.state.movie.title} cover art`} />
          <p>MPAA Rating: {this.state.movie.mpaa_rating}</p>
          <p>Runtime (mins): {this.state.movie.runtime_minutes}</p>
          
          <h3>Copies:</h3>
          <ul>
          { this.state.copies ?

            this.state.copies.map( copy => (<MovieCopy copy={copy} />)):

            <li>No Copies</li>
          }
          </ul>
        </div> :

        <Redirect to='/' />
      }
    </>)
  }
}


class MovieCopy extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<>
      { this.props.copy.vod_link ?
        <li><a href={this.props.copy.vod_link}>{this.props.copy.form} on {this.props.copy.platform}</a></li> :
        <li>{this.props.copy.form} on {this.props.copy.platform}</li>
      }
    </>)
  }
}

export default MovieDetail;
