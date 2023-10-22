import React, { useEffect, useState } from 'react';
import { Address, Cart } from '../../../Interfaces/interfaces';
import { emptyCart, fetchAndHandleCart, populateTaxCalculation, requestApplyMembershipPricingToCart  } from '../../../Helpers/cart';
import './CartSummary.css';
import { useNavigate } from 'react-router-dom';
import { verifyLoginToken } from '../../../Helpers/auth';
import Sidebar from '../../Home/Sidebar/Sidebar';
import CartSummaryItem from '../CartSummaryItem/CartSummaryItem';
import PreCheckoutSummary from '../PreCheckoutSummary/PreCheckoutSummary';

export default function CartSummary({
  isCheckoutView,
  address,
  paymentIntentToken,
  setPaymentIntentToken,
  isPromoApplied,
  discountAmount
}:{
  isCheckoutView:boolean,
  isPromoApplied?:boolean,
  paymentIntentToken?:string,
  address?:Address,
  setPaymentIntentToken?:Function,
  discountAmount?:number
}){
  const navigate = useNavigate();

  const [isSignedIn,setIsSignedIn] = useState<boolean>(true);
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);
  const [cart,setCart] = useState<Cart>(emptyCart);
  const [cartTotalPrice,setCartTotalPrice] = useState<number>(0);
  const [taxPrice,setTaxPrice] = useState<number>(0);

  //handle initial page load (grab latest cart data);
  useEffect(()=>{
    fetchAndHandleCart(setCart);
    verifyLoginToken(setIsSignedIn);
    //apply any membership discounts
    requestApplyMembershipPricingToCart(setCart);
  },[]);

  useEffect(()=>{
    //apply any membership discounts (or remove them)
    requestApplyMembershipPricingToCart(setCart);
  },[isSignedIn]);

  useEffect(()=>{
    fetchAndHandleCart(setCart);
    verifyLoginToken(setIsSignedIn);
  },[isPromoApplied]);

  //when the cart is updated, update the total price of all items in the cart
  useEffect(()=>{
    setCartTotalPrice(cart.finalPrice);
  },[cart])

  useEffect(()=>{
    if (
        address &&  //ensure fields are completed
        address.city && 
        address.country &&
        address.line1 &&
        address.postal_code &&
        address.state &&
        address.phone && 
        address.fullName &&
        paymentIntentToken && //ensure a token exists
        setPaymentIntentToken //allows us to dynamically update the payment intent should stripe issue the user a new one
      ) populateTaxCalculation(address,paymentIntentToken,setCartTotalPrice,setTaxPrice,setPaymentIntentToken);
  },[address, isPromoApplied]);

  //handle empty shopping cart
  if (cart.items.length===0){
    return(
      <>
        <Sidebar 
          cart={cart}
          isExpanded={isSidebarExpanded} 
          setIsExpanded={setIsSidebarExpanded}
          isSignedIn={isSignedIn}
          setIsSignedIn={setIsSignedIn}
        />
        <div className='cart-summary' onClick={()=>{setIsSidebarExpanded(isSidebarExpanded===true ? false: false)}}>
          <h3>Basket</h3>
          <strong>Your Basket is Currently Empty.</strong>
        </div>
      </>
    );
  }else if (cart.items.length>0 && !isCheckoutView){
    return(
      <>
        <Sidebar 
          cart={cart}
          isExpanded={isSidebarExpanded} 
          setIsExpanded={setIsSidebarExpanded}
          isSignedIn={isSignedIn}
          setIsSignedIn={setIsSignedIn}
        />
        <PreCheckoutSummary 
          isSidebarExpanded = {isSidebarExpanded}
          setIsSidebarExpanded={setIsSidebarExpanded}
          cart= {cart}
          isCheckoutView = {isCheckoutView}
          setCart = {setCart}
        />
      </>
    );
  }else{ //is checkout view
    return(
      <section className='cart-summary checkout-cart-summary'>
        <h3>Final Basket Summary</h3>
        <table>
          <thead>
            <tr>
              <th className="item-name">Name</th>
              <th className="item-quantity">Quantity</th>
              <th className="item-subtotal">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {
              cart.items.map((cartItem, index) => {
                return (
                  <CartSummaryItem 
                    key={index}
                    cartItem={cartItem}
                    setCart={setCart}
                    isCheckoutView={isCheckoutView}
                  />
                );
              })
            }
        </tbody>
        </table>
        <div className='cart-subtotal'>
          <span><strong><span>Basket Subtotal:</span> <span>${cart.subtotal.toFixed(2)}</span></strong></span>
          {
            discountAmount && discountAmount > 0 ?
            <span><strong><span>Promo Code Savings:</span> <span>-${discountAmount?.toFixed(2)}</span></strong></span>
            : null
          }
          <span><strong><span>Calculated Tax:</span> <span>${taxPrice.toFixed(2) || '0.00'}</span></strong></span>
          <span><strong><span>Shipping:</span> <span>Free</span></strong></span>
          <span><strong><span>Basket Total:</span> <span>${cartTotalPrice.toFixed(2)}</span></strong></span>
        </div>
      </section>
    )
  };
};