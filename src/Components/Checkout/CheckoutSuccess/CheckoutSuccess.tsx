import React, { useEffect, useRef, useState } from 'react';
import './CheckoutSuccess.css';
import {Cart, Order} from '../../../Interfaces/interfaces';
import Sidebar from '../../Sidebar/Sidebar';
import { emptyCart } from '../../../Helpers/cart';
import loadingImg from '../../../Assets/icons/bubble-loading.svg';
import { getServerUrlPrefix } from '../../../Config/clientSettings';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from '../../Nav/Nav';

export default function CheckoutSuccess(){
  const [orderNumber,setOrderNumber] = useState<string>('');
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);
  const [isSignedIn,setIsSignedIn] = useState<boolean>(false);
  const [isGuest,setIsGuest] = useState<boolean>(true);
  
  const navigate = useNavigate();
  const params = useParams();
  const pendingOrderDocID:string | undefined = params.pendingOrderDocID;

  const fetchPlacedOrder = async function(setOrder:Function){
    if (!pendingOrderDocID) return;
    const response = await fetch(`${getServerUrlPrefix()}/api/shop/orders/checkout/fetchPlacedOrder/${pendingOrderDocID.toString()}`,{
      method: 'GET',
    });
    const responseData = await response.json();
    if (responseData.orderNumber){
      setOrder(responseData.orderNumber);
      setIsGuest(responseData.isGuest);
    };
  };

  const isInitialLoad = useRef(true);

  useEffect(()=>{
    if (isInitialLoad.current){
      isInitialLoad.current=false;
      //clear the users cart on load
      localStorage.removeItem('cartToken');
      localStorage.removeItem('clubCartToken');
      //NOW WE NEED TO SPLIT THE PAYMENT INTENT SECRET SERVERSIDE
      if (!orderNumber) fetchPlacedOrder(setOrderNumber);
    }
  },[]);

  useEffect(() => {
    // Page is loading
    let timeoutId:any;
  
    if (!orderNumber) {
      timeoutId = setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  
    return () => {
      // Cleanup: Clear the timeout when the component unmounts or when the dependency values change
      clearTimeout(timeoutId);
    };
  }, [orderNumber]);
  

  if (!orderNumber){
    return(
      <>
        <Sidebar 
          cart={emptyCart}
          isExpanded={isSidebarExpanded} 
          setIsExpanded={setIsSidebarExpanded}
          isSignedIn={isSignedIn}
          setIsSignedIn={setIsSignedIn}
        />
        <div className='checkout-loading'>
          <p>Loading...</p>
          <img src={loadingImg} alt='loading' loading="lazy" />
        </div>
      </>
    )
  }else if (orderNumber){
    return(
      <>
        <Sidebar
          cart={emptyCart}
          isExpanded={isSidebarExpanded} 
          setIsExpanded={setIsSidebarExpanded}
          isSignedIn={isSignedIn}
          setIsSignedIn={setIsSignedIn}
        />
        <div className='checkout-success'>
          <div className='checkout-success-content'>
            <div className='checkout-success-heading-wrapper'>
              <h3>Your Order Has Been Placed!</h3>
              <h3>Order #{orderNumber}</h3>
            </div>
            <p>Thank you for choosing New York Bagels Club for your purchase. If you have any questions or need assistance with your order, please don't hesitate to reach out. We look forward to delivering your order with care and ensuring your satisfaction. Welcome to the New York Bagels Club family!</p>
            <p>
              To track the status of your order please visit the "Orders" page.
            </p>
            <button className='my-orders' onClick={()=>{navigate('/accounts/orders')}}>View Order</button>
          </div>
        </div>

      </>
    )
  }else{
    return(
      <div>
        If you are seeing this message it means that an error has occured when processing your order. (This typically is the result of a card decline). 
        If you were charged and do not see your order please contact our customer support and we will review your order.
      </div>
    )
  }
}