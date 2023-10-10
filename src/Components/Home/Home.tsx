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
import { fetchAndHandleCart } from '../../Helpers/cart';
import { BagelItem, Cart, SpreadItem } from '../../Interfaces/interfaces';

export default function Home(){
  const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);
  const [cart,setCart] = useState<Cart>({
    items: [],
    subtotal: 0,
    tax: 0,
    totalQuantity: 0
  });
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  //menu states
  const [isBagelsVisible, setIsBagelsVisible] = useState<boolean>(false);
  const [isSpreadsVisible,setIsSpreadsVisible] = useState<boolean>(false);
  const [storeItems,setStoreItems] = useState<(SpreadItem | BagelItem)[]>([]); 

  //hide other menu options when one option is expanded
  useEffect(()=>{
    const buttonHeadingElements:any = document.querySelectorAll('.menu-button-heading');
    if (isBagelsVisible || isSpreadsVisible && buttonHeadingElements){
      buttonHeadingElements.forEach((buttonHeadingElement:any)=>buttonHeadingElement.style.display='none');
    }else{
      buttonHeadingElements.forEach((buttonHeadingElement:any)=>buttonHeadingElement.style.display='flex');
    }
  },[isBagelsVisible,isSpreadsVisible]);

  //handle initial page load
  useEffect(()=>{
    fetchAndHandleCart(setCart);
    //setup fade animation length
    Aos.init({duration: 2500});
  },[]);

  const scrollToID = function(elementID:string){
    const element: HTMLElement | null= document.getElementById(elementID);
    if (element) element.scrollIntoView();
  };

  const getBagelMenuItems = function(){
    const bagelItems:BagelItem[] = storeItems.filter(item => item.cat === 'bagel') as BagelItem[];
    const allItems = bagelItems.map((bagelItem:BagelItem,index:number)=>{
      return(
        <div key={index}>
          <button onClick={()=>{scrollToID(`item-${bagelItem._id}`)}}>{bagelItem.name}</button>
        </div>
        )
    });
    return allItems;
  };

  const getSpreadMenuItems = function(){
    const spreadItems:SpreadItem[] = storeItems.filter(item => item.cat === 'spread') as SpreadItem[];
    const allItems = spreadItems.map((spreadItem:SpreadItem,index:number)=>{
      return(
        <div key={index}>
          <button onClick={()=>{scrollToID(`item-${spreadItem._id}`)}}>{spreadItem.name}</button>
        </div>
        )
    });
    return allItems;
  };

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
          <h3 data-aos='fade-in' id='our-menu' className='our-menu-heading'>Our Menu</h3>
          <div data-aos='fade-in' className='our-menu'>
            {
              isBagelsVisible===false ?
                <div className='menu-button-heading'>
                  <button onClick={()=>setIsBagelsVisible(true)}>
                    Bagels
                  </button>
                </div>
              :
              <div className='menu-option'>
                <div>
                  <button onClick={()=>setIsBagelsVisible(false)}>Bagels</button>
                </div>
                {
                  getBagelMenuItems()
                }
              </div>
            }
            {
              isSpreadsVisible === false ?
                <div className='menu-button-heading'>
                  <button onClick={()=>{setIsSpreadsVisible(true)}}>Brendel's Gourmet Spreads</button>
                </div>
              :
              <div className='menu-option'>
                <div>
                  <button onClick={()=>{setIsSpreadsVisible(false)}}>Brendel's Gourmet Spreads</button>
                </div>
                {
                  getSpreadMenuItems()
                }
              </div>
            }
          </div>
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