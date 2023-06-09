import './profilePage.css';

import {
  React,
  useEffect,
  useState,
} from 'react';

import Dashboard from './components/Dashboard/Dashboard';
import EditProfile from './components/EditProfile/EditProfile';
import SideBar from './components/SideBar/SideBar';
import UploadVideos from './components/UploadVideos/UploadVideos';
import VideoGallery from './components/VideoGallery/VideoGallery';

export default function ProfilePage() {
  const [currentView, setCurrentView] = useState(1)

  // profiled data state 
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userBD: "",
    userImage: ""
  })

  useEffect(() =>
    async function fetchData() {
      let jwtToken = localStorage.getItem('jwt_token');
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${jwtToken}`);
      myHeaders.append("Cookie", `session=.${jwtToken}`);
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };

      fetch('http://localhost:5000/profile-page', requestOptions)
        .then(response => response.json())
        .then(res => {
          const data = res.Data.response_data

          setProfileData({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            userBD: data.userBirthDate,
            userImage: data.userImage
          })
        })
    }

    , []);


  function ChangeViewFuntion(viewID) {
    setCurrentView(viewID)
  }

  return (
    <div>
      <div className="">
        <div className="container-fluid ">
          <div className="row">
            <div className="col-sm-2 SideBar">
              <SideBar changeViewFuntion={ChangeViewFuntion} sideBarData={profileData} />
            </div>
            <div className="col-sm-10">
              {currentView === 1 ? <Dashboard /> : ""}
              {currentView === 2 ? <VideoGallery  /> : ""}
              {currentView === 3 ? <UploadVideos ChangeViewFuntion={ChangeViewFuntion} /> : ""}
              {currentView === 4 ? <EditProfile profileData={profileData} /> : ""}
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