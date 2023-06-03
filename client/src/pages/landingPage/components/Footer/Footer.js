import './Footer.css';

import React from 'react';

function Footer() {
  return (
    <div className='container-fluid p-0'>
        <div className="footer-basic blackbackground">
        <footer>
            <ul className="list-inline">
                <li className="list-inline-item"><a href="#">Home</a></li>
                <li className="list-inline-item"><a href="#WhatWeOffer">About</a></li>
                <li className="list-inline-item"><a href="#liveDemo">Features</a></li>
                <li className="list-inline-item"><a href="http://localhost:3000/signin">Sign in</a></li>
                <li className="list-inline-item"><a href="http://localhost:3000/signup">Sign Up</a></li>
            </ul>
            <p className="copyright"> GestureSense © 2023</p>
        </footer>
    </div>
    </div>
  )
}

export default Footer