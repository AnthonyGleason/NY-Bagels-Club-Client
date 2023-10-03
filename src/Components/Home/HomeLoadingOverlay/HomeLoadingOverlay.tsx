import React, {useRef, useEffect} from 'react';
import Aos from 'aos';
import "aos/dist/aos.css";
import './HomeLoadingOverlay.css';
import bubbleLoadingImg from '../../../Assets/icons/bubble-loading.svg';
import { HOME_LOADING_DELAY } from '../../../Config/clientSettings';

export default function HomeLoadingOverlay(
  {
    setIsPageLoaded
  }:{
    setIsPageLoaded:Function
  }
){
  useEffect(()=>{
    //setup fade animation length
    Aos.init({duration: 2500});
    //redirect user to new url after time has passed
    setTimeout(()=>{
      setIsPageLoaded(true);
    },HOME_LOADING_DELAY)
  },[]);

  return(
    <section className='init-load'>
      <div className='init-load-background' />
      <div className='init-load-overlay' />
      <div className='loading-content-wrapper'>
        <h1 data-aos='fade-in'>
          <span>New York Bagels Club</span>
          <span>"Always Fresh"</span>
        </h1>
        <p data-aos='fade-in'>
          Authentic New York City Style Bagels Directly From the Heart of Long Island to Your Doorstep!
        </p>
        <img data-aos='fade-in' className='loading-spinner' src={bubbleLoadingImg} alt='loading' />
      </div>
    </section>
  )
};