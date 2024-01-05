import React from 'react';
import { Order } from '../../../../Interfaces/interfaces';

export default function OrderTrackingItem({
  trackingNumber,
  order,
  index
}:{
  trackingNumber:string,
  order: Order,
  index: number
}){
  if (trackingNumber !== ''){
    return(
      <div key={trackingNumber}>
        <h4>Tracking Number #{index+1}</h4>
        <p>USPS Priority Mail: {trackingNumber}</p>
      </div>
    ) 
  }else{
    return(
      <>
      </>
    )
  }
}