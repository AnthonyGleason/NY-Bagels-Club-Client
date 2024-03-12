import React, {Suspense, lazy, useEffect, useRef, useState} from 'react';

//import css
import './Home.css';

import {  Cart} from '../../Interfaces/interfaces';
import { emptyCart, fetchAndHandleCart } from '../../Helpers/cart';
import HomeLoadingOverlay from './HomeLoadingOverlay/HomeLoadingOverlay';

import aboutDesktopImg from '../../Assets/backgrounds/about.webp';
import homeIntroAltImg from '../../Assets/backgrounds/nyc-brooklyn-bridge.jpg';
import homeIntroImg from '../../Assets/backgrounds/montauk-lighthouse.jpg';

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
        <img className='home-intro-alt-img' src={homeIntroAltImg} alt='brooklyn bridge' decoding='async' loading='lazy' />
        <Banner />
        <img className='home-intro-img' src={homeIntroImg} alt='lighthouse in montauk' decoding='async' loading='lazy' />
        {/* <img className='home-intro-img' decoding='async' loading='lazy' src={window.innerWidth <= 450 ? './Assets/about-mobile.webp' : aboutDesktopImg} alt='delicious gourmet new york city bagels' /> */}
        {/* <About /> */}
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
        {/* <ClubPerks /> */}
      </div>
    </main>
  )
};