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
  const [isOfferChecked,setIsOfferChecked] = useState<boolean>(false);

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

  if (!isEmailSent){
    return(
      <section
        className='custom-orders'
      >
        <motion.h3 
          id='custom-orders-header' 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{duration: 1}}
          viewport={{once: false}}
          className='store-items-heading'
        >
          Create Your Dream Gourmet Bagel
        </motion.h3>
        <motion.form
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{duration: 3.2}}
          viewport={{once: false}} 
        >
          <div className='custom-orders-info'>
              <span className='brendels'>Brendel's Bagels</span> and New York Bagels Club have partnered to create a package deal for custom themed bagel styles. The package is $274.95 and comes with four custom baker's dozen's and three 1 lb spreads of your choice.
          </div>
          <div className='input-wrapper custom-orders-checkbox-wrapper'>
            <label htmlFor='specialOfferCheckbox'>
              <div>Are you interested in our $295 special offer? (Optional)</div>
              <input id='specialOfferCheckbox' name='specialOfferCheckbox' className='checkbox' type='checkbox' checked={isOfferChecked} onChange={()=>{setIsOfferChecked(!isOfferChecked)}}/>
            </label>
          </div>
          <div className='input-wrapper'>
            <label htmlFor='contactEmail'>Contact Email:</label>
            <input id='contactEmail' name='contactEmail' className='text-box' placeholder='example@example.com' value={emailInput} onChange={(e)=>{setEmailInput(e.target.value)}} type='email' />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='desiredQuantity'>Desired Quantity:</label>
            <input id='desiredQuantity' name='desiredQuantity' className='text-box' placeholder="Four Delicious Baker's Dozen's" value={quantityInput} onChange={(e)=>{setQuantityInput(e.target.value)}} />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='userRequest'>Your Request:</label>
            <textarea id='userRequest' name='userRequest' className='text-box' value={requestInput} onChange={(e)=>{setRequestInput(e.target.value)}} placeholder="Hint: You can personalize our Bagels to suit your event's theme, whether it's a baby shower, wedding, sports team, school, holiday, or bachelorette / bachelor party. Mix and match from our flavor options and pick your own colors!" />
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