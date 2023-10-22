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
import Aos from 'aos';
import "aos/dist/aos.css";
import { emptyCart, fetchAndHandleCart } from '../../Helpers/cart';
import { BagelItem, Cart, SpreadItem } from '../../Interfaces/interfaces';
import Menu from './Menu/Menu';
import { scrollToID } from '../../Helpers/misc';
import homeDeliveryImg from '../../Assets/backgrounds/homeDelivery.jpg';
import starImg from '../../Assets/icons/star-duotone.svg';
import { useNavigate } from 'react-router-dom';

export default function Home(){
  const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);
  const [storeItems,setStoreItems] = useState<(SpreadItem | BagelItem)[]>([]); 
  const [cart,setCart] = useState<Cart>(emptyCart);

  //handle initial page load
  useEffect(()=>{
    fetchAndHandleCart(setCart);
    //setup fade animation length
    Aos.init({duration: 2500});
  },[]);

  const navigate = useNavigate();
  
  if (!isPageLoaded){
    return(
      <HomeLoadingOverlay setIsPageLoaded={setIsPageLoaded} />
    );
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
            <img src={foodMenuImg} alt='scroll up'/>
          </button>
          <button onClick={()=>{scrollToID('nav')}} className='scroll-up-button'>
            <img src={upArrowImg} alt='scroll up'/>
          </button>
        </div>
        <div className='home-content-wrapper' onClick={()=>{setIsSidebarExpanded(isSidebarExpanded===true ? false: false)}}>
          <section data-aos='fade-in' className='banner'>
            <h3><img src={starImg} alt='star' /> <u>Limited Time Offer!</u> <img src={starImg} alt='star' /></h3>
            <h4>Enjoy FREE Shipping on All Orders!</h4>
            <img src={homeDeliveryImg} alt='home delivery' />
          </section>
          <h3 className='store-items-heading'>
            Proudly Delivering 
            <br />
            <span className='brendels'>Brendel's Bagels</span> 
            <br />
            Nationwide
          </h3>
          <About />
          <h3 data-aos='fade-in' className='store-items-heading'>
            Club Perks
          </h3>
          <section className='club-perks'>
            <div className='club-tiers'>
              <div data-aos='fade-in' className='gold'>
                <h3 >
                  Gold Member
                  <br />
                  <br />
                  $299.95 Billed Annually
                </h3>
                <ul>
                  <li>12 Deliveries of 1 Dozen Bagels for Yourself or a Friend.</li>
                  <li>5% off Non-Member Pricing.</li>
                  <li className='club-value'><strong>A $586 Value!</strong>¹</li>
                </ul>
              </div>
              <div data-aos='fade-in' className='platinum'>
                <h3>
                  Platinum Member
                  <br />
                  <br />
                  $599.95 Billed Annually
                </h3>
                <ul>
                  <li>26 Deliveries of 1 Dozen Bagels for Yourself or a Friend.</li>
                  <li>10% off Non-Member Pricing.</li>
                  <li className='club-value'><strong>A $1224.15 Value!</strong>²</li>
                </ul>
              </div>
              <div data-aos='fade-in' className='diamond'>
                <h3>
                  Diamond Member
                  <br />
                  <br />
                  $1199.95 Billed Annually
                </h3>
                <ul>
                  <li>52 Deliveries of 1 Dozen Bagels for Yourself or a Friend.</li>
                  <li>15% off Non-Member Pricing.</li>
                  <li>Direct Line to Our Priority Customer Support Team</li>
                  <li className='club-value'><strong>A $2375 Value!</strong>³</li>
                </ul>
              </div>
            </div>
            <div className='club-perks-footnotes'>
              <ul>
                <li data-aos='fade-in' className='gold'>¹ Value is calculated by 12 deliveries of a dozen bagels each valued at $34.95. We also assume the customer purchases an additional 5 dozens at 5% savings.</li>
                <li data-aos='fade-in' className='platinum'>² Value is calculated by 26 deliveries of a dozen bagels each valued at $34.95. We also assume the customer purchases an additional 10 dozens at 10% savings.</li>
                <li data-aos='fade-in' className='diamond'>³ Value is calculated by 52 deliveries of a dozen bagels each valued at $34.95. We also assume the customer purchases an additional 15 dozens at 15% savings.</li>
              </ul>
            </div>
            <button className='home-subscribe-now' type='button' onClick={()=>{navigate('/subscribe')}}>Subscribe Now!</button>
          </section>
          <Menu storeItems={storeItems} />
          <h3 data-aos='fade-in' className='store-items-heading'>
            A Taste of New York
            <br />
            to Your Doorstep
          </h3>
          <StoreItems 
            isSignedIn={isSignedIn}
            cart={cart}
            setCart={setCart}
            storeItems = {storeItems}
            setStoreItems = {setStoreItems}
          />
        </div>
      </main>
    );
  };
};