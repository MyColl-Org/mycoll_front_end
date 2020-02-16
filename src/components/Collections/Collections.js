import React from 'react';
import { Link } from 'react-router-dom';

class Collections extends React.Component {

  render() {
    return (<>
      <h3>Welcome to your Collections!</h3>
      <Link to='/movies'>
        <p>Movies</p>
      </Link>
      <p>Coming Soon: Shows</p>
      <p>Coming Soon: Books</p>
    </>)
  }
}

export default Collections;