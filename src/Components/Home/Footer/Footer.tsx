import React from 'react';
import './Footer.css';
import applePayIcon from '../../../Assets/paymentIcons/apple-pay.svg';
import googlePayIcon from '../../../Assets/paymentIcons/google-pay.svg';
import visaIcon from '../../../Assets/paymentIcons/visa-fill.webp';
import masterCardIcon from '../../../Assets/paymentIcons/mastercard.svg';
import supportSmallImg from '../../../Assets/supportSmall.svg';
import minyImg from '../../../Assets/miny.webp';
import cashAppImg from '../../../Assets/icons/cashapp.svg';
import stripeImg from '../../../Assets/icons/stripe.svg';
import lockImg from '../../../Assets/icons/lock-1.svg';
import leafImg from '../../../Assets/icons/leaf.svg';

import bricksDesktopImg from '../../../Assets/backgrounds/bricks.webp';

export default function Footer(){
  return(
    <section style={{backgroundImage: `url('${window.innerWidth<=450 ? './Assets/bricks-mobile.webp' : bricksDesktopImg}')`}} className='footer'>
      <div className='footer-content-wrapper'>
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
        <div className='footer-checkout-info'>
          <article className='payment-methods'>
            <img decoding='async' src={visaIcon} alt='visa' loading="lazy" />
            <img decoding='async' src={masterCardIcon} alt='mastercard' loading="lazy" />
            <img decoding='async' src={applePayIcon} alt='apple pay' loading="lazy" />
            <img decoding='async' src={googlePayIcon} alt='google pay' loading="lazy" />
            <img decoding='async' className='cash-app-img' src={cashAppImg} alt='cash app' loading="lazy" />
          </article>
          <div>
            <p>Checkout Secured By</p> 
            <img decoding='async' alt='checkout secured by stripe' className='stripe-footer-img' src={stripeImg} loading="lazy" />
            <img decoding='async' alt='secured ssl processing of payments' className='lock-img' src={lockImg} loading="lazy" />
          </div>
        </div>
        <article className='footer-support'>
          <p>Do you need assistance with an order, or would you like to provide feedback on your experience with us?</p>
          <ul>
            <li>Share Your Experience With Us
              <br />
              <a href="mailto:support@nybagelsclub.com">support@nybagelsclub.com</a>
            </li>
          </ul>
          <div className='footer-support-notice'>
            <strong>Your satisfaction is our priority!</strong>
            <strong className='always-fresh-notice'>
              Shop confidently! Every order is supported by our <span className='always-fresh'>"Always Fresh" Guarantee.</span>
              <img decoding='async' className='always-fresh-leaf' src={leafImg} alt='always fresh' loading="lazy" />
            </strong>
          </div>
        </article>
        <div className='footer-icons'>
          <img decoding='async' className='miny'src={minyImg} alt='made in new york' loading="lazy" />
          <img decoding='async' className='small-business' src={supportSmallImg} alt='support small business' loading="lazy" />
        </div>
      </div>
    </section>
  )
}