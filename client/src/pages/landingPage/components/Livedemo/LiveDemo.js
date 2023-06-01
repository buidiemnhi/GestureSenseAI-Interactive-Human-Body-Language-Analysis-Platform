import './livedemo.css';

import React from 'react';

function LiveDemo() {
  return (
    <div className='container mb-5' id='liveDemo'>

        <div className='mt-5 mb-5'>
            <h1 className=''><span className='bolder'>Live</span> <span className='bold'>DEMO</span></h1>
        </div>

        <div className='row w-100 m-0 justify-content-center'>
          <div  className="col-md-10">
            <video src={process.env.PUBLIC_URL + '/videos/bg.mp4'} className="object-fit-contain w-100 " autoPlay loop controls />
          </div>
        </div>
    </div >
  )
}

export default LiveDemo