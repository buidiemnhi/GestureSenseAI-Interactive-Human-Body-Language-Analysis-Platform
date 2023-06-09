import './navbar.css';

import React from 'react';

import { Link } from 'react-router-dom';

function Navbar({ darkMode = false }) {
  const modeClass = darkMode ? 'bright-mode' : '';

  return (
    <nav className={`navbar navbar-expand-md w-100 ${modeClass}`}>

      <a className={`${modeClass} navbar-brand font30 fontcolor ml-5 nohover growbig`} href="#">
        -GestureSense-
      </a>

      <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
        <div className="navbar-nav">

          <ul className="nav nav-pills">
              <li className={`nav-item m-3 ${modeClass}`}>
                  <Link className={`nav-link font24 fontcolor px-3 ${modeClass} growbig`} to="/"> Home</Link>
              </li>
              <li className={`nav-item m-3 ${modeClass}`}>
                  <a className={`nav-link font24 fontcolor px-3 ${modeClass} growbig`} href="#WhatWeOffer">About</a>
              </li>
              <li className={`nav-item m-3 ${modeClass}`}>
                  <a className={`nav-link font24 fontcolor px-3 ${modeClass} growbig`} href="#liveDemo">Features</a>
              </li>
                {localStorage.getItem('jwt_token') ? 
                  (
                    localStorage.getItem('isAdmin') === "1" ? 
                    (
                    <li className={`nav-item m-3 ${modeClass}`}>
                      <Link className={`nav-link font24 fontcolor px-3 ${modeClass} growbig`} to="/Adminpanel">Admin panal</Link>
                    </li>
                    ) : (
                    <li className={`nav-item m-3 ${modeClass}`}>
                      <Link className={`nav-link font24 fontcolor px-3 ${modeClass} growbig`} to="/profilepage">Profile</Link>
                    </li>
                    )
                    ) : (
                    <li className={`nav-item m-3 ${modeClass}`}>
                      <Link className={`nav-link font24 fontcolor px-3 ${modeClass} growbig`} to="/signin">Sign in</Link>
                   </li>
                  )
                }
            </ul>
          
        </div>

      </div>

    </nav>
  )
}

export default Navbar
