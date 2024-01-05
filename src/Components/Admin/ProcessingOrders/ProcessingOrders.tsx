import React, { useEffect, useState } from 'react';
import { Address, Cart, Order } from '../../../Interfaces/interfaces';
import AdminOrderItem from '../AdminOrderItem/AdminOrderItem';
import gearImg from '../../../Assets/icons/gear.svg';

export default function ProcessingOrders({
  setAllOrders,
  allOrders
}:{
  setAllOrders:Function,
  allOrders:Order[]
}){
  const [isProcessingOrdersExpanded,setIsProcessingOrdersExpanded] = useState<boolean>(false);
  const [allProcessingOrders,setAllProcessingOrders] = useState<Order[]>([]);

  useEffect(()=>{
    //set processing orders state
    const allProcessingOrders: Order[] = allOrders.filter((order:Order)=>{
      if (order.status==='Processing') return 1;
    });
    setAllProcessingOrders(allProcessingOrders);
  },[allOrders]);

  if (isProcessingOrdersExpanded){
    return(
      <section>
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
                return(
                  <AdminOrderItem
                    allOrders={allOrders}
                    orderItem={order}
                    setAllOrders={setAllOrders}
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
      <section>
        <h3 onClick={()=>{setIsProcessingOrdersExpanded(true)}}>
          <img src={gearImg} alt='processing orders' />
          <span>Processing Orders</span>
        </h3>
      </section>
    )
  };
};