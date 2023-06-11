import React, {
  useEffect,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import Dashboard from '../profilePage/components/Dashboard/Dashboard';
import EditProfile from '../profilePage/components/EditProfile/EditProfile';
import UploadVideos from '../profilePage/components/UploadVideos/UploadVideos';
import VideoGallery from '../profilePage/components/VideoGallery/VideoGallery';
import VideoPreview from '../VideoPreview/VideoPreview';
import CreateAdmin from './Components/CreateAdmin';
import SideBarAdmin from './Components/SideBarAdmin';
import Statpage from './Components/Statpage';
import UserReview from './Components/UserReview';

function AdminPanel() {
  const naviagte = useNavigate()
  const [currentView, setCurrentView] = useState(3)
  const [id,setId] = useState(1)
  console.log(id)
  function ChangeViewFuntion(viewID) {
    setCurrentView(viewID)
  }

  function changeUserId(userID){
    setId(userID)
    setCurrentView(8)
  }


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
          // const isAdmin = res.Data.response_data.isAdmin
          // console.log(isAdmin)
            setProfileData({
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              userBD: data.userBirthDate,
              userImage: data.userImage
          })
        })
        
    }


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

//use effect to fetch user data
  useEffect(() =>{
    if(localStorage.getItem('isAdmin')==="1"){
      fetchData()
    }else{
      naviagte('/profilepage')
    }
  }
  , []);
//
 
  return (
    <div>
      <div className="">
        <div className="container-fluid ">
          <div className="row">
            <div className="col-sm-2 SideBar">
              <SideBarAdmin sideBarData={profileData} changeViewFuntion={ChangeViewFuntion} />
            </div>
             <div className="col-sm-10 d-flex flex-column ">

              {currentView === 1 ? <UserReview changeUserId={changeUserId} changeViewFuntion={ChangeViewFuntion}/> : ""}
              {currentView === 2 ? <EditProfile profileData={profileData} /> : ""}
              {currentView === 7 ? <CreateAdmin changeViewFuntion={ChangeViewFuntion}/> : ""}
              {currentView === 3 ? <Statpage changeViewFuntion={ChangeViewFuntion}/> : ""}
              {currentView === 4 ? <Dashboard /> : ""}
              {currentView === 5 ? <UploadVideos /> : ""}
              {currentView === 6 ? <VideoGallery /> : ""}
              {currentView === 8 ? <VideoPreview id={id}/> : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel