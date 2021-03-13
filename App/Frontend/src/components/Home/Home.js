import React from 'react';
import { Button } from './Button';
import './style/HeroSection.css';
import video from './pages/videos/video-1.mp4'
import Navbar from './Navbar'

const Home = () => (
  // <body>
  <div>
  <Navbar />
  <div className='hero-container'>
      <video src={video} autoPlay loop muted />
      <h1>Welcome To the winner Game</h1>
      <p>Are you ready?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
      </div>
    </div>
    </div>
    );

export default Home;