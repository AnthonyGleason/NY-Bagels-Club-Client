import React, {useEffect} from 'react';
import Aos from 'aos';
import "aos/dist/aos.css";
import './HomeLoadingOverlay.css';
import bubbleLoadingImg from '../../../Assets/icons/bubble-loading.svg';
import { HOME_LOADING_DELAY, IS_MAINTENANCE_MODE } from '../../../Config/clientSettings';

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
    if (!IS_MAINTENANCE_MODE){
      setTimeout(()=>{
        setIsPageLoaded(true);
      },HOME_LOADING_DELAY)
    }
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
        {
          IS_MAINTENANCE_MODE === true
          ?
          <p data-aos='fade-in'>
            We are undergoing scheduled maintenance and will return shortly. Thank you for your patience!
          </p>
          :
          <>
            <p data-aos='fade-in'>
              Authentic New York City Style Bagels Directly From the Heart of Long Island to Your Doorstep!
            </p>
            <img data-aos='fade-in' className='loading-spinner' src={bubbleLoadingImg} alt='loading' />
          </>
        }
      </div>
    </section>
  )
};