import React from 'react';
import { Link } from 'react-router-dom';

import './Nav.scss';


class Nav extends React.Component {
  render() {
    return (
      <nav>
        <ul>
          <li><Link to='/' className="mycoll-link">MyColl</Link></li>
          <li><Link to='/movies'>Movies</Link></li>
          <li><Link to=''>TV Shows</Link></li>
          <li><Link to=''>Books</Link></li>
        </ul>
      </nav>
    )
  }
}

export default Nav;
