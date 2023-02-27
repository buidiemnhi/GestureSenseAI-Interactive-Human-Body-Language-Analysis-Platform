import './hero.css';

import React from 'react';

import Navbar from '../Navbar/Navbar';

function HeroSection() {
  return (
    <div className='container-fluid p-0 Chieght'>

        <video autoPlay muted loop className='backgroundvid' src={process.env.PUBLIC_URL + '/videos/bg3.mp4'} type="video/mp4"/>
        
        <div className='content'>
            <Navbar/>
              <div className='row justify-content-start align-self-end w-100 ml-5 mb-5'>
                  <div className="col-md-6 p-0 fontcolor">
                      <h1>Discover the hidden language of the body.</h1>
                      <a className='blackbg btn rounded-pill px-4 py-3 white'>Watch demo</a>
                      <a className='mx-4 white font24'>Join us</a>
                  </div>
              </div>
        </div>
    </div>
  )
}

export default HeroSection