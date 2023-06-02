import React, { useState } from 'react';

import SideBarAdmin from './Components/SideBarAdmin';
import UserReview from './Components/UserReview';
import VideoReview from './Components/VideoReview';

function AdminPanel() {

    const [currentView, setCurrentView] = useState(1)

    function ChangeViewFuntion(viewID) {
        setCurrentView(viewID)
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
    // useEffect(() => {
    //     const token = localStorage.getItem('auth')
    //     if(token){

    //     }
    // }, [])
  return (
    <div>
      <div className="">
        <div className="container-fluid ">
          <div className="row">
            <div className="col-sm-2 SideBar">
              <SideBarAdmin changeViewFuntion={ChangeViewFuntion} sideBarData={profileData} />
            </div>
             <div className="col-sm-10 d-flex flex-column">
              {currentView == 1 ? <UserReview/> : ""}
              {currentView == 2 ? <VideoReview/> : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel