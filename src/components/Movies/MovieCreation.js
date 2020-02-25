import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import TMDbSearch from './TMDbSearch';


class MovieCreation extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      formSubmitted: false,
      id: 0,
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

    this.buttonText = this.buttonText.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.createMovie = this.createMovie.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.updateResults = this.updateResults.bind(this);
  }

  buttonText() {
    // Toggles text within <button> depending on whether for is currently rendered
    return this.state.renderForm ? "Hide Form" : "Manual Entry"
  }
  
  changeHandler(event) {
    // Handles updating of state and form fields upon user input
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async createMovie(event) {
    // POSTS movie to DB and updated state in <Movies> on success
    event.preventDefault();
    
    const URL = "http://127.0.0.1:8000/api/v1/movies/";
    let formData = {
      title: this.state.title,
      release_year: this.state.releaseYear,
      mpaa_rating: this.state.mpaaRating,
      overview: this.state.overview,
      runtime_minutes: this.state.runtimeMinutes,
      image_link: this.state.imageLink,
      tmdb_page_link: this.state.tmdbPageLink,
    };
    let axiosConfig = {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`
      }
    };
    
    try {
      const response = await axios.post(URL, formData, axiosConfig);
      const id = response.data.id.toString();
      this.props.onSuccess(response.data);
      
      this.setState({
        id: id,
        formSubmitted: true,
      });
    } 
    catch(error) {
      console.log("Error while trying to POST new movie.");
      console.error(error);
    }
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
        <Redirect to={`/movies/detail/${this.state.id}`} /> :
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
          changeHandler={this.changeHandler}
          onSubmit={this.createMovie}
          fields={this.state}
        /> :
        false
      }
    </div>);
  }
}


class MovieForm extends React.Component {
  render() {
    return (
      <div className="movie-form">
        <img 
          src={this.props.fields.imageLink} 
          alt={this.props.fields.title}
        />
        <form onSubmit={this.props.onSubmit}>
          <input 
            name="title" 
            type="text"
            value={this.props.fields.title}
            placeholder="Title"
            onChange={this.props.changeHandler}
          />
          <input 
            name="releaseYear" 
            type="text"
            value={this.props.fields.releaseYear}
            placeholder="Release Year"
            onChange={this.props.changeHandler}
          />
          <input 
            name="mpaaRating" 
            type="text"
            value={this.props.fields.mpaaRating}
            placeholder="MPAA Rating"
            onChange={this.props.changeHandler}
          />
          <textarea 
            name="overview" 
            type="text"
            value={this.props.fields.overview}
            placeholder="Overview"
            onChange={this.props.changeHandler}
          />
          <input 
            name="runtimeMinutes" 
            type="text"
            value={this.props.fields.runtimeMinutes}
            placeholder="Runtime (mins)"
            onChange={this.props.changeHandler}
          />
          <input 
            name="imageLink" 
            type="text"
            value={this.props.fields.imageLink}
            placeholder="Image Link (optional)"
            onChange={this.props.changeHandler}
          />
          <input 
            name="tmdbPageLink" 
            type="text"
            value={this.props.fields.tmdbPageLink}
            placeholder="TMDB Page Link (optional)"
            onChange={this.props.changeHandler}
          />
          <input
            type="submit"
            value="Add Movie"
          />
        </form>
      </div>
    );
  }
}

export default MovieCreation;
