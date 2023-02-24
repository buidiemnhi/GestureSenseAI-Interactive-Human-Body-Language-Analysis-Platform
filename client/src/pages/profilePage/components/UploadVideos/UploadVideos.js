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
        console.log(JSON.stringify(fullInputData))
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
