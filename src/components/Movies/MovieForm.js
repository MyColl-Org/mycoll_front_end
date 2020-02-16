import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


class MovieForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: '',
      releaseYear: '',
      mpaaRating: '',
      runtimeMinutes: '',
      imageLink: '',
      formSubmitted: false,
      id: 0,
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.createMovie = this.createMovie.bind(this);
  }

  async createMovie(event) {
    event.preventDefault();

    const URL = "http://127.0.0.1:8000/api/v1/movies/";
    let formData = {
      title: this.state.title,
      release_year: this.state.releaseYear,
      mpaa_rating: this.state.mpaaRating,
      runtime_minutes: this.state.runtimeMinutes,
      image_link: this.state.imageLink
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

    } catch(error) {
      console.log("Error while trying to POST new movie.");
      console.error(error);
    }

  }

  changeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (<>
      { this.state.formSubmitted ? 

        <Redirect to={`/movies/${this.state.id}`} /> :

        <form onSubmit={this.createMovie}>
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
            type="submit"
            value="Add Movie"
          />
        </form>

      }
    </>);
  }
}

export default MovieForm;
