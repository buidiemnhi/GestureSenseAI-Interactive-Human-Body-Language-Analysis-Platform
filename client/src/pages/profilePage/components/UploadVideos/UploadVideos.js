import './UploadVideos.css';

import React, { useState } from 'react';

import FirstPhase from './components/FirstPhase';
import SecoundPhase from './components/SecoundPhase';
import ThirdPhase from './components/ThirdPhase';

export default function UploadVideos() {
    const [fullInputData, setFullInputData] = useState({
        video: null,
        video_title: null,
        video_description: null,
        landMarks: false
    })
    const [videoUrl, setVideoUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false)
    const [currentView, setCurrentView] = useState(1)

    const SubmitVideoData = async () => {
        setIsUploading(true)
        //Send the data
        let jwtToken = localStorage.getItem('jwt_token');
        var myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${jwtToken}`);
        myHeaders.append('Cookie', `session=.${jwtToken}`);

        const fullInputData2 = new FormData();
        fullInputData2.append("video", fullInputData.video);
        fullInputData2.append('video_title', fullInputData.videoTitle);
        fullInputData2.append('video_description', fullInputData.videoDescription);
        fullInputData2.append('landMarks', fullInputData.landMarks);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: fullInputData2,
          };

          try {
            console.log(fullInputData.IsShowLandmarksSelected)
            const response = await fetch("http://127.0.0.1:5000//upload-video", requestOptions);
            setIsUploading(false)
            setCurrentView(3)
            //hide loader
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setFullInputData({
                video: null,
                videoTitle: null,
                videoDescription: null,
                IsShowLandmarksSelected: false
            })
    
            return data;
          } catch (error) {
            console.error(error);
            setFullInputData({
                video: null,
                videoTitle: null,
                videoDescription: null,
                IsShowLandmarksSelected: false
            })
            return "error";
          }
    }

    const MoveToSecoundPhase = () => {
        fullInputData.video ? setCurrentView(2) : alert('Please Choose Valid Video')
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
                    isUploading={isUploading}
                />
            }
            {currentView === 3 && !isUploading ? 
                <ThirdPhase
                setCurrentView={setCurrentView}
                /> : ''
            }

        </div>
    )
}
