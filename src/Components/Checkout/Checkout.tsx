import React, { useEffect, useState } from 'react';
import './Checkout.css';
import { verifyLoginToken } from '../../Helpers/auth';
import { useNavigate } from 'react-router-dom';
import CartSummary from './CartSummary/CartSummary';

export default function Checkout(){
  const [isLoginValid,setIsLoginValid] = useState<boolean>(true);

  const verifyAccessToPage = async function(){
    setIsLoginValid(await verifyLoginToken());
  }
  const navigate = useNavigate();
  useEffect(()=>{
    verifyAccessToPage();
  },[]);

  //gift inputs
  const [isGiftInput, setIsGiftInput] = useState<boolean>(false);
  const [giftMessageInput, setGiftMessageInput] = useState<string>('');

  if (isLoginValid){
    return(
      <div className='checkout'>
        <CartSummary isCheckoutView={true} />
        <h3>Gift?</h3>
        <div className='gift-options-content'>
          <div className='gift-toggle-container'>
            <input
              type='checkbox'
              checked={isGiftInput}
              onChange={(e) => setIsGiftInput(e.target.checked)}
            />
          </div>
          {
            isGiftInput===true
            ?
              <form className='gift-options-form'>
                <div>
                  <label>Message:</label>
                  <textarea value={giftMessageInput} onChange={(e)=>{setGiftMessageInput(e.target.value)}} />
                </div>
              </form>
            :
             null
          }
        </div>
        <h3>Shipping Information</h3>
        <h3>Payment Information</h3>
      </div>
    );
  }else{
    return(
      <div className='checkout-logged-out'>
        <h3>Please login or register to checkout your basket.</h3>
        <div className='checkout-button-wrapper'>
          <button onClick={()=>{navigate('/login')}}>Login</button>
          <button onClick={()=>{navigate('/register')}}>Register</button>
        </div>
      </div>
    )
  };
};