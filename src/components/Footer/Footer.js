import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.scss'

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <Link to="/about">
          ABOUT <span className="mycoll">MyColl</span>
        </Link>
        <p>Skyler Burger | 2020</p>
      </footer>
    )
  }
}

export default Footer;