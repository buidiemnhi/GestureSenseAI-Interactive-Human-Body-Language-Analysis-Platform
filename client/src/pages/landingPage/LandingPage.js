import React from 'react';

import About from './components/About/About';
import HeroSection from './components/Hero/HeroSection';
import LiveDemo from './components/Livedemo/LiveDemo';
import Navbar from './components/Navbar/Navbar';
import WhatWeOffer from './components/Whatweoffer/WhatWeOffer';

function LandingPage() {
  return (
    <div className='container-fluid p-0'>
        <Navbar/>
        <HeroSection/>
        <About/>
        <WhatWeOffer/>
        <LiveDemo/>
    </div>
  )
}

export default LandingPage