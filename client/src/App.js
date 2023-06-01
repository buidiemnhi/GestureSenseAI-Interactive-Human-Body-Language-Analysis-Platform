import './App.css';

import React from 'react';

import {
  Route,
  Routes,
} from 'react-router-dom';

import LandingPage from './pages/landingPage/LandingPage';
import LoginForm from './pages/Login/LoginForm';
import ProfilePage from './pages/profilePage/ProfilePage';
import RegistrationForm from './pages/Registeration/RegistrationForm';

function App() {
  return (
    <div className="App" >
      <Routes>
          <Route path='/signin' element={<LoginForm/>} />
          <Route path='/Signup' element={<RegistrationForm/>} />
          <Route path='/' element={<LandingPage/>} />
          <Route path='/Profilepage' element={<ProfilePage/>}/>
        </Routes>
    </div>
  );
}

export default App;

{/* <RequireAuth loginPath={'/signin'}> <ProfilePage/> </RequireAuth> */}