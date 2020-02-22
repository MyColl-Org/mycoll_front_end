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
      runtimeMinutes: '',
      imageLink: '',
      tmdbPageLink: '',
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.updateMovie = this.updateMovie.bind(this);
  }

  componentDidMount() {
    this.setState({
      id: this.props.movie.id,
      title: this.props.movie.title,
      releaseYear: this.props.movie.release_year,
      mpaaRating: this.props.movie.mpaa_rating,
      runtimeMinutes: this.props.movie.runtime_minutes,
      imageLink: this.props.movie.image_link,
      tmdbPageLink: this.props.movie.tmdb_page_link,
    });
  }

  async updateMovie(event) {
    event.preventDefault();

    const URL = `http://127.0.0.1:8000/api/v1/movies/${this.state.id}`;
    let formData = {
      title: this.state.title,
      release_year: this.state.releaseYear,
      mpaa_rating: this.state.mpaaRating,
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
      this.props.onSuccess(response.data);
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
      <form onSubmit={this.updateMovie}>
        <input
          name="title"
          type="text"
          value={this.state.title}
          placeholder='Title'
          onChange={this.changeHandler}
        />
        <input
          name="releaseYear"
          type="text"
          value={this.state.releaseYear}
          placeholder='Release Year'
          onChange={this.changeHandler}
        />
        <input
          name="mpaaRating"
          type="text"
          value={this.state.mpaaRating}
          placeholder='MPAA Rating'
          onChange={this.changeHandler}
        />
        <input
          name="runtimeMinutes"
          type="text"
          value={this.state.runtimeMinutes}
          placeholder='Runtime (mins)'
          onChange={this.changeHandler}
        />
        <input
          name="imageLink"
          type="text"
          value={this.state.imageLink}
          placeholder='Image Link'
          onChange={this.changeHandler}
        />
        <input
          name="tmdbPageLink"
          type="text"
          value={this.state.tmdbPageLink}
          placeholder='TMDb Page Link'
          onChange={this.changeHandler}
        />
        <input
          type="submit"
          value="Update Movie"
        />
      </form>
    </>);
  }
}

export default MovieForm;
