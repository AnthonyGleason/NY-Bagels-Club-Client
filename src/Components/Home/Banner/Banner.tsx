import React from 'react';
import {motion} from 'framer-motion';
import homeDeliveryDesktopImg from '../../../Assets/backgrounds/homeDelivery.webp';
import starImg from '../../../Assets/icons/star-duotone.svg';

export default function Banner(){
  return(
    <section
      className='banner'
    >
      <motion.article 
        className='banner-content-wrapper'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{duration: 2}}
        viewport={{once: false}}
      >
        <header>
          <img decoding='async' loading='lazy' src={starImg} alt='star'  />
          <h2>
            Free Priority Shipping Nationwide!
          </h2>
          <img decoding='async' loading='lazy' src={starImg} alt='star'  />
        </header>
        <p >
          Enjoy <u>FAST and FREE</u> Priority Mail Shipping nationwide with every order!
          This offer includes shipping to Alaska, Guam, Hawaii, Virgin Islands and Puerto Rico!
        </p>
      </motion.article>
      <motion.img 
        decoding='async' 
        loading='lazy' 
        className='home-delivery' 
        src={window.innerWidth <= 450 ? './Assets/homeDelivery-mobile.webp' : homeDeliveryDesktopImg} 
        alt='home delivery'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{duration: 2}}
        viewport={{once: false}}
      />
    </section>
  )
}