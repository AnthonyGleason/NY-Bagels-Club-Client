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
          <About />
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