import React from 'react';

import PersonalStatistics from './components/PersonalStatistics/PersonalStatistics';
import VideoStatistics from './components/VideoStatistics/VideoStatistics';

export default function Dashboard() {
    return (
        <div className='row'>
            <div className="col-sm-5 SecondSection">
                <PersonalStatistics />
            </div>
            <div className="col-sm-7 ThirdSection">
                <VideoStatistics />
            </div>
        </div>
    )
}
