import React, { useEffect, useState } from 'react';
import { updateAdminStatus, verifyLoginToken } from '../../Helpers/auth';
import Sidebar from '../Home/Sidebar/Sidebar';
import { emptyCart, fetchAndHandleCart } from '../../Helpers/cart';
import { Cart } from '../../Interfaces/interfaces';

export default function Admin(){
  const [isAdmin,setIsAdmin] = useState<boolean>(false);

  useEffect(()=>{
    updateAdminStatus(setIsAdmin);
  },[]);

  const [isSignedIn,setIsSignedIn] = useState<boolean>(true);
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);
  const [cart,setCart] = useState<Cart>(emptyCart);

  //handle initial page load
  useEffect(()=>{
    fetchAndHandleCart(setCart);
    verifyLoginToken(setIsSignedIn);
  },[]);

  return(
    <>
      <Sidebar 
        cart={cart}
        isExpanded={isSidebarExpanded} 
        setIsExpanded={setIsSidebarExpanded}
        isSignedIn={isSignedIn}
        setIsSignedIn={setIsSignedIn}
      />
      <div onClick={()=>{setIsSidebarExpanded(isSidebarExpanded===true ? false: false)}}>
        admin panel placeholder
      </div>
    </>
  );
};