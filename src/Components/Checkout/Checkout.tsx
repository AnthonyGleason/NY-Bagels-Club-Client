import React, { useEffect, useState } from 'react';
import { getPaymentIntentToken, verifyLoginToken } from '../../Helpers/auth';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm/CheckoutForm';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';
import loadingImg from '../../Assets/icons/bubble-loading.svg';

const stripePromise = loadStripe("pk_test_51MkbRQJ42zMuNqyLhOP6Aluvz4TVAxVFFeofdem3PAvRDUoRzwYxfm0tBeOKYhdCNhbIzSSKeVFdrp7IvVku60Yz001xBUoHhk");

export default function Checkout(){
  const [isLoginValid,setIsLoginValid] = useState<boolean>(false);
  const [clientSecret,setClientSecret] = useState<string>('');
  const navigate = useNavigate();

  const verifyAccessToPage = async function(){
    setIsLoginValid(await verifyLoginToken());
  };
  
  useEffect(()=>{
    verifyAccessToPage();
  },[]);

  //react strict mode causes a bug in dev mode where two payment intent tokens are fetched causing conflicts at checkout
  //this workaround ensures only one is obtained
  useEffect(()=>{
    if (isLoginValid) getPaymentIntentToken(clientSecret,setClientSecret);
  },[isLoginValid]);

  const appearance:any= {
    theme: 'stripe',
  };

  const options:any= {
    clientSecret,
    appearance,
  };

  if (isLoginValid && clientSecret){
    return(
      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm clientSecret={clientSecret} setClientSecret={setClientSecret} isLoginValid={isLoginValid} setIsLoginValid={setIsLoginValid} />
      </Elements>
    )
  }else if (!isLoginValid){
    return(
      <>
        <div className='checkout-logged-out'>
          <h3>Please login or register to checkout your basket.</h3>
          <div className='checkout-button-wrapper'>
            <button onClick={()=>{navigate('/login')}}>Login</button>
            <button onClick={()=>{navigate('/register')}}>Register</button>
          </div>
        </div>
      </>
    );
  }else{
    return(
      <div className='checkout-loading'>
        <p>Loading...</p>
        <img src={loadingImg} alt='loading' />
      </div>
    )
  };
};