import React, { useEffect, useState } from 'react';
import { getSelectionName } from '../../../Helpers/cart';
import { CartItem, Order } from '../../../Interfaces/interfaces';
import { getServerUrlPrefix } from '../../../Config/clientSettings';
import pullsImg from '../../../Assets/icons/pulls.svg';
import Aos from 'aos';
import "aos/dist/aos.css";

export default function ProcessingOrderPulls({
  setAllProcessingOrders,
  allProcessingOrders
}:{
  setAllProcessingOrders:Function,
  allProcessingOrders: Order[]
}){
  const [isProcessingPullsViewExpanded,setIsProcessingPullsViewExpanded] = useState<boolean>(false);
  const [currentPulls, setCurrentPulls] = useState<CartItem[]>([]);
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
    //setup fade animation length
    Aos.init({duration: 2500});
  },[])
  //get processing orders
  useEffect(()=>{
    if (isProcessingPullsViewExpanded) getAllProcessingOrders();
  },[isProcessingPullsViewExpanded]);

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
      <section data-aos='fade-in' className='pending-orders-panel-wrapper'>
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
      <section data-aos='fade-in'>
        <h3 onClick={()=>{setIsProcessingPullsViewExpanded(true)}}>
          <img alt='processing' src={pullsImg} />
          <span>Processing Orders Pulls</span>
        </h3>
      </section>
    );
  };
};