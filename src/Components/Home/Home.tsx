import React, {useEffect, useRef, useState} from 'react';

//import css
import './Home.css';
import upArrowImg from '../../Assets/icons/arrow-up-outline.svg';
import foodMenuImg from '../../Assets/icons/foodMenu.svg';
import { emptyCart, fetchAndHandleCart } from '../../Helpers/cart';
import { BagelItem, Cart, SpreadItem } from '../../Interfaces/interfaces';
import { scrollToID } from '../../Helpers/misc';
import homeDeliveryImg from '../../Assets/backgrounds/homeDelivery.webp';
import starImg from '../../Assets/icons/star-duotone.svg';
import {motion} from 'framer-motion';
import storeFrontImg from '../../Assets/storefront.webp';

import CustomOrders from './CustomOrders/CustomOrders';
import Menu from './Menu/Menu';
import Sidebar from '../Sidebar/Sidebar';
import StoreItems from './StoreItems/StoreItems';
import About from './About/About';
import HomeLoadingOverlay from './HomeLoadingOverlay/HomeLoadingOverlay';


export default function Home(){
  const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);
  const [storeItems,setStoreItems] = useState<(SpreadItem | BagelItem)[]>([]); 
  const [cart,setCart] = useState<Cart>(emptyCart);

  const isInitialLoad = useRef(true);

  useEffect(()=>{
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      const cartToken:string | null  = localStorage.getItem('cartToken');
      if (cartToken) fetchAndHandleCart(setCart);
    };
  },[isInitialLoad]);

  if (isPageLoaded===false){
    return(
      <HomeLoadingOverlay setIsPageLoaded={setIsPageLoaded} />
    )
  }else{
    return(
      <main className='home'>
        <Sidebar 
          cart={cart}
          isExpanded={isSidebarExpanded} 
          setIsExpanded={setIsSidebarExpanded}
          isSignedIn={isSignedIn}
          setIsSignedIn={setIsSignedIn}
        />
        <div className='corner-buttons'>
          <button onClick={()=>{scrollToID('our-menu')}} className='scroll-menu-button'>
            <img src={foodMenuImg} alt='scroll up' />
          </button>
          <button onClick={()=>{scrollToID('nav')}} className='scroll-up-button'>
            <img src={upArrowImg} alt='scroll up' />
          </button>
        </div>

        <div className='home-content-wrapper' onClick={()=>{setIsSidebarExpanded(isSidebarExpanded===true ? false: false)}}>
          <motion.div 
            className='home-content-row-wrapper'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{duration: 2.5}}
            viewport={{once: false}}
          >
            <div
              className='store-items-heading' 
              id='proudly-delivering'
            >
              <span className='brendels'>Now Serving Brendel's</span> 
              <span>
                In a close partnership with Brendel's Bakery & Eatery of Long Island, NY, we meticulously curate and ship a selection of gourmet New York City bagels, spreads and pastries nationwide. To meet the highest standards of freshness, our hand-rolled bagels are kettled and vacuum-sealed just two hours after leaving the oven, ensuring we seal in the perfect flavor of a delicious New York Bagel.
              </span>
              <button
                className='view-our-menu' 
                onClick={()=>{scrollToID('our-menu')}}
              >
                View Our Menu
              </button>
            </div>
            <img src={storeFrontImg} alt='brendels store front' className='store-front-img'  />
          </motion.div>
          <motion.section
            className='banner'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{duration: 2}}
            viewport={{once: false}}
          >
            <div 
              className='limited-offer-wrapper'
            >
              <h3>
                <img src={starImg} alt='star'  />
                <span>
                  Free Priority Shipping!
                </span>
                <img src={starImg} alt='star'  />
              </h3>
              <p >
                Enjoy <u>FAST and FREE</u> Priority Mail Shipping nationwide with every order!
                This offer includes shipping to Alaska, Guam, Hawaii, Virgin Islands and Puerto Rico!
              </p>
            </div>
            <img className='home-delivery' src={homeDeliveryImg} alt='home delivery'  />
          </motion.section>
          <About />
          <motion.h3 
            id='join-the-club'
            className='store-items-heading'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{duration: 2.5}}
            viewport={{once: false}}
          >
            <span>
              Subscriptions Coming Soon!
            </span>
            <span
              className='our-menu-subscription'
            >
              No Account or Subscription Required to Order
            </span>
          </motion.h3>
          <section className='club-perks'>
            <div className='club-tiers'>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{duration: 2.5}}
                viewport={{once: false}}
                className='gold'
              >
                <h3 >
                  <span>Gold Member</span>
                  <span>$39.95 / Month</span>
                </h3>
                <ul>
                  <li>
                    Enjoy a monthly treat of a Baker's Dozen for yourself or a friend.
                  </li>
                  <li>Personalize your delivery with your choice of 6 delicious flavors.</li>
                  <li>A 1/2 LB spread included with the fulfillment of monthly subscription orders.</li>
                  <li>Priority mail shipping included with each monthly subscription order.</li>
                  <li>5% off Non-Member Pricing.</li>
                  <p className='club-value'><strong><span>Gain an Exceptional 34% Value!</span></strong></p>
                  <button className='home-subscribe-now' type='button' onClick={()=>{
                    //navigate('/subscribe')
                  }}>
                    Coming Soon!
                  </button>
                </ul>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{duration: 2.5}}
                viewport={{once: false}}
                className='platinum'
              >
                <h3>
                  <span>Platinum Member</span>
                  <span>$79.95 / Month</span>
                </h3>
                <ul>
                  <li>Enjoy two monthly deliveries of a Baker's Dozen for yourself or a friend.</li>
                  <li>Personalize your delivery with your choice of 6 delicious flavors.</li>
                  <li>A 1/2 LB spread included with the fulfillment of monthly subscription orders.</li>
                  <li>Priority mail shipping included with each monthly subscription order.</li>
                  <li>10% off Non-Member Pricing.</li>
                  <p className='club-value'><strong><span>Gain an Outstanding 40% Value!</span></strong></p>
                  <button className='home-subscribe-now' type='button' onClick={()=>{
                    //navigate('/subscribe')
                  }}>
                    Coming Soon!
                  </button>
                </ul>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{duration: 2.5}}
                viewport={{once: false}}
                className='diamond'
              >
                <h3>
                  <span>Diamond Member</span>
                  <span>$159.95 / Month</span>
                </h3>
                <ul>
                  <li>Enjoy four monthly deliveries of a Baker's Dozen for yourself or a friend.</li>
                  <li>Personalize your delivery with your choice of 6 delicious flavors.</li>
                  <li>A 1/2 LB spread included with the fulfillment of monthly subscription orders.</li>
                  <li>Priority mail shipping included with each monthly subscription order.</li>
                  <li>15% off Non-Member Pricing</li>
                  <li>Skip the wait, receive a direct line to our priority customer service team!</li>
                  <p className='club-value'><strong><span>Gain An Unparalleled 44% Value!</span></strong></p>
                </ul>
                <button className='home-subscribe-now' type='button' onClick={()=>{
                  //navigate('/subscribe')
                }}>
                  Coming Soon!
                </button>
              </motion.div>
            </div>
          </section>  
          <Menu storeItems={storeItems} />
          <h3 
            className='store-items-heading'
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{duration: 2.5}}
              viewport={{once: false}}
            >
              A Taste of New York to Your Doorstep
            </motion.span>
          </h3>
          <StoreItems 
            isSignedIn={isSignedIn}
            cart={cart}
            setCart={setCart}
            storeItems = {storeItems}
            setStoreItems = {setStoreItems}
          />
          <motion.h3 
            id='custom-orders-header' 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{duration: 1}}
            viewport={{once: false}}
            className='store-items-heading'
          >
            Create Your Dream Gourmet Bagel
          </motion.h3>
          <CustomOrders />
        </div>
      </main>
    )
  }
};