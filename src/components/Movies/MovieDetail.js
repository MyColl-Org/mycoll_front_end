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

  toggleUpdateForm() {
    let newState = this.state.renderUpdateForm ? false : true;
    this.setState({
      renderUpdateForm: newState
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
    let movieTitle;

    if (this.props.movie) {
      // Pre-assemble text content for clarity
      movieTitle = `${this.props.movie.title} (${this.props.movie.release_year})`;
    }
    
    return (<>
      {/* Movie Info OR <Redirect> */}
      { this.props.movie ?

        <div className="movie-detail">
          {/* Movie Details OR Movie Update Form */}
          { this.state.renderUpdateForm ?

            <>
              <MovieUpdateForm 
                movie={this.props.movie}
                accessToken={this.props.accessToken}
                onSuccess={this.props.onUpdateSuccess}
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
        </div> :

        <Redirect to='/movies' />
      }
    </>);
  }
}

export default MovieDetail;
