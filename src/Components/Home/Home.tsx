import React, {useEffect, useState} from 'react';
//import components
import Sidebar from './Sidebar/Sidebar';
import StoreItems from './StoreItems/StoreItems';
import About from './About/About';
import HomeLoadingOverlay from './HomeLoadingOverlay/HomeLoadingOverlay';
//import css
import './Home.css';
import upArrowImg from '../../Assets/icons/arrow-up-outline.svg';
import foodMenuImg from '../../Assets/icons/foodMenu.svg';
import { emptyCart, fetchAndHandleCart } from '../../Helpers/cart';
import { BagelItem, Cart, SpreadItem } from '../../Interfaces/interfaces';
import Menu from './Menu/Menu';
import { scrollToID } from '../../Helpers/misc';
import homeDeliveryImg from '../../Assets/backgrounds/homeDelivery.jpg';
import starImg from '../../Assets/icons/star-duotone.svg';
import { useNavigate } from 'react-router-dom';
import CustomOrders from './CustomOrders/CustomOrders';
import {motion} from 'framer-motion';

export default function Home(){
  const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);
  const [storeItems,setStoreItems] = useState<(SpreadItem | BagelItem)[]>([]); 
  const [cart,setCart] = useState<Cart>(emptyCart);

  const navigate = useNavigate();
  
  //fetch cart data on load 
  //This fixes a bug where if a user signs into an account after adding things to their cart when they are redirected to the home screen their cart doesnt load till something is added.
  useEffect(()=>{
    const cartToken:string | null  = localStorage.getItem('cartToken');
    if (cartToken) fetchAndHandleCart(setCart);
  },[]);

  return(
    <>
      {
        isPageLoaded ?
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
            <img src={foodMenuImg} alt='scroll up'/>
          </button>
          <button onClick={()=>{scrollToID('nav')}} className='scroll-up-button'>
            <img src={upArrowImg} alt='scroll up'/>
          </button>
        </div>
        <div className='home-content-wrapper' onClick={()=>{setIsSidebarExpanded(isSidebarExpanded===true ? false: false)}}>
          <div className='home-content-row-wrapper'>
            <section
              className='banner'
            >
              <div 
                className='limited-offer-wrapper'
                >
                <h3>
                  <img src={starImg} alt='star' />
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{duration: 2.5}}
                    viewport={{once: false}}>Limited Time Offer!
                  </motion.span>
                  <img src={starImg} alt='star' />
                </h3>
                <motion.h4 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{duration: 2.5}}
                  viewport={{once: false}}
                >
                  Enjoy FREE Shipping on ALL Orders!
                  <br />
                  <br />
                  This offer includes shipping to Alaska, Guam, Hawaii, Virgin Islands and Puerto Rico!
                </motion.h4>
              </div>
              <img className='home-delivery' src={homeDeliveryImg} alt='home delivery' />
            </section>
            <h3 
              className='store-items-heading' 
              id='proudly-delivering'
              onClick={()=>{window.location.href='https://www.brendelsbagels.com/'}}
            >
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{duration: 2.5}}
                viewport={{once: false}}
              >
                Proudly Delivering
              </motion.span>
              <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{duration: 2.5}}
              viewport={{once: false}}
              className='brendels'
              >
                Brendel's Bagels
              </motion.span> 
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{duration: 2.5}}
                viewport={{once: false}}
              >
                Nationwide
              </motion.span>
            </h3>
          </div>
          <About />
          <h3 
            id='join-the-club'
            className='store-items-heading'
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{duration: 2.5}}
              viewport={{once: false}}
            >
              Join The Club
            </motion.span>
          </h3>
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
                  <span>$44.95 / Month</span>
                </h3>
                <ul>
                  <li>
                    Enjoy a monthly treat of a <strong>Baker's Dozen (13 Bagels)</strong> for yourself or a friend.
                  </li>
                  <li>Personalize your delivery with <strong>your choice of 6 delicious flavors</strong>, and the <strong>13th bagel is <span className='brendels'>Brendel's</span> "Baker's Choice" selection</strong>.</li>
                  <li>As an added <strong>bonus</strong>, we'll include a <strong>1/2 LB <span className='brendels'>Brendel's</span> Gourmet Spread of your choice in every box!</strong></li>
                  <li><strong>5% off </strong> Non-Member Pricing.</li>
                  <li><strong>PRIORITY</strong> Mail Shipping on <strong>EVERY</strong> order placed.</li>
                  <li className='club-value'><strong><span>Gain an Exceptional 34% Value!</span></strong></li>
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
                  <span>$89.95 / Month</span>
                </h3>
                <ul>
                  <li>
                    Enjoy <strong>TWO</strong> monthly treats of a <strong>Baker's Dozen (13 Bagels)</strong> for yourself or a friend.
                  </li>
                  <li>Personalize your deliveries with <strong>your choice of 6 delicious flavors</strong>, and the <strong>13th bagel is our <span className='brendels'>Brendel's</span> "Baker's Choice" selection</strong>.</li>
                  <li>As an added <strong>bonus</strong>, we'll include a <strong>1/2 LB <span className='brendels'>Brendel's</span> Gourmet Spread of your choice in every box!</strong></li>
                  <li><strong>10% off </strong> Non-Member Pricing.</li>
                  <li><strong>PRIORITY</strong> Mail Shipping on <strong>EVERY</strong> order placed.</li>
                  <li className='club-value'><strong><span>Gain an Outstanding 40% Value!</span></strong></li>
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
                  <span>$179.95 / Month</span>
                </h3>
                <ul>
                  <li>
                    Enjoy <strong>FOUR</strong> monthly treats of a <strong>Baker's Dozen (13 Bagels)</strong> for yourself or a friend.
                  </li>
                  <li>Personalize your deliveries with <strong>your choice of 6 delicious flavors</strong>, and the <strong>13th bagel is <span className='brendels'>Brendel's</span> "Baker's Choice" selection</strong>.</li>
                  <li>As an added <strong>bonus</strong>, we'll include a <strong>1/2 LB <span className='brendels'>Brendel's</span> Gourmet Spread of your choice in every box!</strong></li>
                  <li><strong>15% off </strong> Non-Member Pricing.</li>
                  <li><strong>PRIORITY</strong> Mail Shipping on <strong>EVERY</strong> order placed.</li>
                  <li>Skip the wait, recieve a direct line to our priority customer service team!</li>
                  <li className='club-value'><strong><span>Gain An Unparalleled 44% Value!</span></strong></li>
                </ul>
              </motion.div>
            </div>
            {/* <div className='club-perks-footnotes'>
              <ul>
                <li data-aos='fade-in' className='gold'>¹ Value is calculated for a monthly subscription with a dozen bagels valued at $44.95 and a 1/2 lb gourmet spread valued at $9. We also assume the customer purchases an additional dozen at 5% savings.</li>
                <li data-aos='fade-in' className='platinum'>² Value is calculated for a year subscription based on 24 deliveries of a baker's dozen bagels each valued at $44.95. We also assume the customer purchases an additional 10 dozens at 10% savings.</li>
                <li data-aos='fade-in' className='diamond'>³ Value is calculated for a year subscription based on 48 deliveries of a baker's dozen bagels each valued at $44.95. We also assume the customer purchases an additional 15 dozens at 15% savings.</li>
              </ul>
            </div> */}
            <button className='home-subscribe-now' type='button' onClick={()=>{
              //navigate('/subscribe')
            }}>
              Club Memberships
              <br />
              Coming Soon!
            </button>
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
                A Taste of New York
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{duration: 2.5}}
                viewport={{once: false}}
              >
                to Your Doorstep
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
            transition={{duration: 2.5}}
            viewport={{once: false}}
            className='store-items-heading'
          >
            Create Your Dream Gourmet Bagel
          </motion.h3>
          <CustomOrders />
          </div>
        </main>
      :
        <HomeLoadingOverlay setIsPageLoaded={setIsPageLoaded} />
      }
    </>
  )
};