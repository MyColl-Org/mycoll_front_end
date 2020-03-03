import React from 'react';
import { Link } from 'react-router-dom';

import './Nav.scss';


class Nav extends React.Component {
  render() {
    return (
      <nav>
        <ul>
          <li className="mycoll-link">MyColl</li>
          <li><Link to='/movies'>Movies</Link></li>
          <li><Link to='/shows'>TV Shows</Link></li>
          <li><Link to='/books'>Books</Link></li>
        </ul>
      </nav>
    )
  }
}

export default Nav;
