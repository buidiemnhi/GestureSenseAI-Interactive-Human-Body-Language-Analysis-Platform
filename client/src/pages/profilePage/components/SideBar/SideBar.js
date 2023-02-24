import './SideBar.css';

import React from 'react';

import { useSignOut } from 'react-auth-kit';

export default function SideBar(props) {
  const signOut = useSignOut()
  
  function logOutButton(){
    localStorage.removeItem('jwt_token');
    signOut();
  }

  return (
    <div className='py-5 ml-3'>
      <div className=''>
        <img class="profileImg" src="https://www.alguardian.com/img/22/06/17/66193-16554468526337002.jpeg" />
        <p className='mt-2 UserName'>Kareem Hamdeen</p>
        <p className='text-muted UserEmail'>KareemHamdeen@gmail.com</p>
      </div>
      <ul className="SideNavBar py-5 ">
        <li><a href="#" onClick={() => props.changeViewFuntion(1)}>Dashboard</a></li>
        <li><a href="#" onClick={() => props.changeViewFuntion(2)}>Video Gallery</a></li>
        <li><a href="#" onClick={() => props.changeViewFuntion(3)}>Upload Video</a></li>
        <li><a href="#" onClick={() => props.changeViewFuntion(4)}>Edit Profile</a></li>
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
