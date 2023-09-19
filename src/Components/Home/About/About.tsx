import React from 'react';
import storefrontImg from '../../../Assets/storefront.jpeg'

export default function About(){
  return(
    <section className='about-us'>
      <p>
        We offer gourmet food and catering solutions at three convenient locations across Long Island; in Hauppauge, Glen Cove and Syosset. We offer traditional tastes with refreshing creativity and use only the freshest ingredients in everything we prepare.
      </p>
      <img src={storefrontImg} alt='store front' />
    </section>
  )
}