import React, { useEffect, useState } from 'react';
import { Address, Cart } from '../../../Interfaces/interfaces';
import { emptyCart, fetchAndHandleCart, getCartItems, populateTaxCalculation  } from '../../../Helpers/cart';
import './CartSummary.css';
import { getServerUrlPrefix } from '../../../Config/clientSettings';
import { useNavigate } from 'react-router-dom';
import { verifyLoginToken } from '../../../Helpers/auth';
import Sidebar from '../../Home/Sidebar/Sidebar';

export default function CartSummary({
  isCheckoutView,
  address,
  paymentIntentToken,
  setPaymentIntentToken
}:{
  isCheckoutView:boolean,
  paymentIntentToken?:string,
  address?:Address,
  setPaymentIntentToken?:Function
}){
  const navigate = useNavigate();

  const [isSignedIn,setIsSignedIn] = useState<boolean>(true);
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);
  const [cart,setCart] = useState<Cart>(emptyCart);
  const [cartSubtotalPrice,setCartSubtotalPrice] = useState<number>(0);
  const [taxPrice,setTaxPrice] = useState<number>(0);

  //handle initial page load (grab latest cart data);
  useEffect(()=>{
    fetchAndHandleCart(setCart);
    verifyLoginToken(setIsSignedIn);
  },[]);

  //when the cart is updated, update the total price of all items in the cart
  useEffect(()=>{
    setCartSubtotalPrice(cart.subtotal);
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
      ) populateTaxCalculation(address,paymentIntentToken,setCartSubtotalPrice,setTaxPrice,setPaymentIntentToken);
  },[address]) 

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
        <section className='cart-summary' onClick={()=>{setIsSidebarExpanded(isSidebarExpanded===true ? false: false)}}>
          <h3>Basket</h3>
          <table>
            <thead>
              <tr>
                <th className="item-name">Name</th>
                <th className="item-quantity">Quantity</th>
                <th className="item-subtotal">Subtotal</th>
                <th className="item-remove">Remove</th>
              </tr>
            </thead>
            <tbody>
              {getCartItems(cart.items,setCart,isCheckoutView)}
            </tbody>
          </table>
          <div className='cart-subtotal'>
            <span><strong>Basket Subtotal: ${cartSubtotalPrice.toFixed(2)}</strong></span>
          </div>
          <b className='cart-shipping-note'>Note: Shipping and taxes are calculated at checkout.</b>
          <button onClick={()=>{alert("We appreciate your interest in our delicious bagels! Although we're not officially open yet, we're still accepting orders. Feel free to contact sales@nybagelsclub.com to place any orders.")}}>Checkout</button>
          {/* <button onClick={()=>{navigate('/cart/checkout')}}>Checkout</button> */}
        </section>
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
            {getCartItems(cart.items,setCart,isCheckoutView)}
          </tbody>
        </table>
        <div className='cart-subtotal'>
          <span><strong>Basket Subtotal: ${(cartSubtotalPrice - taxPrice).toFixed(2)}</strong></span>
          <span><strong>Calculated Tax: ${taxPrice.toFixed(2) || '0.00'}</strong></span>
          <span><strong>Basket Total: ${(cartSubtotalPrice).toFixed(2)}</strong></span>
        </div>
      </section>
    )
  };
};