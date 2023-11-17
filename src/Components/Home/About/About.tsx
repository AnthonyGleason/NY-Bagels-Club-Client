import React, { useEffect } from 'react';
import storefrontImg from '../../../Assets/storefront.jpeg'
import {motion} from 'framer-motion';

export default function About(){

  return(
    <section className='about-us'>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{duration: 3}}
        viewport={{once: false}}
      >
        Crafted with the freshest ingredients, our New York Style bagels are hand-rolled, kettled, baked and vaccum sealed to lock in that authentic New York City flavor and texture. With 18 years of bagel-making expertise, <span className='brendels'>Brendel's</span> is your go-to for gourmet food and catering, conveniently serving Long Island and now shipping nationwide. Whether you're a transplant New Yorker, hosting family, or planning a special corporate event, we're here to delight your taste buds.
      </motion.p>
    </section>
  )
}