import React from 'react';

import { useSignOut } from 'react-auth-kit';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

export default function SideBarAdmin(props) {
  const signOut = useSignOut()
  const naviagte = useNavigate()

  function logOutButton(){
      let jwtToken = localStorage.getItem('jwt_token');
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${jwtToken}`);
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
      };
fetch('http://127.0.0.1:5000/logout', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
  },
  method: "POST"
})
    .then(()=>localStorage.clear())
    .finally(()=>naviagte('/'))
  }

  return (
    <div className='py-2 ml-3'>

      <div className='my-3 grow'>
      <Link to={'/'} className='sidebarLogo'>-GestureSense-</Link>
      </div>

      <div className=''>
        <img class="profileImg" src={props.sideBarData.userImage} />
        <p className='mt-2 UserName'>{`${props.sideBarData.firstName} ${props.sideBarData.lastName}`}</p>
        <p className='text-muted UserEmail'>{props.sideBarData.email}</p>
      </div>

      <ul className="SideNavBar py-5 ">
        <li className='mb-3 grow' ><span className='text-arrow'onClick={() => props.changeViewFuntion(1)}>Users review</span></li>
        <li className='mb-3 grow' ><span className='text-arrow'onClick={() => props.changeViewFuntion(2)}>Edit Profile</span></li>
        <li className='mb-3 grow' ><span className='text-arrow'onClick={() => props.changeViewFuntion(7)}>Create admin</span></li>
        <li className='mb-3 grow' ><span className='text-arrow'onClick={() => props.changeViewFuntion(3)}>System statistics</span></li>
        <li className='mb-3 grow' ><a className='text-arrow p-0' href='/profilepage'>User view</a></li>
      </ul>

      <button
        type="button"
        className="btn btn-outline-dark px-3 logOutButton"
        onClick={logOutButton}
      >
        Logout
      </button>
    </div>
  )
}