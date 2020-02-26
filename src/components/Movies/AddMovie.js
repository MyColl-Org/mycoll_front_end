import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import TMDbSearch from './TMDbSearch';


class AddMovie extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      formSubmitted: false,
      movieID: 0,
      imageLink: '',
      mpaaRating: '',
      overview: '',
      query: '',
      releaseYear: '',
      renderForm: false,
      results: [],
      runtimeMinutes: '',
      title: '',
      tmdbPageLink: '',
    };

    this.addMovie = this.addMovie.bind(this);
    this.buttonText = this.buttonText.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.updateResults = this.updateResults.bind(this);
  }

  addMovie(newMovie, movieID) {
    // Extends addMovie() from <Movies>
    this.props.addMovie(newMovie);
    this.setState({ formSubmitted: true, id: movieID });
  }

  buttonText() {
    // Toggles text within <button> depending on whether for is currently rendered
    return this.state.renderForm ? "Hide Form" : "Manual Entry"
  }
  
  changeHandler(event) {
    // Handles updating of state and form fields upon user input
    this.setState({ [event.target.name]: event.target.value });
  }

  toggleForm() {
    // Toggles whether manual entry form should be rendered
    let newState = true;
    if (this.state.renderForm) newState = false;
    this.setState({
      renderForm: newState,
    });
  }

  updateForm(movie) {
    // Updates the form fields when a movie is selected from TMDb results
    this.setState({
      title: movie.title,
      releaseYear: movie.release_year,
      mpaaRating: movie.mpaa_rating,
      overview: movie.overview,
      runtimeMinutes: movie.runtime_minutes,
      imageLink: movie.image_link,
      tmdbPageLink: movie.tmdb_page_link,
      renderForm: true,
      results: [],
    });
  }

  updateResults(results) {
    // Updates results in state with data returned from <TMDbSearch>
    this.setState({
      results: [...results],
      renderForm: false,
    })
  }

  render() {
    return (<div className="movie-creation">
      {/* Redirect once a movie has been submitted */}
      { this.state.formSubmitted ? 
        <Redirect to={`/movies/detail/${this.state.movieID}`} /> :
        false
      }
      {/* Initial content */}
      <h1>Movie Creation Page</h1>
      <TMDbSearch
        accessToken={this.props.accessToken}
        changeHandler={this.changeHandler} 
        updateForm={this.updateForm}
        query={this.state.query}
        results={this.state.results}
        updateResults={this.updateResults}
      />
      <button onClick={this.toggleForm}>{this.buttonText()}</button>
      
      {/* Render Manual Entry Form */}
      { this.state.renderForm ?
        <MovieForm 
          accessToken={this.props.accessToken}
          addMovie={this.addMovie}
          changeHandler={this.changeHandler}
          fields={this.state}
        /> :
        false
      }
    </div>);
  }
}


class MovieForm extends React.Component {
  constructor(props) {
    super(props);
    this.putMovie = this.putMovie.bind(this);
  }

  async putMovie(event) {
    // POSTS movie to DB and updated state in <Movies> on success
    event.preventDefault();
    
    const URL = "http://127.0.0.1:8000/api/v1/movies/";
    let formData = {
      title: this.props.fields.title,
      release_year: this.props.fields.releaseYear,
      mpaa_rating: this.props.fields.mpaaRating,
      overview: this.props.fields.overview,
      runtime_minutes: this.props.fields.runtimeMinutes,
      image_link: this.props.fields.imageLink,
      tmdb_page_link: this.props.fields.tmdbPageLink,
    };
    let axiosConfig = {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`
      }
    };
    
    try {
      const response = await axios.post(URL, formData, axiosConfig);
      const movieID = response.data.id.toString();
      this.props.addMovie(response.data, movieID);
    } 
    catch(error) {
      console.log("Error while trying to POST new movie.");
      console.error(error);
    }
  }

  render() {
    return (
      <div className="movie-form">
        <img 
          src={this.props.fields.imageLink} 
          alt={this.props.fields.title}
        />
        <form onSubmit={this.putMovie}>
          <label>
            Title
            <input 
              name="title" 
              type="text"
              value={this.props.fields.title}
              placeholder="Title"
              onChange={this.props.changeHandler}
            />
          </label>
          <label>
            Release Year
            <input 
              name="releaseYear" 
              type="text"
              value={this.props.fields.releaseYear}
              placeholder="Release Year"
              onChange={this.props.changeHandler}
            />
          </label>
          <label>
            MPAA Rating
            <input 
              name="mpaaRating" 
              type="text"
              value={this.props.fields.mpaaRating}
              placeholder="MPAA Rating"
              onChange={this.props.changeHandler}
            />
          </label>
          <label>
            Overview
            <textarea 
              name="overview" 
              type="text"
              value={this.props.fields.overview}
              placeholder="Overview"
              onChange={this.props.changeHandler}
            />
          </label>
          <label>
            Runtime (mins)
            <input 
              name="runtimeMinutes" 
              type="text"
              value={this.props.fields.runtimeMinutes}
              placeholder="Runtime (mins)"
              onChange={this.props.changeHandler}
            />
          </label>
          <label>
            Image Link
            <input 
              name="imageLink" 
              type="text"
              value={this.props.fields.imageLink}
              placeholder="Image Link (optional)"
              onChange={this.props.changeHandler}
            />
          </label>
          <label>
            TMDb Page Link
            <input 
              name="tmdbPageLink" 
              type="text"
              value={this.props.fields.tmdbPageLink}
              placeholder="TMDB Page Link (optional)"
              onChange={this.props.changeHandler}
            />
          </label>
          <input
            type="submit"
            value="Add Movie"
          />
        </form>
      </div>
    );
  }
}

export default AddMovie;