import React from 'react';
import { Link } from 'react-router-dom';


class Collections extends React.Component {

  render() {
    return (
      <div className="collections">
        <h3>Welcome to your Collections!</h3>
        <ul>
          <li>    
            <Link to='/movies'>
              <p>Movies</p>
            </Link>
          </li>
          <li>
            <p>Coming Soon: Shows</p>
          </li>
          <li>
            <p>Coming Soon: Books</p>
          </li>
        </ul>
      </div>
    )
  }
}

export default Collections;
