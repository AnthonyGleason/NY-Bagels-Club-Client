import React, { useEffect } from 'react';
import storefrontImg from '../../../Assets/storefront.jpeg'
import Aos from 'aos';
import "aos/dist/aos.css";

export default function About(){

  //handle initial page load
  useEffect(()=>{
    //setup fade animation length
    Aos.init({duration: 2500});
  },[]);

  return(
    <section className='about-us'>
      <p data-aos='fade-in'>
        Crafted with the freshest ingredients, our New York Style bagels are hand-rolled, boiled, and baked for that authentic New York City flavor and texture. With 18 years of bagel-making expertise, Brendel's Bagels & Eatery is your go-to for gourmet food and catering, conveniently serving Long Island and now shipping nationwide. Whether you're a transplant New Yorker, hosting family, or planning a special corporate event, we're here to delight your taste buds.
      </p>
      <img data-aos='fade-in' src={storefrontImg} alt='store front' />
    </section>
  )
}