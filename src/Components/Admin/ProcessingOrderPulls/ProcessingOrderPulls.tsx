import React, { useEffect, useState } from 'react';
import { getSelectionName } from '../../../Helpers/cart';
import { CartItem, Order } from '../../../Interfaces/interfaces';
import { getServerUrlPrefix } from '../../../Config/clientSettings';
import pullsImg from '../../../Assets/icons/pulls.svg';
import { getAllProcessingOrders } from '../../../Helpers/admin';

export default function ProcessingOrderPulls({
  allOrders,
}:{
  allOrders: Order[]
}){
  const [isProcessingPullsViewExpanded,setIsProcessingPullsViewExpanded] = useState<boolean>(false);
  const [currentPulls, setCurrentPulls] = useState<CartItem[]>([]);
  const [allProcessingOrders,setAllProcessingOrders] = useState<Order[]>([]);

  useEffect(()=>{
    //set processing orders state
    const allProcessingOrders: Order[] = allOrders.filter((order:Order)=>{
      if (order.status==='Processing') return 1;
    });
    setAllProcessingOrders(allProcessingOrders);
  },[allOrders]);

  //update pulls when all pending orders are retrieved
  useEffect(()=>{
    const pullsData:CartItem[] = [];
    allProcessingOrders.forEach((processingOrder:Order)=>{
      processingOrder.cart.items.forEach((item:CartItem)=>{
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
  },[allProcessingOrders])
  
  if (isProcessingPullsViewExpanded){
    return(
      <section className='pending-orders-panel-wrapper'>
        <h3 onClick={()=>{setIsProcessingPullsViewExpanded(false)}}>
          <img alt='processing' src={pullsImg} />
          <span>Processing Orders Pulls</span>
        </h3>
        <ul className='pending-orders-panel-content'>
          {
            currentPulls
            ? 
              currentPulls.map((currentPull:CartItem,index:number)=>{
                return(
                  <li key={index}>
                    <p>{currentPull.itemData.name}</p>
                    <p>{currentPull.quantity + ' '+getSelectionName(currentPull)}</p>
                    <input type='checkbox' />
                  </li>
                )
              })
            :
              null
          }
        </ul>
      </section>
    );
  }else{
    return(
      <section>
        <h3 onClick={()=>{setIsProcessingPullsViewExpanded(true)}}>
          <img alt='processing' src={pullsImg} />
          <span>Processing Orders Pulls</span>
        </h3>
      </section>
    );
  };
};