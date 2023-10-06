import React, { useEffect } from 'react';
import './Footer.css';
import applePayIcon from '../../../Assets/paymentIcons/apple-pay.svg';
import googlePayIcon from '../../../Assets/paymentIcons/google-pay.svg';
import visaIcon from '../../../Assets/paymentIcons/visa-fill.jpeg';
import masterCardIcon from '../../../Assets/paymentIcons/mastercard.svg';
import Aos from 'aos';
import "aos/dist/aos.css";

export default function Footer(){
  useEffect(()=>{
    //setup fade animation length
    Aos.init({duration: 4000});
  },[])
  return(
    <section className='footer'>
      <article data-aos='fade-in' className='copyright'>
        <span>
          © 2023 Gleason Holdings Group LLC
        </span>
        <span>
          © 2023 Brendel's Bagels & Eatery of New York.
          <br />
          All rights reserved.
        </span>
      </article>
      <article data-aos='fade-in' className='payment-methods'>
        <img src={visaIcon} alt='visa' />
        <img src={masterCardIcon} alt='mastercard' />
        <img src={applePayIcon} alt='apple pay' />
        <img src={googlePayIcon} alt='google pay' />
      </article>
      <article data-aos='fade-in' className='support'>
        <p>Do you need assistance with an order, or would you like to provide feedback on your experience with us?</p>
        <ul>
          <li>Phone Number: 123-456-7890</li>
          <li>Email: <a href="mailto:support@nybagelsclub.com">support@nybagelsclub.com</a></li>
        </ul>
        <p>
          <strong>Your satisfaction is our priority!</strong>
        </p>
      </article>
    </section>
  )
}