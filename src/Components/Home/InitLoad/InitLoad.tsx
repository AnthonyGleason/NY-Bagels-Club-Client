import React, {useRef, useEffect} from 'react';
import Aos from 'aos';
import "aos/dist/aos.css";
import './InitLoad.css';
import bubbleLoadingImg from '../../../Assets/bubble-loading.svg';

export default function InitLoad(
  {
    setIsLoaded
  }:{
    setIsLoaded:Function
  }
){
  useEffect(()=>{
    //setup fade animation length
    Aos.init({duration: 2500});
    //redirect user to new url after time has passed
    setTimeout(()=>{
      setIsLoaded(true);
    },5000)
  },[]);

  return(
    <section className='init-load'>
      <div className='init-load-background' />
      <div className='init-load-overlay' />
      <h3 data-aos='fade-in' >Brendel's Bagels</h3>
      <p data-aos='fade-in'>
        Now shipping nationwide!
        <br />
        Order for yourself or a fellow New Yorker <span>authentic</span> New York style bagels!
      </p>
      <img data-aos='fade-in' className='loading-spinner' src={bubbleLoadingImg} alt='loading' />
    </section>
  )
}