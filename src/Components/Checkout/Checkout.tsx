import React, { useEffect, useState } from 'react';
import { verifyLoginToken } from '../../Helpers/auth';
import { getServerUrlPrefix } from '../../Config/clientSettings';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CartSummary from './CartSummary/CartSummary';
import CheckoutForm from './CheckoutForm/CheckoutForm';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';
import { Address } from '../../Interfaces/interfaces';

const stripePromise = loadStripe("pk_test_51MkbRQJ42zMuNqyLhOP6Aluvz4TVAxVFFeofdem3PAvRDUoRzwYxfm0tBeOKYhdCNhbIzSSKeVFdrp7IvVku60Yz001xBUoHhk");

export default function Checkout(){
  const [isLoginValid,setIsLoginValid] = useState<boolean>(false);
  const [clientSecret,setClientSecret] = useState<string>('');
  const [address,setAddress] = useState<Address>({
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'US'
  });

  const navigate = useNavigate();

  const verifyAccessToPage = async function(){
    setIsLoginValid(await verifyLoginToken());
  };

  const getPaymentIntentToken = async function(){
    const response = await fetch(`${getServerUrlPrefix()}/api/shop/carts/create-payment-intent`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('loginToken')}`,
        'Cart-Token': `Bearer ${localStorage.getItem('cartToken')}`
      }
    });
    const responseData = await response.json();
    setClientSecret(responseData.paymentIntentToken);
  };

  useEffect(()=>{
    verifyAccessToPage();
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
        <CartSummary address={address} setPaymentIntentToken={setClientSecret} isCheckoutView={true} />
        <CheckoutForm setAddress={setAddress} />
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