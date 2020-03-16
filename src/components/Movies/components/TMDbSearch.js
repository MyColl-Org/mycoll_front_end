import React from 'react';
import axios from 'axios';

import './TMDbSearch.scss';
import defaultImage from '../img/default_movie_cover.png';


class TMDbSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previouseQuery: '',
      querySent: false,
    };

    this.generateNoResultsMessage = this.generateNoResultsMessage.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.requestResults = this.requestResults.bind(this);
  }

  generateNoResultsMessage() {
    // Generates message when no results are returned from TMDb
    const noResultsMessage = `No results for ${this.state.previouseQuery}`
    return this.state.querySent ? <p className="no-results">{ noResultsMessage }</p> : false;
  }

  async onSelect(event) {
    // Requests details from TMDb when a movie is selected from search results
    // Updates <MovieCreation> state to populate <MovieForm>
    const movie_id = event.target.value;
    const URL = `https://db.mycoll.app/api/v1/movies/search/details?query=${movie_id}`;

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`
      }
    };
    
    try {
      const response = await axios.get(URL, axiosConfig);
      this.props.updateForm(response.data);
      this.setState({ querySent: false });
    } 
    catch(error) {
      console.log("Error while trying to request details from TMDb.");
      console.error(error);
    }
  }

  async requestResults(event) {
    // Requests search results from TMDb and updates <MovieCreation> state to render results
    event.preventDefault();

    const URL = `https://db.mycoll.app/api/v1/movies/search?query=${this.props.query}`;
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`
      }
    };
    
    try {
      const response = await axios.get(URL, axiosConfig);
      this.props.updateResults(response.data);
      this.setState({ querySent: true, previouseQuery: this.props.query });
    } 
    catch(error) {
      console.log("Error while trying to search TMDb.");
      console.error(error);
    }
  }

  render() {
    return (
      <div className="tmdb-search">
        <div className="search-container">
          <h2>Search The Movie Database</h2>
          <form onSubmit={this.requestResults} className="tmdb-search-form">
            <label htmlFor="query" className="search-query-label">Movie Title:</label>
            <input
              required
              id="query"
              name="query"
              type="text"
              value={this.props.query}
              placeholder='Movie Title'
              onChange={this.props.changeHandler}
            />
            <button>Search</button>
          </form>
        </div>
        {/* Render search results if present in state */}
        { this.props.results.length ?
          <ul className="tmdb-search-results">
            {this.props.results.map( movie => 
              <TMDbItem 
                movie={movie} 
                key={movie.id} 
                onSelect={this.onSelect} 
              />
            )}
          </ul> :
          this.generateNoResultsMessage()
        }
      </div>
    );
  }
}


class TMDbItem extends React.Component {
  constructor(props) {
    super(props);
    this.generateCoverImage = this.generateCoverImage.bind(this);
  }

  generateCoverImage() {
    // Genereates <img> for search result depending on presence of image link
    const imageSource = this.props.movie.poster_path || defaultImage;
    const imageClass = this.props.movie.poster_path ? '' : 'default-movie-image';
    return (
      <div className="result-image-outer">
        <img
          src={imageSource}
          alt={this.props.movie.title}
          title={this.props.movie.title}
          className={imageClass}
        />
      </div>
    );
  }

  render() {
    const tmdbLink = `https://www.themoviedb.org/movie/${this.props.movie.id}`;
    let movieTitle = `${this.props.movie.title}`;
    if (this.props.movie.release_year) movieTitle += ` (${this.props.movie.release_year})`;
    return (
      <li className="tmdb-item">
        { this.generateCoverImage() }
        <div className="item-details-outer">
          <div className="item-details-inner">
            <p>{ movieTitle }</p>
            <div className="tmdb-item-buttons">
              {/* <a href={tmdbLink} target="_blank" rel="noopener noreferrer">TMDb Page</a> */}
              <a href={tmdbLink} target="_blank" rel="noopener noreferrer"><button>TMDb Page</button></a>
              <button value={this.props.movie.id} onClick={this.props.onSelect}>Select</button>
            </div>
          </div>
        </div> 
      </li>
    );
  }
}

export default TMDbSearch;
