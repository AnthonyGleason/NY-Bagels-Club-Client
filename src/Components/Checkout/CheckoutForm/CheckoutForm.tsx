import React, { useEffect, useState } from "react";

import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
  AddressElement
} from "@stripe/react-stripe-js";
import { CHECKOUT_SUCCESS_REDIRECT_URL, getServerUrlPrefix } from "../../../Config/clientSettings";
import { Address } from "../../../Interfaces/interfaces";
import CartSummary from "../CartSummary/CartSummary";

export default function CheckoutForm({
  clientSecret,
  setClientSecret
}:{
  clientSecret:string
  setClientSecret:Function
}) {
  const stripe = useStripe();
  const elements = useElements();

  //gift inputs
  const [isGiftInput, setIsGiftInput] = useState<boolean>(false);
  const [giftMessageInput, setGiftMessageInput] = useState<string>('');
  const [address,setAddress] = useState<Address>({
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'US'
  });

  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) return;

    //retrieve current payment intent information after server updates with tax information
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
        return_url: CHECKOUT_SUCCESS_REDIRECT_URL,
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
    mode: "shipping"
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e:any) => { setEmail(e.value.email)}}
      />
      <h3>Shipping Information</h3>
      <AddressElement onChange={(e)=>{setAddress(e.value.address)}} options={addressElementOptions} />
      <h3>Payment Information</h3>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <h3>Is this order a gift?</h3>
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
                <label>Message:</label>
                <textarea value={giftMessageInput} onChange={(e)=>{setGiftMessageInput(e.target.value)}} />
              </div>
            </div>
          :
            null
        }
      </div>
      <div>
        <CartSummary paymentIntentToken={clientSecret} address={address} setPaymentIntentToken={setClientSecret} isCheckoutView={true} />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </div>
    </form>
  );
};