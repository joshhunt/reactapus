import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Reactapus</a>

          <ul className="nav navbar-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shows">Shows</Link></li>
          </ul>

        </div>
      </nav>
    );
  }
}
