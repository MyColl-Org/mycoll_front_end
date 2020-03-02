import React from 'react';
import axios from 'axios';


class MovieCopies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      renderCopyEdit: false,
      renderCopyForm: false,
      renderEditOptions: false,
    };

    this.addMovieCopy = this.addMovieCopy.bind(this);
    this.generateEditButton = this.generateEditButton.bind(this);
    this.toggleCopyForm = this.toggleCopyForm.bind(this);
    this.toggleEditOptions = this.toggleEditOptions.bind(this);
  }

  addMovieCopy(newCopy) {
    // Extends addMovieCopy() from <Movies>
    // Hides <CopyForm> and updates state in <Movies> with the new MovieCopy
    this.toggleCopyForm();
    this.props.addMovieCopy(newCopy);
  }

  generateEditButton() {
    if (this.state.renderCopyForm || !this.props.movie.copies || this.props.movie.copies.length === 0) {
      return false
    }
    const buttonText = this.state.renderEditOptions ? "Done Editing" : "Edit Copies";
    return <button onClick={this.toggleEditOptions}>{ buttonText }</button>
  }

  toggleCopyForm() {
    // Toggle the form for creating copies of movies
    const newState = this.state.renderCopyForm ? false : true;
    this.setState({ renderCopyForm: newState });
  }

  toggleEditOptions() {
    // Toggles edit options buttons in list of MovieCopies
    const newState = this.state.renderEditOptions ? false : true;
    this.setState({ renderEditOptions: newState})
  }

  render() {
    return (
      <div className="copies">
        {/* Copies List */}
        { this.props.movie.copies.length > 0 ?
          <>
            <h3>Copies:</h3>
            <ul className="copies-list">
              { this.props.movie.copies.map( copy => (
                  <MovieCopyItem
                    accessToken={this.props.accessToken} 
                    key={copy.id.toString()} 
                    copy={copy}
                    copyID={copy.id}
                    movieID={this.props.movie.id}
                    removeMovieCopy={this.props.removeMovieCopy}
                    renderOptions={this.state.renderEditOptions} 
                  />
                )) 
              }
            </ul>
          </> :
          false
        }
        {/* New Copy Form */}
        { this.state.renderCopyForm ?
          <MovieCopyForm 
            movieID={this.props.movie.id} 
            accessToken={this.props.accessToken}
            addMovieCopy={this.addMovieCopy}
          /> :
          <>
            { this.generateEditButton() }
            <button onClick={this.toggleCopyForm}>Add Copy</button>
          </>
        }
      </div>      
    );
  }
}


class MovieCopyItem extends React.Component {
  constructor(props) {
    super(props);
    this.deleteMovieCopy = this.deleteMovieCopy.bind(this);
    this.removeMovieCopy = this.removeMovieCopy.bind(this);
  }

  removeMovieCopy() {
    this.props.removeMovieCopy({movieID: this.props.movieID, copyID: this.props.copyID});
  }

  async deleteMovieCopy() {
    // Makes DELETE request to DB to remove MovieCopy instnace
    // Updates state in <Movies> through removeMovieCopy() chain
    const URL = `http://104.248.238.221:8000/api/v1/movies/copies/${this.props.copyID}`;
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`
      }
    };
    let response;
    try {
      response = await axios.delete(URL, axiosConfig);
    } catch(error) {
      console.error(error);
    }
    response.status === 204 ? 
      this.removeMovieCopy() : 
      console.error('Error deleting movie copy.');
  }

  render() {
    const copyText = `${this.props.copy.form} on ${this.props.copy.platform}`;
    const copyContent = this.props.copy.vod_link ?
      <a href={this.props.copy.vod_link} target="_blank" rel="noopener noreferrer">
        { copyText }
      </a> :
      `${ copyText }`;
    const editOptions = this.props.renderOptions ? 
      <button onClick={this.deleteMovieCopy}>DELETE</button> : 
      false;

    return (
      <li className="movie-copy-item">
        { copyContent }
        { editOptions }
      </li>
    );
  }
}


class MovieCopyForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: 0,
      platform: '',
      form: '',
      vodLink: '',
    }

    this.changeHandler = this.changeHandler.bind(this);
    this.putMovieCopy = this.putMovieCopy.bind(this);
  }

  componentDidMount() {
    // Populate state with ID of current movie
    this.setState({ movie: this.props.movieID });
  }

  async putMovieCopy(event) {
    // Makes POST request to DB to add new MovieCopy then updates state in <Movies>
    event.preventDefault();

    const URL = "http://104.248.238.221:8000/api/v1/movies/copies/"
    const formData = {
      movie: this.state.movie,
      platform: this.state.platform,
      form: this.state.form,
      vod_link: this.state.vodLink
    };
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`
      }
    };

    try {
      const response = await axios.post(URL, formData, axiosConfig);
      this.props.addMovieCopy(response.data);
    } catch(error) {
      console.error(error);
    }
  }

  changeHandler(event) {
    // Handles updates of state and inputs fields for <MovieCopyForm>
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.putMovieCopy} className="movie-copy-form">
        <input 
          name="platform" 
          type="text"
          value={this.state.platform}
          placeholder='Platform'
          onChange={this.changeHandler}
        />
        <input 
          name="form" 
          type="text"
          value={this.state.form}
          placeholder='Format'
          onChange={this.changeHandler}
        />
        <input 
          name="vodLink" 
          type="text"
          value={this.state.vodLink}
          placeholder='VOD Link (optional)'
          onChange={this.changeHandler}
        />
        <input
          type="submit"
          value="Add Copy"
        />
      </form>
    )
  }
}

export default MovieCopies;
