import React, {Suspense, lazy, useEffect, useRef, useState} from 'react';

//import css
import './Home.css';

import {  Cart} from '../../Interfaces/interfaces';
import { emptyCart, fetchAndHandleCart } from '../../Helpers/cart';

const Sidebar = lazy(()=> import('../Sidebar/Sidebar'));
const Banner = lazy(()=> import('./Banner/Banner'));
const About = lazy(()=> import('./About/About'));
const ClubPerks = lazy(()=>import('./ClubPerks/ClubPerks'));
const Hero = lazy(()=>import('./Hero/Hero'));
const StoreItems = lazy(()=>import('./StoreItems/StoreItems'));
const CustomOrders = lazy(()=>import('./CustomOrders/CustomOrders'));

export default function Home(){
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);
  const [cart,setCart] = useState<Cart>(emptyCart);

  const isInitialLoad = useRef(true);

  useEffect(()=>{
    if (isInitialLoad.current) {
      isInitialLoad.current = false;

      const cartToken:string | null  = localStorage.getItem('cartToken');

      if (cartToken) fetchAndHandleCart(setCart);
    };
  },[isInitialLoad]);

  return(
    <Suspense>
      <main className='home'>
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
            <About />
            {/* <Menu 
              bagelItems = {bagelItems}
              pastryItems = {pastryItems} 
            /> */}
            <StoreItems 
              isSignedIn={isSignedIn}
              cart={cart}
              setCart={setCart}
            />
            <CustomOrders />
            <ClubPerks />
          </div>
      </main>
    </Suspense>
  )
};