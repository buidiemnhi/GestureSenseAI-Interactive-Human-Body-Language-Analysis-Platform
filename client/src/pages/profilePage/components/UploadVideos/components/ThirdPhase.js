import {
  React,
  useEffect,
  useState,
} from 'react';

import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from 'react-use';

export default function ThirdPhase(props) {
  const { width, height } = useWindowSize()
  const [count, setCount] = useState(5);
  const navigate = useNavigate()
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);

    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count === 0) {
      props.ChangeViewFuntion(2);
    }
  }, [count, props.setCurrentView]);


  return (
    <div className='ThirdPhase'>
      <Confetti
        width={width*.80}
        height={height}
      />

      <div class="d-flex justify-content-center align-items-center " style={{ height: "80vh" }}>
        <div class="text-center">
          <h1>Thank you For using our software</h1>
          <h6>It might take a while to see the video in your video gallery so please be patient</h6>
          <p>You will be able to app another video in {count}</p>
        </div>
      </div>
    </div>
  )
}
