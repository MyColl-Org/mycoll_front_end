import React from 'react';


class MovieForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: '',
      releaseYear: '',
      mpaaRating: '',
      runtimeMinutes: '',
    }

    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (<>
      {/* Add onSubmit function */}
      <form>
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
      </form>
    </>)
  }
}

export default MovieForm;
