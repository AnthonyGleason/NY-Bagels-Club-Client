import React from 'react';
import {motion} from 'framer-motion';
import storeFrontDesktopImg from '../../../Assets/store.webp';

export default function Hero(){
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
          The Best New York Bagels Shipped Priority Fresh to You and our Shipping is Always Free
        </h1> 
        <p>
          In a close partnership with Brendel's Bakery & Eatery of Long Island, NY, we meticulously curate and ship a selection of gourmet New York City bagels, spreads and pastries nationwide. To meet the highest standards of freshness, our hand-rolled bagels are kettled and vacuum-sealed just two hours after leaving the oven, ensuring we seal in the perfect flavor of a delicious New York Bagel.
        </p>
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