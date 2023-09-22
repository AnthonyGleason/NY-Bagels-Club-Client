import React, {useEffect, useState} from 'react';
import Sidebar from './Sidebar/Sidebar';
import './Home.css';
import StoreItems from './StoreItems/StoreItems';
import InitLoad from './InitLoad/InitLoad';
import About from './About/About';
import { getServerUrlPrefix } from '../../Config/clientSettings';
import { Item} from '../../Interfaces/interfaces';

export default function Home(){
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);
  const [cart,setCart] = useState<Item[]>([]);

  const verifyCartToken = async function(){
    const response = await fetch(`${getServerUrlPrefix()}/api/shop/carts/verify`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('cartToken')}`
      }
    });
    const responseData = await response.json();
    if (responseData.isValid){
      setCart(responseData.cart.items);
      return responseData.isValid;
    }
  };

  const requestCartToken = async function(){
    const response = await fetch(`${getServerUrlPrefix()}/api/shop/carts`,{
      method: 'POST',
    });
    const responseData = await response.json();
    if (responseData.cartToken){
      //return the cart session token
      return responseData.cartToken;  
    }
  };

  const handleInitialPageLoad = async function(){
    //token exists and is valid
    if (localStorage.getItem('cartToken') && await verifyCartToken()) return;
    //otherwise request a new cart session and save the cart token to localStorage
    const token:string = await requestCartToken();
    if (token){
      localStorage.setItem('cartToken',token); 
    }
  };

  //handle initial page load
  useEffect(()=>{
    handleInitialPageLoad();
  },[]);
  
  if (isLoaded){
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
  }else{
    return(
      <InitLoad setIsLoaded={setIsLoaded} />
    );
  };
}