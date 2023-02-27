import './Footer.css';

import React from 'react';

function Footer() {
  return (
    <div className='container-fluid p-0'>
        <div className="footer-basic blackbg">
        <footer>
            <div className="social"><a href="#"><i class="icon ion-social-instagram"></i></a><a href="#"><i className="icon ion-social-snapchat"></i></a><a href="#"><i className="icon ion-social-twitter"></i></a><a href="#"><i className="icon ion-social-facebook"></i></a></div>
            <ul className="list-inline">
                <li className="list-inline-item"><a href="#">Home</a></li>
                <li className="list-inline-item"><a href="#">Services</a></li>
                <li className="list-inline-item"><a href="#">About</a></li>
                <li className="list-inline-item"><a href="#">Terms</a></li>
                <li className="list-inline-item"><a href="#">Privacy Policy</a></li>
            </ul>
            <p className="copyright">GTKY © 2022</p>
        </footer>
    </div>
    </div>
  )
}

export default Footer