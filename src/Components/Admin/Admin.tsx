import React, { useEffect, useRef, useState } from 'react';
import { verifyLoginToken } from '../../Helpers/auth';
import Sidebar from '../Home/Sidebar/Sidebar';
import { emptyCart, fetchAndHandleCart } from '../../Helpers/cart';
import { Cart, CartItem, Order } from '../../Interfaces/interfaces';
import './Admin.css';
import PendingOrderPulls from './PendingOrderPulls/PendingOrderPulls';
import ProcessingOrders from './ProcessingOrders/ProcessingOrders';
import UserSearchPanel from './UserSearchPanel/UserSearchPanel';
import OrderSearchPanel from './OrderSearchPanel/OrderSearchPanel';
import PendingOrders from './PendingOrders/PendingOrders';
import ProcessingOrderPulls from './ProcessingOrderPulls/ProcessingOrderPulls';
import { getAllOrders, getAllPendingOrders } from '../../Helpers/admin';

export default function Admin(){
  const [isAdmin,setIsAdmin] = useState<boolean>(false);
  const [isSignedIn,setIsSignedIn] = useState<boolean>(true);
  
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  //sidebar states
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);
  const [cart,setCart] = useState<Cart>(emptyCart);
  
  const isInitialLoad = useRef(true);

  //handle initial page load
  useEffect(()=>{
    if (isInitialLoad.current){
      isInitialLoad.current=false;
      fetchAndHandleCart(setCart);
      verifyLoginToken(setIsSignedIn,setIsAdmin);
    };
  },[isInitialLoad]);

  useEffect(()=>{
    getAllOrders(setAllOrders);
  },[isSignedIn])
  return(
    <>
      <Sidebar 
        cart={cart}
        isExpanded={isSidebarExpanded} 
        setIsExpanded={setIsSidebarExpanded}
        isSignedIn={isSignedIn}
        setIsSignedIn={setIsSignedIn}
      />
      {
        isAdmin ?
          <main className='admin-panel-wrapper' onClick={()=>{setIsSidebarExpanded(isSidebarExpanded===true ? false: false)}}>
            <UserSearchPanel />
            <OrderSearchPanel
              setAllOrders={setAllOrders}
            />
            <ProcessingOrderPulls 
              allOrders={allOrders}
            />
            <PendingOrderPulls
              allOrders={allOrders}
            />
            <ProcessingOrders 
              allOrders={allOrders}
              setAllOrders={setAllOrders}
            />
            <PendingOrders
              allOrders={allOrders}
              setAllOrders={setAllOrders}
            />
          </main>
        :
          <main>You don't have permission to access this content.</main>
      }
    </>
  );
};