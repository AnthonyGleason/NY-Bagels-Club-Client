import React, {Suspense, lazy, useEffect, useRef, useState} from 'react';

//import css
import './Home.css';

import {  Cart} from '../../Interfaces/interfaces';
import { emptyCart, fetchAndHandleCart } from '../../Helpers/cart';
import HomeLoadingOverlay from './HomeLoadingOverlay/HomeLoadingOverlay';

const Sidebar = lazy(()=> import('../Sidebar/Sidebar'));
const Banner = lazy(()=> import('./Banner/Banner'));
const Hero = lazy(()=>import('./Hero/Hero'));
const StoreItems = lazy(()=>import('./StoreItems/StoreItems'));
const CustomOrders = lazy(()=>import('./CustomOrders/CustomOrders'));

export default function Home(){
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);
  const [cart,setCart] = useState<Cart>(emptyCart);
  const [isPageLoaded,setIsPageLoaded] = useState<boolean>(false);

  const isInitialLoad = useRef(true);

  useEffect(()=>{
    if (isInitialLoad.current) {
      isInitialLoad.current = false;

      const cartToken:string | null  = localStorage.getItem('cartToken');

      if (cartToken) fetchAndHandleCart(setCart);
    };
  },[isInitialLoad]);
  
  if (!isPageLoaded) return (<HomeLoadingOverlay setIsPageLoaded={setIsPageLoaded} />)

  return(
    <main
      className='home'
    >
      <Sidebar 
        cart={cart}
        isExpanded={isSidebarExpanded} 
        setIsExpanded={setIsSidebarExpanded}
        isSignedIn={isSignedIn}
        setIsSignedIn={setIsSignedIn}
      />
      <div className='home-content-wrapper' onClick={()=>{setIsSidebarExpanded(isSidebarExpanded===true ? false: false)}}>
        <Hero />
        <Banner />
        <StoreItems 
          isSignedIn={isSignedIn}
          cart={cart}
          setCart={setCart}
        />
        <CustomOrders />
      </div>
    </main>
  )
};