import React, { useEffect, useState } from 'react';
import { Address, Cart, CartItem, Order } from '../../../Interfaces/interfaces';
import AdminOrderItem from '../AdminOrderItem/AdminOrderItem';
import pendingImg from '../../../Assets/icons/flag-solid.svg';
import { getAllPendingOrders } from '../../../Helpers/admin';

export default function PendingOrders({
  allOrders,
  setAllOrders
}:{
  allOrders: Order[],
  setAllOrders:Function
}){
  const [isPendingOrdersViewExpanded,setIsPendingOrdersViewExpanded] = useState<boolean>(false);
  const [allPendingOrders,setAllPendingOrders] = useState<Order[]>([]);

  useEffect(()=>{
    //set pending orders state
    const allPendingOrders:Order[] = allOrders.filter((order:Order)=>{
      if (order.status==='Pending') return 1;
    });
    setAllPendingOrders(allPendingOrders);
  },[allOrders])

  if (isPendingOrdersViewExpanded){
    return(
      <section>
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
              <li>There are currently no pending orders!</li>
          }
        </ul>
      </section>
    );
  }else{
    return(
      <section>
        <h3 onClick={()=>{setIsPendingOrdersViewExpanded(true)}}>
          <img src={pendingImg} alt='pending orders' />
          <span>Pending Orders</span>
        </h3>
      </section>
    )
  };
}