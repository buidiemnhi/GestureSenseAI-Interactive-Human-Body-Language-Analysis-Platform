import './navbar.css';

import React from 'react';

function Navbar() {
  return (
    <nav class="navbar sticky-top navbar-expand-md">

    <a class="navbar-brand font24 fontcolor ml-5" href="#">
      Bootstrap
    </a>

    <div class="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
      <div class="navbar-nav">

        <ul class="nav nav-pills ">
            <li class="nav-item m-3">
                <a class="nav-link font24 fontcolor px-3 shadow"  aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item m-3">
                <a class="nav-link font24 fontcolor px-3" href="#">About</a>
            </li>
            <li class="nav-item m-3">
                <a class="nav-link font24 fontcolor px-3" href="#">Features</a>
            </li>
            <li class="nav-item m-3">
                <a class="nav-link font24 fontcolor px-3"  href="#">Sign in</a>
            </li>
        </ul>
        
      </div>

    </div>

</nav>
  )
}

export default Navbar