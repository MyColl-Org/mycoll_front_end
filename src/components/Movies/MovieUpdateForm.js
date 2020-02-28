import React from 'react';
import axios from 'axios';


class MovieForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      title: '',
      releaseYear: '',
      mpaaRating: '',
      overview: '',
      runtimeMinutes: '',
      imageLink: '',
      tmdbPageLink: '',
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.putMovie = this.putMovie.bind(this);
  }

  componentDidMount() {
    this.setState({
      id: this.props.movie.id,
      title: this.props.movie.title,
      releaseYear: this.props.movie.release_year,
      mpaaRating: this.props.movie.mpaa_rating,
      overview: this.props.movie.overview,
      runtimeMinutes: this.props.movie.runtime_minutes,
      imageLink: this.props.movie.image_link,
      tmdbPageLink: this.props.movie.tmdb_page_link,
    });
  }

  async putMovie(event) {
    event.preventDefault();

    const URL = `http://104.248.238.221:8000/api/v1/movies/${this.state.id}`;
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
      const response = await axios.put(URL, formData, axiosConfig);
      this.props.updateMovie(response.data);
      this.props.toggleForm();
    } catch (error) {
      console.error("Error while updating movie:", error);
    }

  }

  changeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (<>
      <form onSubmit={this.putMovie} className="movie-update-form">
        <label>
          Title
          <input
            name="title"
            type="text"
            value={this.state.title}
            placeholder='Title'
            onChange={this.changeHandler}
          />
        </label>
        <label>
          Release Year
          <input
            name="releaseYear"
            type="text"
            value={this.state.releaseYear}
            placeholder='Release Year'
            onChange={this.changeHandler}
          />
        </label>
        <label>
          MPAA Rating
          <input
            name="mpaaRating"
            type="text"
            value={this.state.mpaaRating}
            placeholder='MPAA Rating'
            onChange={this.changeHandler}
          />
        </label>
        <label>
          Overview
          <textarea
            name="overview"
            type="text"
            value={this.state.overview}
            placeholder='Overview'
            onChange={this.changeHandler}
          />
        </label>
        <label>
          Runtime (mins)
          <input
            name="runtimeMinutes"
            type="text"
            value={this.state.runtimeMinutes}
            placeholder='Runtime (mins)'
            onChange={this.changeHandler}
          />
        </label>
        <label>
          Image Link
          <input
            name="imageLink"
            type="text"
            value={this.state.imageLink}
            placeholder='Image Link'
            onChange={this.changeHandler}
          />
        </label>
        <label>
          TMDb Page Link
          <input
            name="tmdbPageLink"
            type="text"
            value={this.state.tmdbPageLink}
            placeholder='TMDb Page Link'
            onChange={this.changeHandler}
          />
        </label>
        <input
          type="submit"
          value="Update Movie"
        />
      </form>
    </>);
  }
}

export default MovieForm;
