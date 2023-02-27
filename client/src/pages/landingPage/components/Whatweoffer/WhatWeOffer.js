import './whatweoffer.css';

import React from 'react';

function WhatWeOffer() {
  return (
    <div className='container p-0'>

        <div className='row w-100 m-0 justify-content-center'>

            <div className='col-sm-5 my-5 mx-4 '>
                <img src={process.env.PUBLIC_URL + '/imgs/ai.jpg'} className="img-fluid hieght550 "/>
            </div>

            <div className='col-sm-5 my-5 mx-4 d-flex align-items-center'>
                <div className='conatiner p-0'>
                    <h1 className=''><span className='bolder'>What we</span> <span className='bold'>offer</span></h1>
                    <p className='font20'>
                        is a non verbal action detection and analysis based on the context of the situation provided in a video tape
                        and providing back the nonverbal actions detected and what are the meaning behind them as non verbal action can change point of view on a situation and even save lives ,
                        provided by the AI technologies machine learning models which extract the landmarks of your body as shoulder joints, face gesture, hand positioning,etc..
                        .then it's our machine learning model GTKY which takes the landmarks extracted and analyze them to detect the non verbal actions and what they mean based on the context.
                        <span className='bold'>so what are you waiting for?? join us and get to know the language of your body and your non verbal actions meaning.</span>
                    </p>
                    <a className='btn blackbg white px-5 py-3'>Get started now</a>
                </div>

            </div>

        </div>
    </div>
  )
}

export default WhatWeOffer