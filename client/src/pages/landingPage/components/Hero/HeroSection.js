import './hero.css';

import React from 'react';

function HeroSection() {
  return (
    <div className='container-fluid p-0 Chieght'>
        <video autoPlay muted loop className='backgroundvid' src={process.env.PUBLIC_URL + '/videos/bg.mp4'} type="video/mp4"/>
        <div className='content'>
            <div className='row justify-content-center w-100'>
                <div className="col-md-8 text-center p-0">
                    <p className="font18 white">
                        a unique and insightful experience into the world of body language.
                        Based on Joe Navarro's book "What Every Body is Saying", our platform uses advanced technology to extract the landmarks of the human body and decode their meaning.
                        Whether you're a student, a professional, or just curious, our website provides an in-depth analysis of body language, allowing you to understand and interpret nonverbal cues like never before.
                        From gestures and postures to facial expressions and eye movements, we've got you covered.
                        With our easy-to-use interface, you can quickly and accurately analyze any situation, giving you a deeper understanding of the people and world around you.
                        Join us today and start discovering the hidden language of the body
                    </p>
                    <a className='btn px-4 py-3 shadow white'>Get started now</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeroSection