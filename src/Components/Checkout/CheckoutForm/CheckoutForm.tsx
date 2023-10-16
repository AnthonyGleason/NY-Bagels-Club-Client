import React, { useEffect, useState } from "react";

import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
  AddressElement
} from "@stripe/react-stripe-js";
import { Address, Cart } from "../../../Interfaces/interfaces";
import CartSummary from "../CartSummary/CartSummary";
import { useNavigate } from "react-router-dom";
import { getServerUrlPrefix } from "../../../Config/clientSettings";
import Sidebar from "../../Home/Sidebar/Sidebar";
import { emptyCart, fetchAndHandleCart } from "../../../Helpers/cart";
import { verifyLoginToken } from "../../../Helpers/auth";

export default function CheckoutForm({
  clientSecret,
  setClientSecret,
  isLoginValid,
  setIsLoginValid
}:{
  clientSecret:string,
  setClientSecret:Function,
  isLoginValid:boolean,
  setIsLoginValid:Function
}){
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();
  //gift inputs
  const [isGiftInput, setIsGiftInput] = useState<boolean>(false);
  const [giftMessageInput, setGiftMessageInput] = useState<string>('');
  const [address,setAddress] = useState<Address>({
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'US',
    phone: '',
    fullName: ''
  });

  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!stripe) {
      return;
    };

    if (!clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (paymentIntent){
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Something went wrong.");
            break;
        };
      };
    });
  }, [stripe]);

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: 'https://nybagelsclub.com/#/cart/checkout/success',
        receipt_email: email,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions :any= {
    layout: "tabs"
  };

  const addressElementOptions:any={
    mode: "shipping",
    allowedCountries: ['US'],
    fields: {
      phone: 'always'
    },
    validation:{
      phone:{
        required: 'always'
      }
    }
  };

  const updateGiftMessage = async function(giftMessage:string){
    let tempGiftMessage:string = giftMessage;
    //if the is a gift box was unchecked remove the gift message
    if (!isGiftInput) tempGiftMessage='';
    const response = await fetch(`${getServerUrlPrefix()}/api/shop/giftMessage`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('loginToken')}`,
        'Cart-Token': `Bearer ${localStorage.getItem('cartToken')}`
      },
      body:JSON.stringify({
        updatedGiftMessage: tempGiftMessage,
        clientSecret: clientSecret
      })
    });
    const responseData = await response.json();
    setClientSecret(responseData.paymentIntentToken);
  };

  //if the gift input box was ticked handle updating the field
  useEffect(()=>{
    updateGiftMessage(giftMessageInput);
  },[isGiftInput]);

  const updateAddressInfo = function(stripeAddress:any,fullName:string,phone:string){
    let tempAddress = stripeAddress;
    tempAddress.phone = phone;
    tempAddress.fullName = fullName;
    setAddress(tempAddress as Address);
  };

  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);
  const [cart,setCart] = useState<Cart>(emptyCart);

  //handle initial page load
  useEffect(()=>{
    fetchAndHandleCart(setCart);
    verifyLoginToken(setIsLoginValid);
  },[]);

  return (
    <>
      <Sidebar 
        cart={cart}
        isExpanded={isSidebarExpanded} 
        setIsExpanded={setIsSidebarExpanded}
        isSignedIn={isLoginValid}
        setIsSignedIn={setIsLoginValid}
      />
      <div className="payment-form-wrapper" onClick={()=>{setIsSidebarExpanded(isSidebarExpanded===true ? false: false)}}>
        <form id="payment-form" onSubmit={handleSubmit}>
          <LinkAuthenticationElement
            id="link-authentication-element"
            onChange={(e:any) => { setEmail(e.value.email)}}
          />
          <h3>Shipping Information</h3>
          <AddressElement onChange={(e)=>updateAddressInfo(e.value.address,e.value.name,e.value.phone || '')} options={addressElementOptions} />
          <h3>Payment Information</h3>
          <PaymentElement id="payment-element" options={paymentElementOptions} />
          <h3>Is This Order A Gift?</h3>
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
                <div className='gift-options-form'>
                  <div>
                    <label>Gift Message For Recipient</label>
                    <textarea maxLength={400} onBlur={(e)=>{updateGiftMessage(e.target.value)}} value={giftMessageInput} onChange={(e)=>{setGiftMessageInput(e.target.value)}} />
                  </div>
                </div>
              :
                null
            }
          </div>
          <div className="payment-form-button-container">
            <CartSummary paymentIntentToken={clientSecret} address={address} setPaymentIntentToken={setClientSecret} isCheckoutView={true} />
            <button disabled={isLoading || !stripe || !elements} id="submit">
              <span id="button-text">
                {isLoading ? <div className="spinner" id="spinner"></div> : "Pay Now"}
              </span>
            </button>
            <button onClick={()=>{navigate('/')}}>
              <span>
                Cancel
              </span>
            </button>
            {/* Show any error or success messages
            {message && <div id="payment-message">{message}</div>} */}
          </div>
        </form>
      </div>
    </>
  );
};