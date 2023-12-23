import React from 'react';
import {motion} from 'framer-motion';
import homeDeliveryDesktopImg from '../../../Assets/backgrounds/homeDelivery.webp';
import starImg from '../../../Assets/icons/star-duotone.svg';

export default function Banner(){
  return(
    <div className='banner-wrapper'>
      <motion.section
        className='banner'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{duration: 2}}
        viewport={{once: false}}
      >
        <div 
          className='limited-offer-wrapper'
        >
          <h3>
            <img decoding='async' loading='lazy' src={starImg} alt='star'  />
            <span>
              Free Priority Shipping!
            </span>
            <img decoding='async' loading='lazy' src={starImg} alt='star'  />
          </h3>
          <p >
            Enjoy <u>FAST and FREE</u> Priority Mail Shipping nationwide with every order!
            This offer includes shipping to Alaska, Guam, Hawaii, Virgin Islands and Puerto Rico!
          </p>
        </div>
        <img decoding='async' loading='lazy' className='home-delivery' src={window.innerWidth <= 450 ? './Assets/homeDelivery-mobile.webp' : homeDeliveryDesktopImg} alt='home delivery'  />
      </motion.section>
    </div>
  )
}