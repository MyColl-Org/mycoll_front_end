import React from 'react';
import axios from 'axios';


class MovieCopies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      renderEditOptions: false,
    };

    this.toggleEditOptions = this.toggleEditOptions.bind(this);
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
                    key={copy.id.toString()} 
                    copy={copy}
                    copyDeleted={this.props.copyDeleted}
                    copyID={copy.id}
                    movieID={this.props.movie.id}
                    renderOptions={this.state.renderEditOptions} 
                  />
                )) 
              }
            </ul>
          </> :
          false
        }
        {/* New Copy Form */}
        { this.props.renderCopyForm ?
          <MovieCopyForm 
            movieID={this.props.movie.id} 
            accessToken={this.props.accessToken}
            onSuccess={this.props.copyCreated}
          /> :
          <>
            <button onClick={this.toggleEditOptions}>
              { this.state.renderEditOptions ? 
                "Done Editing" :
                "Edit Copies"
              }
            </button>
            <button onClick={this.props.toggleCopyForm}>Add Copy</button>
          </>
        }
      </div>      
    );
  }
}


class MovieCopyItem extends React.Component {
  constructor(props) {
    super(props);
    this.deleteCopy = this.deleteCopy.bind(this);
  }

  deleteCopy() {
    this.props.copyDeleted({movieID: this.props.movieID, copyID: this.props.copyID});
  }

  render() {
    const copyText = `${this.props.copy.form} on ${this.props.copy.platform}`;
    const copyContent = this.props.copy.vod_link ?
      <a href={this.props.copy.vod_link} target="_blank" rel="noopener noreferrer">
        { copyText }
      </a> :
      `${ copyText }`;
    const editOptions = this.props.renderOptions ? 
      <button onClick={this.deleteCopy}>DELETE</button> : 
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
    this.createCopy = this.createCopy.bind(this);
  }

  componentDidMount() {
    // Populate state with ID of current movie
    this.setState({ movie: this.props.movieID });
  }

  async createCopy(event) {
    // Makes POST request to DB to add new MovieCopy then updates state in <Movies>
    event.preventDefault();

    const URL = "http://127.0.0.1:8000/api/v1/movies/copies/"
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
      this.props.onSuccess(response.data);
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
      <form onSubmit={this.createCopy} className="movie-copy-form">
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
