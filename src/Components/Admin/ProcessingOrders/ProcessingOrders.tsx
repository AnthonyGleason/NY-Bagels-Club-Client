import React, { useEffect, useState } from 'react';
import { Address, Cart, Order } from '../../../Interfaces/interfaces';
import AdminOrderItem from '../AdminOrderItem/AdminOrderItem';
import { getServerUrlPrefix } from '../../../Config/clientSettings';
import gearImg from '../../../Assets/icons/gear.svg';
import Aos from 'aos';
import "aos/dist/aos.css";

export default function ProcessingOrders(){
  const [allProcessingOrders,setAllProcessingOrders] = useState<Order[]>([]);
  const [isProcessingOrdersExpanded,setIsProcessingOrdersExpanded] = useState<boolean>(false);

  const getAllProcessingOrders = async function(){
    const response = await fetch(`${getServerUrlPrefix()}/api/admin/orders/processing`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('loginToken')}`
      }
    });
    const responseData = await response.json();
    setAllProcessingOrders(responseData.orders);
  };

  useEffect(()=>{
    getAllProcessingOrders();
    //setup fade animation length
    Aos.init({duration: 2500});
  },[]);

  if (isProcessingOrdersExpanded){
    return(
      <section data-aos='fade-in'>
        <h3 onClick={()=>{setIsProcessingOrdersExpanded(false)}}>
          <img src={gearImg} alt='processing orders' />
          <span>Processing Orders</span>
        </h3>
        <ul className='processing-orders-wrapper'>
          {
              allProcessingOrders.length>0
            ?
              allProcessingOrders.sort((a,b)=>{
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
              <li>There are currently no processing orders!</li>
          }
        </ul>
      </section>
    );
  }else{
    return(
      <section data-aos='fade-in'>
        <h3 onClick={()=>{setIsProcessingOrdersExpanded(true)}}>
          <img src={gearImg} alt='processing orders' />
          <span>Processing Orders</span>
        </h3>
      </section>
    )
  };
};