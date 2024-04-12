import React from 'react';
import {motion} from 'framer-motion';
import storeFrontDesktopImg from '../../../Assets/backgrounds/store.webp';
import { scrollToID } from '../../../Helpers/misc';

export default function Hero(){
  const handleOrderNowPress = function(){
    scrollToID('store-item-heading',false,true);
  };
  const handleGiftSelectionsPress = function(){
    scrollToID('store-item-gift-heading',false,false);
  };

  return(
    <motion.section 
      className='home-content-row-wrapper'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{duration: 2.5}}
      viewport={{once: false}}
    >
      <article
        className='store-items-heading' 
        id='proudly-delivering'
      >
        <h1>
          Delicious NYC Bagels, Free Priority Shipping
        </h1> 
        <ul className='home-order-buttons'>
          <li>
            <button className='home-order-now' onClick={()=>{handleGiftSelectionsPress()}}>EXPLORE GIFT SELECTIONS</button>
          </li>
          <li>
            <button className='home-order-now' onClick={()=>{handleOrderNowPress()}}>OUR BAGEL SELECTIONS</button>
          </li>
        </ul>
        <p>
          To meet the highest standards of freshness, our hand-rolled bagels are kettled and vacuum-sealed just two hours after leaving the oven, ensuring we seal in the perfect flavor of a delicious New York Bagel.
        </p>
        <div className='store-locations-container'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3019.755572565583!2d-73.508357323218!3d40.8113647315256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c283781bd4bf5b%3A0x5243486a991bb12b!2sBrendel&#39;s%20Bagels-Catering%20Long%20Island!5e0!3m2!1sen!2sus!4v1712425568917!5m2!1sen!2sus" width={'100%'} height="400" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102321.36992515576!2d-73.52618131564925!3d40.84819340558836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2851dbeadd463%3A0x687de3a921370acc!2sBrendel&#39;s%20Bagel&#39;s%20-%20Catering%20Long%20Island!5e0!3m2!1sen!2sus!4v1712882242230!5m2!1sen!2sus" width={'100%'} height="400" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3019.1383356841366!2d-73.20765392321745!3d40.824925030693464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e830bdf003da29%3A0x762920bc7ed49416!2sBrendel&#39;s%20Bagels-Catering%20Long%20Island!5e0!3m2!1sen!2sus!4v1712882380857!5m2!1sen!2sus" width={'100%'} height="400" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </article>
      <img
        decoding='async'
        loading='lazy'
        alt='Brendels store front'
        className='store-front-img'
        src={window.innerWidth <= 450 ? './Assets/store-mobile.webp' : storeFrontDesktopImg}
      />
    </motion.section>
  )
}