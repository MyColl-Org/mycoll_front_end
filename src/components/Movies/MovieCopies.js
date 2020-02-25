import React from 'react';
import axios from 'axios';


class MovieCopies extends React.Component {
  render() {
    return (
      <div className="copies">
        {/* Copies List */}
        { this.props.movie.copies.length > 0 ?
          <>
            <h3>Copies:</h3>
            <ul className="copies-list">
              { this.props.movie.copies.map( copy => (
                  <MovieCopyItem key={copy.id.toString()} copy={copy} />)
                ) 
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
            <button >Edit Copies</button>
            <button onClick={this.props.toggleCopyForm}>Add Copy</button>
          </>
        }
      </div>      
    );
  }
}


class MovieCopyItem extends React.Component {
  render() {
    const copyText = `${this.props.copy.form} on ${this.props.copy.platform}`;

    return (<>
      { this.props.copy.vod_link ?

        <li>
          <a href={this.props.copy.vod_link} target="_blank" rel="noopener noreferrer">
            { copyText }
          </a>
        </li> :
        
        <li>{ copyText }</li>
      }
    </>);
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
    this.setState({
      movie: this.props.movieID,
    });
  }

  async createCopy(event) {
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
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (<>
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
    </>)
  }
}

export default MovieCopies;
