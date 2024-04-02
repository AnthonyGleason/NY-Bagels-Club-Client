import React, { useEffect, useState } from 'react';
import { Address, Cart, CartItem, Order } from '../../../Interfaces/interfaces';
import AdminOrderItem from '../AdminOrderItem/AdminOrderItem';
import boxImg from '../../../Assets/icons/box.svg';

export default function ShippedOrders({
  allOrders,
  setAllOrders
}:{
  allOrders: Order[],
  setAllOrders:Function
}){
  const [isShippedOrdersViewExpanded,setIsShippedOrdersViewExpanded] = useState<boolean>(false);
  const [allShippedOrders,setAllShippedOrders] = useState<Order[]>([]);

  useEffect(()=>{
    //set shipped orders state
    const allShippedOrders:Order[] = allOrders.filter((order:Order)=>{
      if (order.status==='Shipped') return 1;
    });
    setAllShippedOrders(allShippedOrders);
  },[allOrders])

  if (isShippedOrdersViewExpanded){
    return(
      <section className='order-search-panel-wrapper'>
        <h3 onClick={()=>{setIsShippedOrdersViewExpanded(false)}}>
          <img src={boxImg} alt='shipped order box' />
          <span>Shipped Orders</span>
        </h3>
        <div className='order-search-content-wrapper'>
          <ul className='order-search-content'>
            {
                allShippedOrders.length>0
              ?
                allShippedOrders.sort((a,b)=>{
                  if (a.dateCreated>b.dateCreated) return -1;
                  return 1;
                }).map((order:Order,index:number)=>{
                  return(
                    <AdminOrderItem
                      allOrders={allOrders}
                      setAllOrders={setAllOrders}
                      orderItem={order}
                      key={index}
                    />
                  )
                })
              :
                <li>No shipped orders were found!</li>
            }
          </ul>
        </div>
      </section>
    );
  }else{
    return(
      <section>
        <h3 onClick={()=>{setIsShippedOrdersViewExpanded(true)}}>
          <img src={boxImg} alt='shipped orders box' />
          <span>Shipped Orders</span>
        </h3>
      </section>
    )
  };
}