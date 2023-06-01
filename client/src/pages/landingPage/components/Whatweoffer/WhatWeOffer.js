import './whatweoffer.css';

import React from 'react';

function WhatWeOffer() {
  return (
    <div className='container p-0'>

        <div className='row w-100 m-0 justify-content-center mt-5'>

            <div className='col-sm-5 my-5 mx-4 '>
                <img src={process.env.PUBLIC_URL + '/imgs/ai.jpg'} className="img-fluid hieght550 "/>
            </div>

            <div className='col-sm-5 my-5 mx-4 d-flex align-items-center'>
                <div className='conatiner p-0'>
                    <h1 className=''><span className='bolder'>What we</span> <span className='bold'>OFFER</span></h1>
                    <div>
                    <p className='font20'>
                        <span className='bold'>Precision and Accuracy: </span>
                        Our AI system is designed to detect human bodies with high precision and accuracy, reducing false positives and negatives. 
                        It can identify and track multiple individuals in crowded scenes, distinguishing between different body postures and movements.
                        </p>
                    </div>

                    <div>
                    <p className='font20'>
                        <span className='bold'>Scalability: </span>
                        Our AI system is scalable and can be deployed across various platforms and devices. It can handle large volumes of data and perform consistently under different conditions.                        </p>
                    </div>

                    <div>
                    <p className='font20'>
                        <span className='bold'>Precision and Accuracy: </span>
                        Our AI system is designed to detect human bodies with high precision and accuracy, reducing false positives and negatives. 
                        It can identify and track multiple individuals in crowded scenes, distinguishing between different body postures and movements.
                        </p>
                    </div>

                    <a className='btn blackbg white px-5 py-2' href='http://localhost:3000/signin'>Get started now</a>
                </div>

            </div>

        </div>
    </div>
  )
}

export default WhatWeOffer