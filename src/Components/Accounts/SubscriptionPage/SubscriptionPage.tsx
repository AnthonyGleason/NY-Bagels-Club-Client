import React, { useEffect, useRef, useState } from 'react';
import './SubscriptionPage.css';
import { useNavigate } from 'react-router-dom';
import { verifyLoginToken } from '../../../Helpers/auth';
import Sidebar from '../../Sidebar/Sidebar';
import { emptyCart, fetchAndHandleCart } from '../../../Helpers/cart';
import { Cart } from '../../../Interfaces/interfaces';
import { getServerUrlPrefix } from '../../../Config/clientSettings';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
};

export default function SubscriptionPage(){
  const navigate = useNavigate();
  const [isLoginValid,setIsLoginValid] = useState<boolean>(false);
  const [userID,setUserID] = useState<string>(''); 

  const verifyAccessToPage = async function(){
    setIsLoginValid(await verifyLoginToken(undefined,undefined,setUserID));
  };
  
  useEffect(() => {

    // Create a script element
    const script = document.createElement('script');

    // Set the source attribute to the URL of the external script
    script.src = 'https://js.stripe.com/v3/pricing-table.js';

    // Append the script element to the document's head
    document.head.appendChild(script);
    
    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []); // Empty dependency array ensures this effect runs once when the component mounts
  
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);
  const [cart,setCart] = useState<Cart>(emptyCart);
  const [pricingTableID,setPricingTableID] = useState<string>('');
  const [publishableKey,setPublishableKey] = useState<string>('');

  const fetchPricingTableKeys = async function(setPublishableKey:Function,setPricingTableID:Function){
    const response = await fetch(`${getServerUrlPrefix()}/api/memberships/pricingTableKeys`,{
      method: 'GET'
    });
    const responseData = await response.json();
    setPublishableKey(responseData.publishableKey);
    setPricingTableID(responseData.pricingTableID);
  };

  const isInitialLoad = useRef(true);

  useEffect(()=>{
    if (isInitialLoad.current===true){
      isInitialLoad.current=false;
      fetchAndHandleCart(setCart);
      //get pricing table info
      fetchPricingTableKeys(setPublishableKey,setPricingTableID);
    };
  },[isInitialLoad]);
  
  useEffect(()=>{
    //verify access to page
    verifyAccessToPage();
  },[]);

  if (isLoginValid && userID && userID.length!==0 && userID!=='undefined'){
    return(
      <>
        <Sidebar 
          cart={cart}
          isExpanded={isSidebarExpanded} 
          setIsExpanded={setIsSidebarExpanded}
          isSignedIn={isLoginValid}
          setIsSignedIn={setIsLoginValid}
        />
        {
          publishableKey && pricingTableID
            ?
            <section className='pricing-table' onClick={()=>{setIsSidebarExpanded(isSidebarExpanded===true ? false: false)}}>
            <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
            <stripe-pricing-table 
              pricing-table-id={pricingTableID}
              publishable-key={publishableKey}
              client-reference-id={userID}
            />
          </section>
          :
          null

        }
      </>
    )
  }else{
    return(
      <>
        <Sidebar 
          cart={cart}
          isExpanded={isSidebarExpanded} 
          setIsExpanded={setIsSidebarExpanded}
          isSignedIn={isLoginValid}
          setIsSignedIn={setIsLoginValid}
        />
        <div className='checkout-logged-out'>
          <h3>Please login or register to join the club.</h3>
          <div className='checkout-button-wrapper'>
            <button onClick={()=>{navigate('/login')}}>Login</button>
            <button onClick={()=>{navigate('/register')}}>Register</button>
          </div>
        </div>
      </>
    );
  };
};