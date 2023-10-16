import React, { useEffect, useState } from 'react';
import './SubscriptionPage.css';
import { useNavigate } from 'react-router-dom';
import { verifyLoginToken } from '../../../Helpers/auth';
import Sidebar from '../../Home/Sidebar/Sidebar';
import { emptyCart, fetchAndHandleCart } from '../../../Helpers/cart';
import { Cart } from '../../../Interfaces/interfaces';

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
  
  const verifyAccessToPage = async function(){
    setIsLoginValid(await verifyLoginToken());
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

  useEffect(()=>{
    //verify access to page
    verifyAccessToPage();
    fetchAndHandleCart(setCart);
  },[]);
  
  if (isLoginValid){
    return(
      <>
        <Sidebar 
          cart={cart}
          isExpanded={isSidebarExpanded} 
          setIsExpanded={setIsSidebarExpanded}
          isSignedIn={isLoginValid}
          setIsSignedIn={setIsLoginValid}
        />
        <section className='pricing-table' onClick={()=>{setIsSidebarExpanded(isSidebarExpanded===true ? false: false)}}>
          <stripe-pricing-table
            pricing-table-id="prctbl_1NwrH1J42zMuNqyLurtliui8"
            publishable-key="pk_test_51MkbRQJ42zMuNqyLhOP6Aluvz4TVAxVFFeofdem3PAvRDUoRzwYxfm0tBeOKYhdCNhbIzSSKeVFdrp7IvVku60Yz001xBUoHhk" 
          />
        </section>
      </>
    )
  }else{
    return(
      <div className='checkout-logged-out'>
        <h3>Please login or register to join the club.</h3>
        <div className='checkout-button-wrapper'>
          <button onClick={()=>{navigate('/login')}}>Login</button>
          <button onClick={()=>{navigate('/register')}}>Register</button>
        </div>
      </div>
    );
  };
};