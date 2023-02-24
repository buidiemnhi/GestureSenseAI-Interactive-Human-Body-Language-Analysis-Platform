import './profilePage.css';

import {
  React,
  useState
} from 'react';

import Dashboard from './components/Dashboard/Dashboard';
import EditProfile from './components/EditProfile/EditProfile';
import SideBar from './components/SideBar/SideBar';
import UploadVideos from './components/UploadVideos/UploadVideos';
import VideoGallery from './components/VideoGallery/VideoGallery';

export default function ProfilePage() {
  const [currentView, setCurrentView] = useState(1)

  function ChangeViewFuntion(viewID){
    setCurrentView(viewID)
  }

  return (
    <div>
      <div className="">
        <div className="container-fluid ">
          <div className="row">
            <div className="col-sm-2 SideBar">
              <SideBar changeViewFuntion={ChangeViewFuntion} />
            </div>
            <div className="col-sm-10">
            {currentView == 1?  <Dashboard/> : ""}
            {currentView == 2?  <VideoGallery/>: ""}
            {currentView == 3?  <UploadVideos/> : ""}
            {currentView == 4?  <EditProfile/> : ""}
            </div>
            {/*<div className="col-sm-10 StatisticsPage" >
              <StatisticsPage />
            </div>
          */}
          </div>
        </div>
      </div>
    </div>
  )
}
