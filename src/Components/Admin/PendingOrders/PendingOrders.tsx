import React, { useEffect, useState } from 'react';
import { Address, Cart, CartItem, Order } from '../../../Interfaces/interfaces';
import AdminOrderItem from '../AdminOrderItem/AdminOrderItem';
import pendingImg from '../../../Assets/icons/flag-solid.svg';
import Aos from 'aos';
import "aos/dist/aos.css";

export default function PendingOrders({
  currentPulls,
  setCurrentPulls,
  setAllPendingOrders,
  allPendingOrders
}:{
  currentPulls:CartItem[],
  setCurrentPulls:Function,
  setAllPendingOrders:Function,
  allPendingOrders: Order[]
}){
  const [isPendingOrdersViewExpanded,setIsPendingOrdersViewExpanded] = useState<boolean>(false);
  useEffect(()=>{
    //setup fade animation length
    Aos.init({duration: 2500});
  },[])

  if (isPendingOrdersViewExpanded){
    return(
      <section data-aos='fade-in'>
        <h3 onClick={()=>{setIsPendingOrdersViewExpanded(false)}}>
          <img src={pendingImg} alt='pending orders' />
          <span>Pending Orders</span>
        </h3>
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
                const orderCart:Cart = order.cart;
                
                return(
                  <AdminOrderItem
                    cart={orderCart}
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
    );
  }else{
    return(
      <section data-aos='fade-in'>
        <h3 onClick={()=>{setIsPendingOrdersViewExpanded(true)}}>
          <img src={pendingImg} alt='pending orders' />
          <span>Pending Orders</span>
        </h3>
      </section>
    )
  };
}