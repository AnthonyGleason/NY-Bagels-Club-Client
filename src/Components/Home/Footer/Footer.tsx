import React, { useEffect } from 'react';
import './Footer.css';
import applePayIcon from '../../../Assets/paymentIcons/apple-pay.svg';
import googlePayIcon from '../../../Assets/paymentIcons/google-pay.svg';
import visaIcon from '../../../Assets/paymentIcons/visa-fill.jpeg';
import masterCardIcon from '../../../Assets/paymentIcons/mastercard.svg';
import Aos from 'aos';
import "aos/dist/aos.css";
import supportSmallImg from '../../../Assets/supportSmall.svg';

export default function Footer(){
  useEffect(()=>{
    //setup fade animation length
    Aos.init({duration: 4000});
  },[])
  return(
    <section className='footer'>
      <article className='copyright'>
        <span>
          © 2023 Gleason Holdings Group LLC
        </span>
        <span onClick={()=>{window.location.href='https://www.brendelsbagels.com/'}} >
          © 2023 Brendel's Bagels & Eatery of New York.
          <br />
          All rights reserved.
        </span>
      </article>
      <article className='payment-methods'>
        <img src={visaIcon} alt='visa' />
        <img src={masterCardIcon} alt='mastercard' />
        <img src={applePayIcon} alt='apple pay' />
        <img src={googlePayIcon} alt='google pay' />
      </article>
      <article className='support'>
      <p>Do you need assistance with an order, or would you like to provide feedback on your experience with us?</p>
      <ul>
        <li>Share Your Experience With Us
          <br />
          <a href="mailto:support@nybagelsclub.com">support@nybagelsclub.com</a>
        </li>
      </ul>
      <p>
        <strong>Your satisfaction is our priority!</strong>
      </p>
      <img className='small-business' src={supportSmallImg} alt='support small business' />
      </article>
    </section>
  )
}