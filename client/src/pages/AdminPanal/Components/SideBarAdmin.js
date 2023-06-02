import React from 'react';

import { useSignOut } from 'react-auth-kit';

export default function SideBarAdmin(props) {
  const signOut = useSignOut()
  
  function logOutButton(){
    localStorage.removeItem('jwt_token');
    signOut();
  }

  return (
    <div className='py-2 ml-3'>
      <div className=''>
        <img class="profileImg" src={props.sideBarData.userImage} />
        <p className='mt-2 UserName'>{`${props.sideBarData.firstName} ${props.sideBarData.lastName}`}</p>
        <p className='text-muted UserEmail'>{props.sideBarData.email}</p>
      </div>
      <ul className="SideNavBar py-5 ">
        <li><a href="#" onClick={() => props.changeViewFuntion(1)}>users review</a></li>
        <li><a href="#" onClick={() => props.changeViewFuntion(2)}>Video review</a></li>
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