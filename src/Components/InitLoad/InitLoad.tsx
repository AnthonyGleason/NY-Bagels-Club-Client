import React, {useEffect} from 'react';
import Aos from 'aos';
import "aos/dist/aos.css";
import './InitLoad.css';
import bubbleLoadingImg from '../../Assets/bubble-loading.svg';

export default function InitLoad(
  {
    setIsLoaded
  }:{
    setIsLoaded:Function
  }
){
  useEffect(()=>{
    //setup fade animation length
    Aos.init({duration: 2000});
    //redirect user to new url after time has passed
    setTimeout(()=>{
      setIsLoaded(true)
    },4000)
  },[]);

  return(
    <section className='init-load'>
      <div data-aos='fade-in' className='init-load-background' />
      <div className='init-load-overlay' />
      <h3 data-aos='fade-in' >Brendel's Bagels</h3>
      <p data-aos='fade-in'>
        Long Island's Premier Bagel Company now
        delivering <span>fresh</span> bagels to your doorstep.
      </p>
      <img data-aos='fade-in' className='loading-spinner' src={bubbleLoadingImg} alt='loading' />
    </section>
  )
}