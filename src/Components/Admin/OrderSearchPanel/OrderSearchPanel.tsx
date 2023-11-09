import React, { useEffect, useState } from 'react';
import { Address, Cart, Order } from '../../../Interfaces/interfaces';
import AdminOrderItem from '../AdminOrderItem/AdminOrderItem';
import { getServerUrlPrefix } from '../../../Config/clientSettings';
import magnifyGlassImg from '../../../Assets/icons/magnifying-glass.svg'
import Aos from 'aos';
import "aos/dist/aos.css";

export default function OrderSearchPanel(){
  const [orderSearchInput,setOrderSearchInput] = useState<string>('');
  const [orderSearchResults,setOrderSearchResults] = useState<Order[]>([]);
  const [isOrderSearchExpanded,setIsOrderSearchExpanded] = useState<boolean>(false);

  const handleGetOrderSearchResults = async function(){
    const response = await fetch(`${getServerUrlPrefix()}/api/admin/orders/search/${orderSearchInput}`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('loginToken')}`
      },
    });
    const responseData = await response.json();
    if (responseData.results){
      setOrderSearchResults(responseData.results);
    }else{
      setOrderSearchResults([]);
    };
  };

  useEffect(()=>{
    //setup fade animation length
    Aos.init({duration: 2500});
  },[])

  //get order search results
  useEffect(()=>{
    if (orderSearchInput){
      handleGetOrderSearchResults();
    }else{
      setOrderSearchResults([]);
    }
  },[orderSearchInput]);

  if (isOrderSearchExpanded){
    return(
      <section data-aos='fade-in' className='order-search-panel-wrapper'>
        <h3 onClick={()=>{setIsOrderSearchExpanded(false)}}>
          <img src={magnifyGlassImg} alt='search' />
          <span>Order Search</span>
        </h3>
        <div className='order-search-content-wrapper'>
          <input className='order-search-input' value={orderSearchInput} onChange={(e)=>{setOrderSearchInput(e.target.value)}} placeholder='Search By Order ID To Find Orders' />
          <ul className='order-search-content'>
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
                orderSearchResults.sort((a,b)=>{
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
                null
            }
          </ul>
        </div>
      </section>
    );
  }else{
    return(
      <section data-aos='fade-in'>
        <h3 onClick={()=>{setIsOrderSearchExpanded(true)}}>
          <img src={magnifyGlassImg} alt='search' />
          <span>Order Search</span>
        </h3>
      </section>
    )
  };
};