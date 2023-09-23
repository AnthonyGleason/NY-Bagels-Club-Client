import React, {useEffect, useState} from 'react';
import { Item} from '../../Interfaces/interfaces';
import { fetchAndHandleCart } from '../../Helpers/auth';
//import components
import Sidebar from './Sidebar/Sidebar';
import StoreItems from './StoreItems/StoreItems';
import About from './About/About';
import HomeLoadingOverlay from './HomeLoadingOverlay/HomeLoadingOverlay';
//import css
import './Home.css';

export default function Home(){
  const [isPageLoaded, setIsPageLoaded] = useState<boolean>(true);
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);
  const [cart,setCart] = useState<Item[]>([]);

  //handle initial page load
  useEffect(()=>{
    fetchAndHandleCart(setCart);
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
        />
        <div className='home-content-wrapper' onClick={()=>{setIsSidebarExpanded(isSidebarExpanded===true ? false: false)}}>
          <About />
          <h3>New York to Your Doorstep</h3>
          <StoreItems cart={cart} setCart={setCart} />
        </div>
      </main>
    );
  };
}