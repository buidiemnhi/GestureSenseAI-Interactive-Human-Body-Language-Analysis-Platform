import './SideBar.css';

import React from 'react';

import { useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

export default function SideBar(props) {
  const signOut = useSignOut()
  const naviagte = useNavigate()

  function logOutButton(){
    localStorage.clear();
    signOut()
    naviagte('/')
  }

  return (
    <div className="py-5 ml-3">
      <div className="d-flex justify-content-center mt-2 mb-5">
        <a className="navbar-brand fontcolor no-color" href="/">
          -GestureSense-
        </a>
      </div>

      <div className="">
        <img className="profileImg" src={props.sideBarData.userImage} />
        <p className="mt-2 UserName">{`${props.sideBarData.firstName} ${props.sideBarData.lastName}`}</p>
        <p className="text-muted UserEmail">{props.sideBarData.email}</p>
      </div>
      <ul className="SideNavBar py-5 ">
        <li>
          <a href="#" onClick={() => props.changeViewFuntion(1)}>
            Dashboard
          </a>
        </li>
        <li>
          <a href="#" onClick={() => props.changeViewFuntion(2)}>
            Video Gallery
          </a>
        </li>
        <li>
          <a href="#" onClick={() => props.changeViewFuntion(3)}>
            Upload Video
          </a>
        </li>
        <li>
          <a href="#" onClick={() => props.changeViewFuntion(4)}>
            Edit Profile
          </a>
        </li>
        { localStorage.getItem('isAdmin') === "1" &&
        <li>
          <a href="/adminpanel" >
            Admin panel 
          </a>
        </li>
        }

      </ul>
      <button
        type="button"
        className="btn btn-outline-dark px-3 logOutButton"
        onClick={logOutButton}
      >
        Logout
      </button>
    </div>
  );
}
