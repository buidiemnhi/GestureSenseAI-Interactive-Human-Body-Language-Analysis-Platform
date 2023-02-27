import './navbar.css';

import React from 'react';

import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-md w-100">

    <a className="navbar-brand font30 fontcolor ml-5 nohover" href="#">
      GTKY
    </a>

    <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
      <div className="navbar-nav">

        <ul className="nav nav-pills ">
            <li className="nav-item m-3">
                <Link className='nav-link font24 fontcolor px-3' to="/"> Home</Link>
            </li>
            <li className="nav-item m-3">
                <a className="nav-link font24 fontcolor px-3" href="">About</a>
            </li>
            <li className="nav-item m-3">
                <a className="nav-link font24 fontcolor px-3" href="">Features</a>
            </li>
            <li className="nav-item m-3">
                <Link className="nav-link font24 fontcolor px-3"  to="/signin">Sign in</Link>
            </li>
        </ul>
        
      </div>

    </div>

</nav>
  )
}

export default Navbar