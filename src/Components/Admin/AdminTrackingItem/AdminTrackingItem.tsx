import React, { useEffect, useState } from 'react';
import { Order } from '../../../Interfaces/interfaces';
import { getAllOrders, updateOrder } from '../../../Helpers/admin';
import xImg from '../../../Assets/icons/x.svg';

export default function AdminTrackingItem({
  trackingNumber,
  trackingNumberArr,
  order,
  allOrders,
  setAllOrders,
  index
}:{
  trackingNumber:string,
  trackingNumberArr:string[],
  order: Order,
  allOrders:Order[],
  setAllOrders: Function,
  index:number
}){
  const [trackingNumberInput, setTrackingNumberInput] = useState<string>(trackingNumberArr[index]);

  useEffect(()=>{
    setTrackingNumberInput(trackingNumberArr[index]);
  },[allOrders,index,trackingNumberArr])
  
  //update the tracking number on the server
  const handleUpdateTrackingNumber = async function(e:any){
    setTrackingNumberInput(e.target.value)
    let tempTrackingNumberArr:string[] = trackingNumberArr;
    let tempOrder:Order = order;
    tempTrackingNumberArr[index] = e.target.value; //using the event value rather than the tracking number state because the state takes time to update (forget this and the tracking numbers will be one letter behind your current input)
    //update order tracking number arr
    tempOrder.trackingNumberArr = tempTrackingNumberArr;
    //update order on mongodb
    await updateOrder(tempOrder);
    await getAllOrders(setAllOrders);
  };

  const handleRemoveTrackingNumber = async function(){
    let tempOrder: Order = order; // create a copy to avoid modifying the original order object
    let tempTrackingNumberArr: string[] = trackingNumberArr;
    tempTrackingNumberArr.splice(index,1);
    tempOrder.trackingNumberArr = tempTrackingNumberArr;
    // update order on MongoDB
    await updateOrder(tempOrder);
    await getAllOrders(setAllOrders);
  };

  return(
    <div key={trackingNumber}>
      <h4>Tracking Number #{index+1}</h4>
      <span>
        <input placeholder='Tracking Number' value={trackingNumberInput} onChange={(e)=>{setTrackingNumberInput(e.target.value)}} onBlur={(e)=>{handleUpdateTrackingNumber(e)}} />
        <img src={xImg} alt='delete tracking number' onClick={()=>{handleRemoveTrackingNumber()}} />
      </span>
      
    </div>
  )
}