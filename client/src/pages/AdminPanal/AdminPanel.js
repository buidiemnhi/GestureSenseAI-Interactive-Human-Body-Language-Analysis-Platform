import React, { useState } from 'react';

import SideBarAdmin from './Components/SideBarAdmin';
import UserReview from './Components/UserReview';

function AdminPanel() {

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
              <SideBarAdmin sideBarData={profileData} />
            </div>
             <div className="col-sm-10 d-flex flex-column p-5">
              <UserReview/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel