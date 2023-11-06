import React, { useEffect, useState } from 'react';
import { updateAdminStatus, verifyLoginToken } from '../../Helpers/auth';
import Sidebar from '../Home/Sidebar/Sidebar';
import { emptyCart, fetchAndHandleCart, getSelectionName } from '../../Helpers/cart';
import { Address, BagelItem, Cart, CartItem, Order, SpreadItem, User } from '../../Interfaces/interfaces';
import { getServerUrlPrefix } from '../../Config/clientSettings';
import OrderItem from '../Accounts/MyOrders/OrderItem/OrderItem';

export default function Admin(){
  const [isAdmin,setIsAdmin] = useState<boolean>(false);

  useEffect(()=>{
    updateAdminStatus(setIsAdmin);
  },[]);
  const [isSignedIn,setIsSignedIn] = useState<boolean>(true);
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);
  const [cart,setCart] = useState<Cart>(emptyCart);
  const [userSearchResults,setUserSearchResults] = useState<User[]>([]);
  const [userSearchInput, setUserSearchInput] = useState<string>('');
  const [orderSearchInput,setOrderSearchInput] = useState<string>('');
  const [orderSearchResults,setOrderSearchResults] = useState<Order[]>([]);
  const [allPendingOrders,setAllPendingOrders] = useState<Order[]>([]);
  const [currentPulls, setCurrentPulls] = useState<CartItem[]>([]);

  const getAllPendingOrders = async function(){
    const response = await fetch(`${getServerUrlPrefix()}/api/admin/orders/pending`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('loginToken')}`
      }
    });
    const responseData = await response.json();
    setAllPendingOrders(responseData.orders);
  };

  //handle initial page load
  useEffect(()=>{
    fetchAndHandleCart(setCart);
    verifyLoginToken(setIsSignedIn);
  },[]);

  //get pending orders and get pulls for the day
  useEffect(()=>{
    getAllPendingOrders();
  },[isAdmin]);


  //get user search results
  useEffect(()=>{

  },[userSearchInput]);

  //get order search results
  useEffect(()=>{

  },[orderSearchResults]);

  //update pulls when all pending orders are retrieved
  useEffect(()=>{
    const pullsData:CartItem[] = [];
    allPendingOrders.forEach((pendingOrder:Order)=>{
      pendingOrder.cart.items.forEach((item:CartItem)=>{
        //find if item exists already in the pulls data array
        let foundItemIndex:number | null = null;

        pullsData.map((pullsData:CartItem,index:number)=>{
          //condition item is already in the pulls data array
          if (
            item.itemData.name===pullsData.itemData.name &&// item name matches
            item.selection === pullsData.selection && //item selection matches
            item.itemData.cat === pullsData.itemData.cat //category matches
          ){
            foundItemIndex=index;
          };
        });

        if (foundItemIndex){
          pullsData[foundItemIndex].quantity += item.quantity;
        }else{
          pullsData.push(item);
        };
      });
    });
    setCurrentPulls(pullsData);
  },[allPendingOrders])

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
          <div onClick={()=>{setIsSidebarExpanded(isSidebarExpanded===true ? false: false)}}>
            <section>
              <h3>Manage Users</h3>
              <div>
                <input value={userSearchInput} onChange={(e)=>{setUserSearchInput(e.target.value)}} placeholder='Search By User ID To Find Users' />
                <ul>
                  {
                    userSearchResults.length === 0 && userSearchInput
                    ?
                      <li>No matches were found for user ID, {userSearchInput}.</li>
                    :
                    null
                      
                  }
                  {
                    userSearchInput.length === 0
                    ?
                      <li>Enter a user ID to begin searching for a user.</li>
                    :
                      null
                  }
                  {
                    userSearchResults.length>0
                    ?
                      <li>Search results were found!</li>
                    :
                      null
                  }
                </ul>
              </div>
            </section>
            <section>
              <h3>Manage Orders</h3>
              <div>
                <input value={orderSearchInput} onChange={(e)=>{setOrderSearchInput(e.target.value)}} placeholder='Search By Order ID To Find Orders' />
                <ul>
                  {
                    orderSearchResults.length === 0 && orderSearchInput
                    ?
                      <li>No matches were found for order ID, {orderSearchInput}.</li>
                    :
                    null
                      
                  }
                  {
                    orderSearchInput.length === 0
                    ?
                      <li>Enter a order ID to begin searching for a order.</li>
                    :
                      null
                  }
                  {
                    orderSearchResults.length>0
                    ?
                      <li>Search results were found!</li>
                    :
                      null
                  }
                </ul>
              </div>
            </section>
            <section>
              <h3>Manage Pending Orders</h3>
              <ul className='pending-orders-wrapper'>
                {
                    allPendingOrders.length>0
                  ?
                    allPendingOrders.sort((a,b)=>{
                      if (a.dateCreated>b.dateCreated) return -1;
                      return 1;
                    }).map((order:Order,index:number)=>{
                      const orderDate = new Date(order.dateCreated);
                      const dateCreated = new Date(orderDate.getUTCFullYear(), orderDate.getUTCMonth(), orderDate.getUTCDate(), orderDate.getUTCHours(), orderDate.getUTCMinutes(), orderDate.getUTCSeconds());
                      const giftMessage:string = order.giftMessage || '';
                      const shippingAddress:Address = order.shippingAddress;
                      const status:string = order.status;
                      const totalAmount:number = order.cart.finalPriceInDollars;
                      const trackingNumber:string = order.trackingNumber || '';
                      return(
                        <OrderItem 
                          cart={cart}
                          dateCreated={dateCreated}
                          giftMessage={giftMessage}
                          shippingAddress={shippingAddress}
                          status={status}
                          totalAmount={totalAmount}
                          trackingNumber={trackingNumber}
                          order={order}
                          key={index}
                        />
                      )
                    })
                  :
                    <li>There are currently no pending orders!</li>
                }
              </ul>
            </section>
            <section>
              <h3>Pulls to Cover All Pending Orders</h3>
              <ul>
                {
                  currentPulls
                  ? 
                    currentPulls.map((currentPull:CartItem,index:number)=>{
                      return(
                        <li key={index}>
                          <p>{currentPull.itemData.name}</p>
                          <p>{currentPull.quantity} {getSelectionName(currentPull)}</p>
                        </li>
                      )
                    })
                  :
                    null
                }
              </ul>
            </section>
          </div>
        :
          <div>You don't have permission to access this content.</div>
      }
      
    </>
  );
};