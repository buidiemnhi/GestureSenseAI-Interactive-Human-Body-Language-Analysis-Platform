import './UploadVideos.css';

import React, { useState } from 'react';

import FirstPhase from './components/FirstPhase';
import SecoundPhase from './components/SecoundPhase';
import ThirdPhase from './components/ThirdPhase';

export default function UploadVideos() {
    const [fullInputData, setFullInputData] = useState({
        video: null,
        videoTitle: null,
        videoDescription: null,
        IsShowLandmarksSelected: false
    })
    const [videoUrl, setVideoUrl] = useState(null);
    const [currentView, setCurrentView] = useState(1)

    const SubmitVideoData = async () => {
        setCurrentView(3)
        //Send the data
        let jwtToken = localStorage.getItem('jwt_token');
        var myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${jwtToken}`);
        myHeaders.append('Cookie', `session=.${jwtToken}`);

        const fullInputData2 = new fullInputData();
        fullInputData2.append("video", fullInputData.video);
        fullInputData2.append('videoTitle', fullInputData.videoTitle);
        fullInputData2.append('videoDescription', fullInputData.videoDescription);
        fullInputData2.append('IsShowLandmarksSelected', fullInputData.IsShowLandmarksSelected);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: fullInputData2,
          };

          async function apiSubmit(requestOptions) {
            fetch('http://127.0.0.1:5000//upload-video', requestOptions);
          }
            await apiSubmit(requestOptions);
        

        // console.log(JSON.stringify(fullInputData))
        setFullInputData({
            video: null,
            videoTitle: null,
            videoDescription: null,
            IsShowLandmarksSelected: false
        })
    }

    const MoveToSecoundPhase = () => {
        fullInputData.video ? setCurrentView(2) : alert('Please Choose Valid Video')
    }
    const MoveToThirdPhase = () => {
        fullInputData.video ? setCurrentView(3) : alert('Please Choose Valid Video')
    }

    return (
        <div className='m-5'>
            {currentView === 1 &&
                <FirstPhase
                    fullInputData={fullInputData}
                    setFullInputData={setFullInputData}
                    setVideoUrlData={setVideoUrl}
                    MoveToSecoundPhase={MoveToSecoundPhase}
                />
            }
            {currentView === 2 &&
                <SecoundPhase
                    fullInputData={fullInputData}
                    setFullInputData={setFullInputData}
                    videoUrl={videoUrl}
                    SubmitVideoData={SubmitVideoData}
                />
            }
            {currentView === 3 &&
                <ThirdPhase
                setCurrentView={setCurrentView}
                />
            }
        </div>
    )
}
