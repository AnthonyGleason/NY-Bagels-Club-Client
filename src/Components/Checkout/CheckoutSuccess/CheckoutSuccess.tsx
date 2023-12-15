import React, { useEffect, useRef, useState } from 'react';
import './CheckoutSuccess.css';
import {Cart, Order} from '../../../Interfaces/interfaces';
import Sidebar from '../../Sidebar/Sidebar';
import { emptyCart } from '../../../Helpers/cart';
import loadingImg from '../../../Assets/icons/bubble-loading.svg';
import { verifyLoginToken } from '../../../Helpers/auth';
import { getServerUrlPrefix } from '../../../Config/clientSettings';
import { useNavigate, useParams } from 'react-router-dom';

export default function CheckoutSuccess(){
  const [order,setOrder] = useState<Order | null>(null);
  const [isSignedIn,setIsSignedIn] = useState<boolean>(false);
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);
  const [failFlag,setFailFlag] = useState<boolean>(false);

  const navigate = useNavigate();
  const params = useParams();
  const pendingOrderDocID:string | undefined = params.pendingOrderDocID;
  const verifyIsLoggedIn = async function(){
    setIsSignedIn(await verifyLoginToken());
  };

  const fetchPlacedOrder = async function(setOrder:Function){
    if (!pendingOrderDocID) return;
    const response = await fetch(`${getServerUrlPrefix()}/api/shop/orders/checkout/fetchPlacedOrder/${pendingOrderDocID.toString()}`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('loginToken')}`,
      }
    });
    const responseData = await response.json();
    if (responseData.orderData){
      setOrder(responseData.orderData);
    }else{
      setFailFlag(true);
    };
  };

  const isInitialLoad = useRef(true);

  useEffect(()=>{
    if (isInitialLoad.current){
      isInitialLoad.current=false;
      //clear the users cart on load
      localStorage.removeItem('cartToken');
      localStorage.removeItem('clubCartToken');
      //verify the user is logged in
      verifyIsLoggedIn();
      //NOW WE NEED TO SPLIT THE PAYMENT INTENT SECRET SERVERSIDE
      if (!order) fetchPlacedOrder(setOrder);
    }
  },[isInitialLoad]);

  useEffect(() => {
    // Page is loading
    let timeoutId:any;
  
    if (!order && isSignedIn) {
      timeoutId = setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  
    return () => {
      // Cleanup: Clear the timeout when the component unmounts or when the dependency values change
      clearTimeout(timeoutId);
    };
  }, [order, isSignedIn]);
  

  if (!isSignedIn){
    return(
      <>
        <Sidebar 
          cart={emptyCart}
          isExpanded={isSidebarExpanded} 
          setIsExpanded={setIsSidebarExpanded}
          isSignedIn={isSignedIn}
          setIsSignedIn={setIsSignedIn}
        />
        <div className='checkout-success-logged-out'>
          You are not logged in and may not view the content of this page.
        </div>
      </>
    )
  } else if (failFlag){
    //order retrieval failed
    return(
      <div>
        If you are seeing this message it means that an error has occured when processing your order. Usually this occurs because of a card decline or connection issue but in the rare event you were charged and do not see your order please contact our customer support and we will review your account for you.
      </div>
    )
  }else if (!order && isSignedIn){
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
          <img src={loadingImg} alt='loading' />
        </div>
      </>
    )
  }else if (order){
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
              <h3>#{order._id}</h3>
            </div>
            <p>Thank you for choosing New York Bagels Club for your purchase. If you have any questions or need assistance with your order, please don't hesitate to reach out. We look forward to delivering your order with care and ensuring your satisfaction. Welcome to the New York Bagels Club family!</p>
            <p>To track the status of your order please visit the "My Orders" page.</p>
            <button className='my-orders' onClick={()=>{navigate('/accounts/orders')}}>My Orders</button>
          </div>
        </div>

      </>
    )
  }else{
    return(
      <div>
        If you are seeing this message it means that an error has occured when processing your order. Usually this occurs because of a card decline or connection issue but in the rare event you were charged and do not see your order please contact our customer support and we will review your account for you.
      </div>
    )
  }
}