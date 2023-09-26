import React from 'react';
import storefrontImg from '../../../Assets/storefront.jpeg'

export default function About(){
  return(
    <section className='about-us'>
      <h4>Proudly Serving Brendel's Bagels</h4>
      <p>
        Brendel's Bagels offers gourmet food and catering solutions at three convenient locations across Long Island; in Hauppauge, Glen Cove and Syosset. Their bagels are a fusion of traditional flavors with creative a flair, meticulously crafted using only the freshest and finest ingredients.
      </p>
      <img src={storefrontImg} alt='store front' />
    </section>
  )
}