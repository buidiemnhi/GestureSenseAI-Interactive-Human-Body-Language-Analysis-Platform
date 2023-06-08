import React from 'react';

import About from './components/About/About';
import Footer from './components/Footer/Footer';
import HeroSection from './components/Hero/HeroSection';
import LiveDemo from './components/Livedemo/LiveDemo';
import WhatWeOffer from './components/Whatweoffer/WhatWeOffer';
import Chatbot from './components/Chatbot/Chatbot';

function LandingPage() {
  return (
    <div className='container-fluid p-0'>
        <HeroSection/>
        <About/>
        <WhatWeOffer/>
        <LiveDemo/>
        <Footer/>
        <Chatbot/>
    </div>
  )
}

export default LandingPage