import React, { useState } from 'react';
import { Address, Cart, CartItem, Order } from '../../../../Interfaces/interfaces';
import './OrderItem.css';
import OrderTrackingItem from '../OrderTrackingItem/OrderTrackingItem';

export default function OrderItem({
  cart,
  dateCreated,
  giftMessage,
  shippingAddress,
  status,
  totalAmount,
  trackingNumberArr,
  order
}:{
  cart: Cart,
  dateCreated: Date,
  giftMessage: string,
  shippingAddress: Address,
  status:string,
  totalAmount:number,
  trackingNumberArr:string[],
  order:Order
}){
  const [isExpanded,setIsExpanded] = useState(false);

  const toggleExpandOrderItem = function(isExpanded:boolean, setIsExpanded:Function){
    if (isExpanded){
      setIsExpanded(false);
    }else{
      setIsExpanded(true);
    };
  };

  if (isExpanded){
    return(
      <li className='order-item'>
        <button className='order-item-expand-toggle' onClick={()=>{toggleExpandOrderItem(isExpanded,setIsExpanded)}}>
          <span className='order-date'>Order Date: {dateCreated.toDateString()}</span>
          <span className='order-id'>Order Number: #{order._id}</span>
        </button>
        <div className='order-info-wrapper'>
          <div>
            <h4>Shipping Address</h4>
            <ul className='order-item-shipping'>
              <li>{shippingAddress.fullName}</li>
              <li>{shippingAddress.phone}</li>
              <li>{shippingAddress.line1}</li>
              <li>{shippingAddress.city}</li>
              <li>{shippingAddress.state}, {shippingAddress.postal_code}</li>
              <li>{shippingAddress.country}</li>
            </ul>
          </div>
          <div className='order-summary'>
            <h4>Order Summary</h4>
            <ul>
              {
                cart.items.map((cartItem:CartItem,index:number)=>{
                  const getFormattedSelection = function(cat:string, selection?:string):string{
                    let formattedSelection:string = '';
                    switch(cat){
                      case 'spread':
                        formattedSelection = '1 LB';
                        break;
                      case 'bagel':
                        if (selection==='six') formattedSelection = 'Six Pack';
                        if (selection==='dozen') formattedSelection = "Baker's Dozen";
                        break;
                    }
                    return formattedSelection;
                  };
    
                  const formattedSelection:string = getFormattedSelection(cartItem.itemData.cat,cartItem.selection || '');
                  return(
                    <li key={index}>
                      <span>{cartItem.quantity}x {cartItem.itemData.name} ({formattedSelection}):</span>
                      <span><strong>${(cartItem.unitPriceInDollars * cartItem.quantity).toFixed(2)}</strong></span>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <div className='order-costs'>
            <h4>Order Costs:</h4>
            <p>
              <span>Basket Subtotal:</span>
              <span><strong>${order.cart.subtotalInDollars.toFixed(2)}</strong></span>
            </p>
            <p>
              <span>Calculated Tax:</span>
              <span><strong>${order.cart.taxInDollars.toFixed(2)}</strong></span>
            </p>
            <p>
              <span>Shipping Cost:</span>
              <span><strong>Free</strong></span>
            </p>
            {
              order.cart.discountAmountInDollars>0 ?
              <p>
                <span>Discount Applied:</span>
                <span><strong>-${order.cart.discountAmountInDollars}</strong></span>
              </p> :
              null
            }
            <p>
              <span>Total Cost:</span>
              <span><strong>${order.cart.finalPriceInDollars}</strong></span>
            </p>
          </div>
          {
            giftMessage!==''
            ?
            <div>
              <h4>Gift Message:</h4>
              <p>{giftMessage}</p>
            </div>
            : null
          }
          <div>
            <h4>Order Status</h4>
            <p>{status}</p>
          </div>
          {
            trackingNumberArr.length>0 ?
              trackingNumberArr.map((trackingNumber: string,index:number) => (
                <OrderTrackingItem index={index} key={index} trackingNumber={trackingNumber} order={order} />
              ))
            :
              <div key="noTracking">
                <h4>Track Your Order</h4>
                <p>Check Back Soon!</p>
                <p>Your selected ship date is <strong>{new Date(order.cart.desiredShipDate).toDateString()}</strong>.</p>
              </div>
          }
        </div>
      </li>
    );
  }else{
    return(
      <button className='order-item-expand-toggle' onClick={()=>{toggleExpandOrderItem(isExpanded,setIsExpanded)}}>
        <span className='order-date'>Order Date: {dateCreated.toDateString()}</span>
        <span className='order-id'>Order Number: #{order._id}</span>
      </button>
    );
  };
};