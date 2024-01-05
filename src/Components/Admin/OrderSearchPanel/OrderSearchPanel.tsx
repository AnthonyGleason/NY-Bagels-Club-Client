//TODO, this route makes multiple requests in the [orderSearchResults useEffect]
//to fix this pass the order[] and then filter it to the search results or fetch
//search results only when the search input is not empty

import React, { useEffect, useState } from 'react';
import { Order } from '../../../Interfaces/interfaces';
import AdminOrderItem from '../AdminOrderItem/AdminOrderItem';
import magnifyGlassImg from '../../../Assets/icons/magnifying-glass.svg'
import { getAllOrders, handleGetOrderSearchResults } from '../../../Helpers/admin';

export default function OrderSearchPanel({
  setAllOrders
}:{
  setAllOrders:Function
}){
  const [orderSearchInput,setOrderSearchInput] = useState<string>('');
  const [orderSearchResults,setOrderSearchResults] = useState<Order[]>([]);
  const [isOrderSearchExpanded,setIsOrderSearchExpanded] = useState<boolean>(false);

  //get order search results
  useEffect(()=>{
    if (orderSearchInput){
      handleGetOrderSearchResults(orderSearchInput,setOrderSearchResults);
    }else{
      setOrderSearchResults([]);
    };
  },[orderSearchInput]);

  //when the search results are updated request all orders to be refetched
  //so the user doesnt need to refresh the page
  useEffect(()=>{
    getAllOrders(setAllOrders);
  },[orderSearchResults,setAllOrders]);

  if (isOrderSearchExpanded){
    return(
      <section className='order-search-panel-wrapper'>
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
                  return(
                    <AdminOrderItem
                      allOrders={orderSearchResults}
                      setAllOrders={setOrderSearchResults} //incorrect code on purpose fix later
                      orderItem={order}
                      key={index}
                      orderSearchInput={orderSearchInput}
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
      <section>
        <h3 onClick={()=>{setIsOrderSearchExpanded(true)}}>
          <img src={magnifyGlassImg} alt='search' />
          <span>Order Search</span>
        </h3>
      </section>
    )
  };
};