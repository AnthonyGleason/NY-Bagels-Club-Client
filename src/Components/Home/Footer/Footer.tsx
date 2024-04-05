import React from 'react';

import './Footer.css';

import applePayIcon from '../../../Assets/paymentIcons/apple-pay.svg';
import googlePayIcon from '../../../Assets/paymentIcons/google-pay.svg';
import visaIcon from '../../../Assets/paymentIcons/visa-fill.webp';
import masterCardIcon from '../../../Assets/paymentIcons/mastercard.svg';
import supportSmallImg from '../../../Assets/icons/supportSmall.svg';
import minyImg from '../../../Assets/icons/miny.webp';
import cashAppImg from '../../../Assets/paymentIcons/cashapp.svg';
import stripeImg from '../../../Assets/paymentIcons/stripe.svg';
import lockImg from '../../../Assets/paymentIcons/lock-1.svg';
import leafImg from '../../../Assets/icons/leaf.svg';
import bricksDesktopImg from '../../../Assets/backgrounds/bricks.webp';

export default function Footer(){
  return(
    <footer style={{backgroundImage: `url('${window.innerWidth<=450 ? './Assets/bricks-mobile.webp' : bricksDesktopImg}')`}} className='footer'>
      <div className='footer-content-wrapper'>

        <section className='copyright'>
          <span>© 2023 Gleason Holdings Group LLC</span>
          <span>
            © 2023 <a href='https://www.brendelsbagels.com/'>Brendel's Bagels & Eatery of New York</a>.
            <br />
            All rights reserved.
          </span>
        </section>

        <section className='footer-checkout-info'>
          <ul className='payment-methods'>
            <li>
              <img decoding='async' src={visaIcon} alt='visa' loading="lazy" />
            </li>
            <li>
              <img decoding='async' src={masterCardIcon} alt='mastercard' loading="lazy" />
            </li>
            <li>
              <img decoding='async' src={applePayIcon} alt='apple pay' loading="lazy" />
            </li>
            <li>
              <img decoding='async' src={googlePayIcon} alt='google pay' loading="lazy" />
            </li>
            <li>
              <img decoding='async' src={cashAppImg} alt='cash app' loading="lazy" className='cash-app-img' />
            </li>
          </ul>
          <aside>
            <p>Checkout Secured By</p> 
            <img decoding='async' alt='checkout secured by stripe' className='stripe-footer-img' src={stripeImg} loading="lazy" />
            <img decoding='async' alt='secured ssl processing of payments' className='lock-img' src={lockImg} loading="lazy" />
          </aside>
        </section>

        <section className='footer-support'>
          <span>Do you need assistance with an order, or would you like to provide feedback on your experience with us?</span>
          <a href="mailto:support@nybagelsclub.com">Share Your Experience With Us!</a>
          <strong>Your satisfaction is our priority!</strong>
          <strong className='always-fresh-notice'>
            <span>Shop confidently! Every order is supported by our </span>
            <span className='always-fresh'>"Always Fresh" Guarantee.</span>
          </strong>
        </section>

        <section className='footer-icons'>
          <img decoding='async' className='miny'src={minyImg} alt='made in new york' loading="lazy" />
          <img decoding='async' className='small-business' src={supportSmallImg} alt='support small business' loading="lazy" />
        </section>

      </div>
    </footer>
  )
}