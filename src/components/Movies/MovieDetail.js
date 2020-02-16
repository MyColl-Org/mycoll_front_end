import React from 'react';
import { Redirect } from 'react-router-dom';


class MovieDetail extends React.Component {

  render() {
    // Pre-assemble text content for clarity
    const movieTitle = `${this.props.movie.title} (${this.props.movie.release_year})`;
    const movieRating = `MPAA Rating: ${this.props.movie.mpaa_rating}`;
    const movieRuntime = `Runtime (mins): ${this.props.movie.runtime_minutes}`;
    
    return (<>
      { this.props.movie ?

        <div className="movie-detail">
          
          <h2>Movie Detail Page</h2>
          <h3>{ movieTitle }</h3>
          <img src={this.props.movie.image_link} alt={`${this.props.movie.title} cover art`} />
          <p>{ movieRating }</p>
          <p>{ movieRuntime }</p>
          
          <h3>Copies:</h3>
          <ul>
          { this.props.movie.copies ?

            this.props.movie.copies.map( copy => (<MovieCopy key={copy.id.toString()} copy={copy} />)):

            <li key="0">No Copies</li>
          }
          </ul>
        </div> :

        <Redirect to='/' />
      }
    </>);
  }
}


class MovieCopy extends React.Component {
  render() {
    const copyText = `${this.props.copy.form} on ${this.props.copy.platform}`;

    return (<>
      { this.props.copy.vod_link ?

        <li>
          <a href={this.props.copy.vod_link} target="_blank" rel="noopener noreferrer">
            { copyText }
          </a>
        </li> :
        
        <li>{ copyText }</li>
      }
    </>);
  }
}

export default MovieDetail;
