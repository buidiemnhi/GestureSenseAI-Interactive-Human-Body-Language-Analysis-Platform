import './hero.css';

import React from 'react';

import Navbar from '../../../utils/Navbar/Navbar';

function HeroSection() {
  return (
    <div className='container-fluid p-0 Chieght'>

        <video autoPlay muted loop className='backgroundvid' src={process.env.PUBLIC_URL + '/videos/bg3.mp4'} type="video/mp4"/>
        
        <div className='content'>
            <Navbar darkMode={false}/>
              <div className='row justify-content-start align-self-end w-100 ml-5 mb-5'>
                  <div className="col-md-5 p-0 fontcolor">
                      <h1>Uncover the secret dialect of the human form.</h1>
                      <a className='blackbg btn px-4 py-2 white growbig' href="#liveDemo"  >Watch demo</a>
                  </div>
              </div>
        </div>
    </div>
  )
}

export default HeroSection