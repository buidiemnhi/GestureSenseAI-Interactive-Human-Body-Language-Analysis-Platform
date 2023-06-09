import React from 'react';

import { useSignOut } from 'react-auth-kit';
<<<<<<< Updated upstream
=======
import {
  Link,
  useNavigate,
} from 'react-router-dom';
>>>>>>> Stashed changes

export default function SideBarAdmin(props) {
  const signOut = useSignOut()
  const naviagte = useNavigate()

  function logOutButton(){
    localStorage.clear();
    signOut()
    naviagte('/')
  }

  return (
    <div className='py-2 ml-3'>
      <div className=''>
        <img class="profileImg" src={props.sideBarData.userImage} />
        <p className='mt-2 UserName'>{`${props.sideBarData.firstName} ${props.sideBarData.lastName}`}</p>
        <p className='text-muted UserEmail'>{props.sideBarData.email}</p>
      </div>
      <ul className="SideNavBar py-5 ">
<<<<<<< Updated upstream
        <li className='mb-3' ><span className='text-arrow'>users review</span></li>
=======
        <li className='mb-3 grow' ><span className='text-arrow'onClick={() => props.changeViewFuntion(1)}>Users review</span></li>
        <li className='mb-3 grow' ><span className='text-arrow'onClick={() => props.changeViewFuntion(2)}>Edit Profile</span></li>
        <li className='mb-3 grow' ><span className='text-arrow'onClick={() => props.changeViewFuntion(3)}>System statistics</span></li>
        <li className='mb-3 grow' ><Link className='text-arrow' to={'/Profilepage'}>User view</Link></li>
>>>>>>> Stashed changes
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