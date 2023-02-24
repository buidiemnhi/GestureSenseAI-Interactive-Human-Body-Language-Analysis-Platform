import './livedemo.css';

import React from 'react';

function LiveDemo() {
  return (
    <div className='container p-0'>

        <div className='mt-5 mb-3'>
            <h1 className='pl-3'><span className='bold'>Live</span> demo</h1>
        </div>

        <div className='row w-100 m-0 justify-content-center'>
          <div  className="col-md-10">
            <video src={process.env.PUBLIC_URL + '/videos/bg.mp4'} className="object-fit-contain w-100 " autoPlay loop controls />
          </div>
        </div>
    </div>
  )
}

export default LiveDemo