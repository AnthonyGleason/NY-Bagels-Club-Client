import React, { useEffect, useState } from 'react';
import { Address, Cart, CartItem, Order } from '../../../Interfaces/interfaces';
import { getServerUrlPrefix } from '../../../Config/clientSettings';
import './MyOrders.css';
import Sidebar from '../../Home/Sidebar/Sidebar';
import { emptyCart, fetchAndHandleCart } from '../../../Helpers/cart';
import { verifyLoginToken } from '../../../Helpers/auth';
import { fetchOrders } from '../../../Helpers/accounts';
import OrderItem from './OrderItem/OrderItem';

export default function MyOrders(){
  const [orders,setOrders] = useState<Order[]>([]);
  const [isSignedIn,setIsSignedIn] = useState<boolean>(true);
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);
  const [cart,setCart] = useState<Cart>(emptyCart);

  useEffect(()=>{
    //fetch orders
    fetchOrders(setOrders);
    //fetch and set cart
    fetchAndHandleCart(setCart);
    //verify login token
    verifyLoginToken(setIsSignedIn);
  },[]);

  return(
    <>
      <Sidebar 
        cart={cart}
        isExpanded={isSidebarExpanded} 
        setIsExpanded={setIsSidebarExpanded}
        isSignedIn={isSignedIn}
        setIsSignedIn={setIsSignedIn}
      />
      <div className='my-orders' onClick={()=>{setIsSidebarExpanded(isSidebarExpanded===true ? false: false)}}>
        <h3 className='my-orders-heading'>My Orders</h3>
        <ul className='orders-container'>
          {
            orders.length<=0
            ?
              <li>Place your first order to get started!</li>
            :
            orders.sort((a,b)=>{
              if (a.dateCreated>b.dateCreated) return -1;
              return 1;
            }).map((order:Order,index:number)=>{
              const cart:Cart = order.cart;
              const dateCreated:Date = new Date(order.dateCreated);
              const giftMessage:string = order.giftMessage || '';
              const shippingAddress:Address = order.shippingAddress;
              const status:string = order.status;
              const totalAmount:number = order.cart.finalPrice;
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
          }
        </ul>
      </div>
    </>
  )
}