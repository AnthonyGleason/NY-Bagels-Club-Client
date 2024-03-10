import React, {useEffect, useState} from 'react';
import './HomeLoadingOverlay.css';
import bubbleLoadingImg from '../../../Assets/icons/bubble-loading-white.svg';
import { HOME_LOADING_DELAY, IS_MAINTENANCE_MODE } from '../../../Config/clientSettings';
import {motion} from 'framer-motion';
import loadingImg from '../../../Assets/backgrounds/loading.webp';

const loadingVariants = {
  hidden: { x: '-100%' },
  visible: { x:0, transition: { duration: 0.6 } },
};

const fadeInVariants = {
  hidden: {opacity: 0},
  visible: {opacity: 1, transition: {duration: 0.6}}
}

export default function HomeLoadingOverlay(
  {
    setIsPageLoaded
  }:{
    setIsPageLoaded:Function
  }
){

  useEffect(()=>{
    //redirect user to new url after time has passed
    if (!IS_MAINTENANCE_MODE){
      setTimeout(()=>{
        setIsPageLoaded(true);
      },HOME_LOADING_DELAY)
    }
  },[setIsPageLoaded]);

  return(
    <div className='init-load'>
      <img src={loadingImg} className='init-load-background' sizes='cover'/>
      <motion.img
        className='loading-spinner'
        src={bubbleLoadingImg}
        alt='This page is currently loading. You will be able to see our delicious bagels and spreads shortly.'
        initial='hidden'
        animate='visible'
        variants={loadingVariants}
        loading='lazy'
      />
      <motion.header initial='hidden' animate='visible' variants={fadeInVariants} className='loading-content-wrapper'>
        <h3 >
          New York Bagels Club
          <br />
          "Always Fresh"
        </h3>
        {IS_MAINTENANCE_MODE === true ? (
          <p className='loading-notice' >
            We are undergoing scheduled maintenance and will return shortly. Thank you for your patience!
          </p>
        ) : (
          <p className='loading-message' >
            <span>
              Our club is just about fresh tasting bagels! <span className='loading-notice'>NO monthly subscription required</span> and <span className='loading-notice'>NO hidden fees!</span> Just delicious bagels shipped to your door. 
              That is the kind of "club" we like.
            </span>
          </p>         
        )}
      </motion.header>
    </div>
  )
};