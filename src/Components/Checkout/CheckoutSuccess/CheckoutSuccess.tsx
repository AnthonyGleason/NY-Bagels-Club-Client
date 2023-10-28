import React, { useEffect, useState } from 'react';
import './CheckoutSuccess.css';
import {Cart, Order} from '../../../Interfaces/interfaces';
import Sidebar from '../../Home/Sidebar/Sidebar';
import { emptyCart } from '../../../Helpers/cart';
import loadingImg from '../../../Assets/icons/bubble-loading.svg';
import { verifyLoginToken } from '../../../Helpers/auth';
import { getServerUrlPrefix } from '../../../Config/clientSettings';
import { useNavigate } from 'react-router-dom';

export default function CheckoutSuccess(){
  const [order,setOrder] = useState<Order | null>(null);
  const [isSignedIn,setIsSignedIn] = useState<boolean>(false);
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);

  const navigate = useNavigate();

  const verifyIsLoggedIn = async function(){
    setIsSignedIn(await verifyLoginToken());
  };
  
  const fetchMostRecentOrderData = async function(setOrder:Function){
    const response = await fetch(`${getServerUrlPrefix()}/api/users/orders/mostRecent`,{
      'headers':{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('loginToken')}`
      }
    });
    const responseData = await response.json();
    if (responseData && responseData.orderData) setOrder(responseData.orderData);  
  };

  useEffect(()=>{
    //clear the users cart on load
    localStorage.removeItem('cartToken');
    //verify the user is logged in
    verifyIsLoggedIn();
    //fetch the most recent order placed and display it
    fetchMostRecentOrderData(setOrder)
  },[]);

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
  } else if (!order && isSignedIn){
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
          <div className='checkout-success-heading-wrapper'>
            <h3>Your Order Has Been Placed!</h3>
            <h3>Order #{order._id}</h3>
          </div>
          <div className='checkout-success-content'>
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
        An error has occured
      </div>
    )
  }
}