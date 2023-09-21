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
        'Authorization': `Bearer ${localStorage.getItem('loginToken')}`
      }
    });
    const responseData = await response.json();
    return responseData.isValid;
  };

  const requestCartToken = async function(){
    const response = await fetch(`${getServerUrlPrefix()}/api/shop/carts`,{
      method: 'POST',
    });
    const responseData = await response.json();
    //update cart state
    setCart(responseData.cart);
    //return the cart session token
    return responseData.cartToken;
  };

  const handleInitialPageLoad = async function(){
    //get the token from localstorage if it exists
    const token:string | null = localStorage.getItem('cartToken');
    //token exists and is valid
    if (token && await verifyCartToken()) return;
    //otherwise request a new cart session and save the cart token to localStorage
    localStorage.setItem('cartToken', await requestCartToken()); 
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