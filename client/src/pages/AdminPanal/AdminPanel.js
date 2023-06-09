import React, { useState } from 'react';

<<<<<<< Updated upstream
=======
import { useNavigate } from 'react-router-dom';

import Footer from '../landingPage/components/Footer/Footer';
import EditProfile from '../profilePage/components/EditProfile/EditProfile';
>>>>>>> Stashed changes
import SideBarAdmin from './Components/SideBarAdmin';
import UserReview from './Components/UserReview';

function AdminPanel() {
<<<<<<< Updated upstream

=======
  const naviagte = useNavigate()
  const [currentView, setCurrentView] = useState(1)

  function ChangeViewFuntion(viewID) {
    setCurrentView(viewID)
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


>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    // useEffect(() => {
    //     const token = localStorage.getItem('auth')
    //     if(token){

    //     }
    // }, [])
=======

//use effect to fetch user data
  useEffect(() =>{
    if(localStorage.getItem('isAdmin')==="false"){
      fetchData()
    }else{
      naviagte('/profilepage')
    }
  }
  , []);
//
 
>>>>>>> Stashed changes
  return (
    <div>
      <div className="">
        <div className="container-fluid ">
          <div className="row">
            <div className="col-sm-2 SideBar">
              <SideBarAdmin sideBarData={profileData} />
            </div>
<<<<<<< Updated upstream
             <div className="col-sm-10 d-flex flex-column p-5">
              <UserReview/>
=======
             <div className="col-sm-10 d-flex flex-column ">

              {currentView === 1 ? <UserReview /> : ""}
              {currentView === 2 ? <EditProfile profileData={profileData} /> : ""}
              {currentView === 3 ? <Statpage /> : ""}
>>>>>>> Stashed changes
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel