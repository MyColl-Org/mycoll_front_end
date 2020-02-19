import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import MovieCopyForm from './MovieCopyForm';


class MovieDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmDelete: false,
      renderCopyForm: false,
    }

    this.copyCreated = this.copyCreated.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.toggleConfirmDelete = this.toggleConfirmDelete.bind(this);
    this.toggleCopyForm = this.toggleCopyForm.bind(this);
  }

  toggleCopyForm() {
    // Toggle the form for creating copies of movies
    let change = true;
    if (this.state.renderCopyForm) {
      change = false;
    }
    this.setState({
      renderCopyForm: change,
    });
  }

  copyCreated(newCopy) {
    this.toggleCopyForm();
    this.props.addCopy(newCopy);
  }

  toggleConfirmDelete() {
    let newState = this.state.confirmDelete ? false : true;
    this.setState({
      confirmDelete: newState
    });
  }

  async deleteMovie() {
    const axiosConfig = {
      method: 'delete',
      url: `http://127.0.0.1:8000/api/v1/movies/${this.props.movie.id}`,
      data: null,
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`
      }
    };

    let response;
    try {
      response = await axios(axiosConfig);
    } catch(error) {
      console.error(error);
    }

    if (response.status === 204 ) {
      this.props.onDeleteSuccess(this.props.movie.id);
    }
    
  }


  render() {
    let movieTitle, movieRating, movieRuntime;

    if (this.props.movie) {
      // Pre-assemble text content for clarity
      movieTitle = `${this.props.movie.title} (${this.props.movie.release_year})`;
      movieRating = `MPAA Rating: ${this.props.movie.mpaa_rating}`;
      movieRuntime = `Runtime (mins): ${this.props.movie.runtime_minutes}`;
    }
    
    return (<>
      { this.props.movie ?

        <div className="movie-detail">
          
          {/* Movie Info OR <Redirect> */}
          <h2>{ movieTitle }</h2>
          <img src={this.props.movie.image_link} alt={`${this.props.movie.title} cover art`} />
          <p>{ movieRating }</p>
          <p>{ movieRuntime }</p>

          {/* Delete Buttons */}
          { this.state.confirmDelete ?
            <>
              <button onClick={this.toggleConfirmDelete}>CANCEL</button>
              <button onClick={this.deleteMovie}>CONFIRM DELETE</button>
            </> :
            <button onClick={this.toggleConfirmDelete}>Delete Movie</button>
          }

          {/* Copies List */}
          { this.props.movie.copies.length > 0 ?

            <>
              <h3>Copies:</h3>
              <ul>
                { this.props.movie.copies.map( copy => (<MovieCopy key={copy.id.toString()} copy={copy} />)) }
              </ul>
            </> :

            // false here renders nothing rather than insert an empty tag
            false
          }

          {/* New Copy Form */}
          { this.state.renderCopyForm ?
          
            <MovieCopyForm 
              movieID={this.props.movie.id} 
              accessToken={this.props.accessToken}
              onSuccess={this.copyCreated}
            /> :

            <button onClick={this.toggleCopyForm}>Add Copy</button>
          }
        </div> :

        <Redirect to='/movies' />
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
