import React, { useEffect, useRef, useState } from 'react';
import { Cart } from '../../../Interfaces/interfaces';
import { emptyCart, fetchAndHandleCart, requestApplyMembershipPricingToCart  } from '../../../Helpers/cart';
import './CartSummary.css';
import { verifyLoginToken } from '../../../Helpers/auth';
import Sidebar from '../../Sidebar/Sidebar';
import PreCheckoutSummary from '../PreCheckoutSummary/PreCheckoutSummary';

export default function CartSummary(){
  const [isSignedIn,setIsSignedIn] = useState<boolean>(true);
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);
  const [cart,setCart] = useState<Cart>(emptyCart);

  const isInitialLoad = useRef(true);
  //handle initial page load (grab latest cart data);
  useEffect(()=>{
    if (isInitialLoad.current){
      isInitialLoad.current=false;
      fetchAndHandleCart(setCart);
      verifyLoginToken(setIsSignedIn);
      //apply any membership discounts
      requestApplyMembershipPricingToCart(setCart);
    };
  },[]);

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
  }else{
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
          setCart = {setCart}
        />
      </>
    );
  }
};