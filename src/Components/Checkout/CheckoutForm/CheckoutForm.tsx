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
import { emptyCart, fetchAndHandleCart, populateTaxCalculation } from "../../../Helpers/cart";
import { requestCartToken, verifyLoginToken } from "../../../Helpers/auth";

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
  const [promoCodeInput,setPromoCodeInput] = useState<string>('');
  const [isPromoApplied,setIsPromoApplied] = useState<boolean>(false);
  const [isRequestPending,setIsRequestPending] = useState<boolean>(false);
  const [discountAmount,setDiscountAmount] = useState<number>(0);
  //get promo code data on initial load
  useEffect(()=>{
    getPromoCodeData();
  },[]);
  
  const getPromoCodeData = async function(){
    const cartToken:string | null = localStorage.getItem('cartToken');
    const loginToken:string | null = localStorage.getItem('loginToken');
    try{
      //validate required fields exist
      if (!cartToken) throw new Error('There was an error retrieving the cart token. Ensure your cart exists.');
      if (!loginToken) throw new Error('There was an error retrieving the login token. Ensure you are logged in.');
      
      const response = await fetch(`${getServerUrlPrefix()}/api/shop/promoCode`,{
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginToken}`,
          'Cart-Token': `Bearer ${cartToken}`
        }
      });
      if (!response.ok) throw new Error("Failed to get promo code data for cart. A code is currently not used on the cart.");
      const responseData = await response.json();
      //set discount amount 
      setDiscountAmount(responseData.discountAmount);
      //set promo code input
      setPromoCodeInput(responseData.promoCodeName);
      //set is promo applied
      setIsPromoApplied(responseData.isPromoApplied);
    }catch(err){
      console.log(err);
    };
  };

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

  const handleRemovePromoCode = async function(){
    try{
      const cartToken:string | null = localStorage.getItem('cartToken');
      const loginToken:string | null = localStorage.getItem('loginToken');

      //validate required fields exist
      if (!cartToken) throw new Error('There was an error retrieving the cart token. Ensure your cart exists.');
      if (!loginToken) throw new Error('There was an error retrieving the login token. Ensure you are logged in.');
      
      const response = await fetch(`${getServerUrlPrefix()}/api/shop/promoCode`,{
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginToken}`,
          'Cart-Token': `Bearer ${cartToken}`
        }
      });
      const responseData = await response.json();
      if (!response.ok) throw new Error('An error occured when removing the promo code from your cart.');
      console.log(responseData);

      //set new cart token if applicable

      //calculate tax if applicable (if shipping info is present or not)
    }catch(err){
      console.log(err);
    };
  };
  
  const handleApplyPromoCode = async function(){
    try{
      if (isRequestPending) throw new Error('A request is already pending.');
      setIsRequestPending(true);
      const cartToken:string | null = localStorage.getItem('cartToken');
      const loginToken:string | null = localStorage.getItem('loginToken');

      //validate required fields exist
      if (!promoCodeInput) throw new Error('The promo code input cannot be left blank when performing this action.');
      if (!cartToken) throw new Error('There was an error retrieving the cart token. Ensure your cart exists.');
      if (!loginToken) throw new Error('There was an error retrieving the login token. Ensure you are logged in.');

      const response = await fetch(`${getServerUrlPrefix()}/api/shop/promoCode`,{
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginToken}`,
          'Cart-Token': `Bearer ${cartToken}`
        },
        body:JSON.stringify({
          promoCodeInput: promoCodeInput,
          clientSecret: clientSecret
        })
      });
      const responseData = await response.json();
      if (!response.ok) throw new Error('An error occured when applying the promo code. Is it valid?');
      //set new cart token if applicable
      setClientSecret(responseData.clientSecret);
      localStorage.setItem('cartToken',responseData.cartToken);
      setIsPromoApplied(true);
      alert(`The promo code ${promoCodeInput} was successfully applied!`)
      setIsRequestPending(false);
    }catch(err){
      console.log(err);
      setIsRequestPending(false);
    };
  };

  const updateGiftMessage = async function(giftMessage:string){
    let tempGiftMessage:string = giftMessage;
    //if the is a gift box was unchecked remove the gift message
    if (!isGiftInput) tempGiftMessage='';
    const response = await fetch(`${getServerUrlPrefix()}/api/shop/giftMessage`,{
      method: 'PUT',
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
                    <label>Leave A Gift Message (Optional)</label>
                    <textarea maxLength={400} onBlur={(e)=>{updateGiftMessage(e.target.value)}} value={giftMessageInput} onChange={(e)=>{setGiftMessageInput(e.target.value)}} />
                  </div>
                </div>
              :
                null
            }
          </div>
          <h3>Promo Code</h3>
          <div className="promo-code-wrapper">
            <input value={promoCodeInput} onChange={(e)=>{setPromoCodeInput(e.target.value.toUpperCase())}} type='text' />
            {
              isPromoApplied ===false ?
                <button type='button' onClick={()=>{handleApplyPromoCode()}}>Apply</button>
              :
                <button type='button' onClick={()=>{handleRemovePromoCode()}}>Remove</button>
            }
          </div>
          <div className="payment-form-button-container">
            <CartSummary discountAmount={discountAmount} isPromoApplied={isPromoApplied} paymentIntentToken={clientSecret} address={address} setPaymentIntentToken={setClientSecret} isCheckoutView={true} />
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