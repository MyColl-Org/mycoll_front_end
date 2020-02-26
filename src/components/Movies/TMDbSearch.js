import React from 'react';
import axios from 'axios';

import defaultImage from './img/default_movie_cover.png';


class TMDbSearch extends React.Component {
  constructor(props) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
    this.requestResults = this.requestResults.bind(this);
  }

  async onSelect(event) {
    // Requests details from TMDb when a movie is selected from search results
    // Updates <MovieCreation> state to populate <MovieForm>
    const movie_id = event.target.value;
    const URL = `http://127.0.0.1:8000/api/v1/movies/search/details?query=${movie_id}`;

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`
      }
    };
    
    try {
      const response = await axios.get(URL, axiosConfig);
      this.props.updateForm(response.data);
    } 
    catch(error) {
      console.log("Error while trying to request details from TMDb.");
      console.error(error);
    }
  }

  async requestResults(event) {
    // Requests search results from TMDb and updates <MovieCreation> state to render results
    event.preventDefault();

    const URL = `http://127.0.0.1:8000/api/v1/movies/search?query=${this.props.query}`;
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`
      }
    };
    
    try {
      const response = await axios.get(URL, axiosConfig);
      this.props.updateResults(response.data);
    } 
    catch(error) {
      console.log("Error while trying to search TMDb.");
      console.error(error);
    }
  }

  render() {
    return (
      <div className="tmdb-search">
        <h2>Search Form</h2>
        <form onSubmit={this.requestResults} className="tmdb-search-form">
          <input
            name="query"
            type="text"
            value={this.props.query}
            placeholder='Movie Title'
            onChange={this.props.changeHandler}
          />
          <button type="submit">Submit</button>
        </form>
        {/* Render search results if present in state */}
        { this.props.results ?
          <ul className="tmdb-search-results">
            {this.props.results.map( movie => 
              <TMDbItem 
                movie={movie} 
                key={movie.id} 
                onSelect={this.onSelect} 
              />
            )}
          </ul> :
          false
        }
      </div>
    );
  }
}


class TMDbItem extends React.Component {
  render() {
    const tmdbLink = `https://www.themoviedb.org/movie/${this.props.movie.id}`
    const movieTitle = `${this.props.movie.title} (${this.props.movie.release_year})`
    return (
      <li className="tmdb-item">
        <img 
          src={
            this.props.movie.poster_path ?
            this.props.movie.poster_path :
            defaultImage
          }
          alt={this.props.movie.title}
          title={this.props.movie.overview}
        /> 
        <p>{ movieTitle }</p>
        <a href={tmdbLink} target="_blank" rel="noopener noreferrer">TMDb Page</a>
        <button value={this.props.movie.id} onClick={this.props.onSelect}>Select</button>
      </li>
    );
  }
}

export default TMDbSearch;
