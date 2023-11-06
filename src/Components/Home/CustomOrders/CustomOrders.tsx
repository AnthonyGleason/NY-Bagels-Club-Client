import React, { useState } from 'react';
import './CustomOrders.css';
import { isValidEmail } from '../../../Helpers/verification';
import { getServerUrlPrefix } from '../../../Config/clientSettings';

export default function CustomOrders(){
  const [isEmailSent,setIsEmailSent] = useState<boolean>(false);
  const [emailInput,setEmailInput] = useState<string>('');
  const [requestInput,setRequestInput] = useState<string>('');
  const [quantityInput,setQuantityInput] = useState<string>('');
  const [message,setMessage] = useState<string>('');

  const handleCustomOrderFormSubmit = async function(setIsEmailSent:Function){
    //verify inputs
    try{
      if (!emailInput) throw new Error('The email input cannot be left empty when submitting this form.');
      if (!isValidEmail(emailInput)) throw new Error('The email provided is not a valid email!');
      if (!quantityInput) throw new Error('You cannot leave the desired quantity input blank when submitting this form.');
      if (!requestInput) throw new Error('You cannot leave the request input blank when submitting this form.')
      
      //clear the message because the inputs are valid.
      setMessage('');

      //send information to the server
      const response = await fetch(`${getServerUrlPrefix()}/api/shop/orders/custom`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailInput: emailInput,
          requestInput: requestInput,
          quantityInput: quantityInput
        })
      });
      if (!response.ok) throw new Error('There was an error sending an email to our staff. Please try again later.')
      setIsEmailSent(true);
    }catch(err:any){
      setMessage(err.message);
      //break a fatal error has occured and we cannot proceed
      return
    };
  };

  if (!isEmailSent){
    return(
      <section data-aos='fade-in' className='custom-orders'>
        <form>
          <div className='custom-orders-info'>
            <div>
              <strong>Please Note:</strong>
              <br />
              <span className='brendels'>Brendel's</span> personalized bagel orders require a <strong>minimum of THREE baker's dozens per style</strong> requested.
            </div>
            <p><span>As an additional <strong>bonus</strong> for every three baker's dozens ordered we give you <strong>FOUR FREE 1LB spreads of your choice</strong>.</span></p>
            <p>Our staff will review and respond to your request within 24 hours.</p>
          </div>
          <div className='input-wrapper'>
            <label>Your Email</label>
            <input placeholder='johndoe@example.com' value={emailInput} onChange={(e)=>{setEmailInput(e.target.value)}} type='email' />
          </div>
          <div className='input-wrapper'>
            <label>Desired Quantity</label>
            <input placeholder="Three Baker's Dozens" value={quantityInput} onChange={(e)=>{setQuantityInput(e.target.value)}} />
          </div>
          <div className='input-wrapper'>
            <label>Your Request</label>
            <textarea value={requestInput} onChange={(e)=>{setRequestInput(e.target.value)}} placeholder="You can personalize our Bagels to suit your event's theme, whether it's a baby shower, wedding, sports team, school, holiday, or bachelorette / bachelor party. Mix and match from our flavor options and pick your own colors!" />
          </div>
          {
            message ?
              <p className='error-messages'>{message}</p>
            :
              null
          }
          <button onClick={()=>{handleCustomOrderFormSubmit(setIsEmailSent)}} type='button' className='custom-order-submit-button'>Send Us An Email!</button>
        </form>
      </section>
    );
  }else{
    return(
      <section data-aos='fade-in' className='custom-orders'>
        <div className='custom-orders-email-sent'>We have received your message and will get back to you within 24 hours. Thank you for being a part of the New York Bagels Club Family.</div>
      </section>
    );
  };
};