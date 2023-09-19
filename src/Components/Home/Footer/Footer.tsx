import React from 'react';
import './Footer.css';
import applePayIcon from '../../../Assets/paymentIcons/apple-pay.svg';
import googlePayIcon from '../../../Assets/paymentIcons/google-pay.svg';
import visaIcon from '../../../Assets/paymentIcons/visa-fill.jpeg';
import masterCardIcon from '../../../Assets/paymentIcons/mastercard.svg';

export default function Footer(){
  return(
    <section className='footer'>
      <article className='copyright'>
        © 2023 Brendel's Bagels & Eatery of New York.
        <br />
        All rights reserved.
      </article>
      <article className='payment-methods'>
        <img src={visaIcon} alt='visa' />
        <img src={masterCardIcon} alt='mastercard' />
        <img src={applePayIcon} alt='apple pay' />
        <img src={googlePayIcon} alt='google pay' />
      </article>
    </section>
  )
}