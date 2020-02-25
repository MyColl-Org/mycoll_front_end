import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import MovieCopies from './MovieCopies';
import MovieUpdateForm from './MovieUpdateForm';


class MovieDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmDelete: false,
      renderCopyEdit: false,
      renderCopyForm: false,
      renderUpdateForm: false,
    }

    this.copyCreated = this.copyCreated.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.toggleConfirmDelete = this.toggleConfirmDelete.bind(this);
    this.toggleCopyForm = this.toggleCopyForm.bind(this);
    this.toggleUpdateForm = this.toggleUpdateForm.bind(this);
  }

  toggleCopyForm() {
    // Toggle the form for creating copies of movies
    const newState = this.state.renderCopyForm ? false : true;
    this.setState({ renderCopyForm: newState });
  }

  copyCreated(newCopy) {
    // Hides <CopyForm> and updates state in <Movies> with the new MovieCopy
    this.toggleCopyForm();
    this.props.addCopy(newCopy);
  }

  toggleConfirmDelete() {
    // Toggles the 'Confirm Delete' button's text
    const newState = this.state.confirmDelete ? false : true;
    this.setState({ confirmDelete: newState });
  }

  toggleUpdateForm() {
    // Toggles rendering of the <MovieUpdateForm>
    const newState = this.state.renderUpdateForm ? false : true;
    this.setState({ renderUpdateForm: newState });
  }

  async deleteMovie() {
    // Makes a DELETE request to the DB then updates state in <Movies>
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
      this.props.onDeleteMovieSuccess(this.props.movie.id);
    }
    
  }

  render() {
    const movieTitle = this.props.movie ? 
      `${this.props.movie.title} (${this.props.movie.release_year})` : 
      "";

    // Redirect to <Movies> if Movie has been deleted
    if (!this.props.movie) return <Redirect to="/movies" />
    
    return (
      <div className="movie-detail">
        {/* Movie Details OR Movie Update Form */}
        { this.state.renderUpdateForm ?
          <>
            <MovieUpdateForm 
              movie={this.props.movie}
              accessToken={this.props.accessToken}
              onSuccess={this.props.onUpdateMovieSuccess}
              toggleForm={this.toggleUpdateForm}
            />
            <button onClick={this.toggleUpdateForm}>CANCEL</button>
          </> :
          <>
            <h2>{ movieTitle }</h2>
            <img 
              src={this.props.movie.image_link} 
              alt={`${this.props.movie.title} cover art`}
              title={this.props.movie.title} 
            />
            <p><span className="detail-heading">Overview: </span>{ this.props.movie.overview }</p>
            <p><span className="detail-heading">Rating: </span>{ this.props.movie.mpaa_rating }</p>
            <p><span className="detail-heading">Runtime: </span>{ this.props.movie.runtime_minutes }</p>
            {/* Render link to The Movie Database if present */}
            { this.props.movie.tmdb_page_link !== '' ?
              <a 
                href={this.props.movie.tmdb_page_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                TMDb Details
              </a> :
              false
            }
            <button onClick={this.toggleUpdateForm}>UPDATE</button>
          </>
        }
        {/* Delete Buttons */}
        { this.state.confirmDelete ?
          <>
            <button onClick={this.toggleConfirmDelete}>CANCEL</button>
            <button onClick={this.deleteMovie}>CONFIRM DELETE</button>
          </> :
          <button onClick={this.toggleConfirmDelete}>DELETE</button>
        }
        <MovieCopies 
          movie={this.props.movie}
          accessToken={this.props.accessToken}
          copyCreated={this.copyCreated}
          renderCopyForm={this.state.renderCopyForm}
          toggleCopyForm={this.toggleCopyForm}
        />
      </div>
    );
  }
}

export default MovieDetail;
