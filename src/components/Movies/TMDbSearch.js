import React from 'react';
import axios from 'axios';



class TMDbSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      results: [],
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.requestResults = this.requestResults.bind(this);
  }

  changeHandler(event) {
    // Handles updating of state and form fields upon user input
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async requestResults(event) {
    event.preventDefault();

    const URL = `http://127.0.0.1:8000/api/v1/movies/search?query=${this.state.query}`;

    let axiosConfig = {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`
      }
    };
    
    try {
      const response = await axios.get(URL, axiosConfig);
      // TODO: Choose something to happen on sucessful 
      this.setState({
        results: [...response.data],
      });
      console.log(response.data);
      // this.props.onSuccess(response.data);
    } 
    catch(error) {
      console.log("Error while trying to search TMDb.");
      console.error(error);
    }

  }

  render() {
    return (<>
      <h2>Search Form</h2>
      {/* TODO: Add an onSubmit to this form */}
      <form onSubmit={this.requestResults}>
        <input
          name="query"
          type="text"
          value={this.state.query}
          placeholder='Movie Title'
          onChange={this.changeHandler}
        />
        <button type="submit">Submit</button>
      </form>

      {/* Render search results if present in state */}
      { this.state.results ?
        this.state.results.map( movie => <TMDbItem movie={movie}/>) :
        false
      }
    </>)
  }
}


const TMDbItem = (props) => {
  const tmdbLink = `https://www.themoviedb.org/movie/${props.movie.id}`
  const movieTitle = `${props.movie.title} (${props.movie.release_year})`
  return (
    <li className="tmdb-item">
      { props.movie.poster_path ?
        <img 
          src={props.movie.poster_path}
          title={props.movie.overview}
        /> :
        <p>No Image</p>
      }
      <p>{ movieTitle }</p>
      <a href={tmdbLink} target="_blank" rel="noopener noreferrer">TMDb Page</a>
    </li>
  );
}


export default TMDbSearch;
