import React, { useEffect, useState } from 'react';
import './Checkout.css';
import { verifyLoginToken } from '../../Helpers/auth';
import { getServerUrlPrefix } from '../../Config/clientSettings';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { useNavigate } from 'react-router-dom';
import CartSummary from './CartSummary/CartSummary';

const stripePromise = loadStripe("pk_test_51MkbRQJ42zMuNqyLhOP6Aluvz4TVAxVFFeofdem3PAvRDUoRzwYxfm0tBeOKYhdCNhbIzSSKeVFdrp7IvVku60Yz001xBUoHhk");

export default function Checkout(){
  const [isLoginValid,setIsLoginValid] = useState<boolean>(false);
  const [clientSecret,setClientSecret] = useState<string>('');

  const navigate = useNavigate();

  const verifyAccessToPage = async function(){
    setIsLoginValid(await verifyLoginToken());
  };

  const getPaymentIntentToken =async function(){
    const response = await fetch(`${getServerUrlPrefix()}/api/shop/carts/create-payment-intent`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('cartToken')}`
      }
    });
    const responseData = await response.json();
    setClientSecret(responseData.paymentIntentToken);
  };

  useEffect(()=>{
    verifyAccessToPage();
  },[]);

  useEffect(()=>{
    getPaymentIntentToken();
  },[]);

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
        <CartSummary isCheckoutView={true} />
        <CheckoutForm />
      </Elements>
    )
  }else{
    return(
      <div className='checkout-logged-out'>
        <h3>Please login or register to checkout your basket.</h3>
        <div className='checkout-button-wrapper'>
          <button onClick={()=>{navigate('/login')}}>Login</button>
          <button onClick={()=>{navigate('/register')}}>Register</button>
        </div>
      </div>
    );
  };
};