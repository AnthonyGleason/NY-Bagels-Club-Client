import React, { useState } from 'react';
import './CustomOrders.css';
import { isValidEmail } from '../../../Helpers/verification';
import { getServerUrlPrefix } from '../../../Config/clientSettings';
import {motion} from 'framer-motion';

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
          quantityInput: quantityInput,
          requestsPackageDeal: isOfferChecked
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
  const [isOfferChecked,setIsOfferChecked] = useState<boolean>(false);

  if (!isEmailSent){
    return(
      <section
        className='custom-orders'
      >
        <motion.form
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{duration: 3.2}}
          viewport={{once: false}} 
        >
          <div className='custom-orders-info'>
            <div>
              <strong>Special Offer!</strong>
              <br />
              <span className='brendels'>Brendel's</span> and New York Bagels Club have partnered to create a package deal for custom bagel styles. The package is $295 and comes with four custom baker's dozen's and three 1 lb spreads of your choice.
            </div>
          </div>
          <div className='input-wrapper'>
            <p>Are you interested in our $295 special offer? (Optional)</p>
            <div className='input-wrapper'>
              <input type='checkbox' checked={isOfferChecked} onChange={()=>{setIsOfferChecked(!isOfferChecked)}}/>
            </div>
          </div>
          <div className='input-wrapper'>
            <input placeholder='Your Contact Email' value={emailInput} onChange={(e)=>{setEmailInput(e.target.value)}} type='email' />
          </div>
          <div className='input-wrapper'>
            <input placeholder="Desired Quantity" value={quantityInput} onChange={(e)=>{setQuantityInput(e.target.value)}} />
          </div>
          <div className='input-wrapper'>
            <textarea value={requestInput} onChange={(e)=>{setRequestInput(e.target.value)}} placeholder="Your Request: You can personalize our Bagels to suit your event's theme, whether it's a baby shower, wedding, sports team, school, holiday, or bachelorette / bachelor party. Mix and match from our flavor options and pick your own colors!" />
          </div>
          <p>Our staff will review and respond to your request within 24 hours.</p>
          {
            message ?
              <p className='error-messages'>{message}</p>
            :
              null
          }
          <button onClick={()=>{handleCustomOrderFormSubmit(setIsEmailSent)}} type='button' className='custom-order-submit-button'>Send Us An Email!</button>
        </motion.form>
      </section>
    );
  }else{
    return(
      <section
        className='custom-orders'
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{duration: 3.5}}
          viewport={{once: false}}  
          className='custom-orders-email-sent'
        >
          We have received your message and will get back to you within 24 hours. Thank you for being a part of the New York Bagels Club Family.
        </motion.div>
      </section>
    );
  };
};