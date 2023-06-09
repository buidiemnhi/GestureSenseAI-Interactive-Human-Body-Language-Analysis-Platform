import './Footer.css';

import React from 'react';

function Footer() {
  return (
    <div className='container-fluid p-0'>
        <div className="footer-basic blackbackground">
        <footer>
            <ul className="list-inline">
                <li className="list-inline-item"><a href="/">Home</a></li>
                <li className="list-inline-item"><a href="http://localhost:3000/signin">Login</a></li>
                <li className="list-inline-item"><a href="http://localhost:3000/signup">Sign Up</a></li>
                <li className="list-inline-item"><a href="http://localhost:3000/Profilepage">Personal Page</a></li>
            </ul>
            <p className="copyright"> <a className='no-color' href="/"> GestureSense © 2023
              </a> </p>
        </footer>
    </div>
    </div>
  )
}

export default Footer