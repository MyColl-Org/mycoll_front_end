import React from 'react';
import { Link } from 'react-router-dom';


class Nav extends React.Component {
  render() {
    return (
      <Link to='/movies'>Movies</Link>
    )
  }
}

export default Nav;
