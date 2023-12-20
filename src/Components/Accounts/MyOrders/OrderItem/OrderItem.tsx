import React, { useState } from 'react';
import { Address, Cart, CartItem, Order } from '../../../../Interfaces/interfaces';
import './OrderItem.css';
import OrderTrackingItem from '../OrderTrackingItem/OrderTrackingItem';
import { getSelectionName } from '../../../../Helpers/cart';
import orderPendingImg from '../../../../Assets/icons/order-pending.svg';
import orderProcessingImg from '../../../../Assets/icons/order-processing.svg';
import orderShippedImg from '../../../../Assets/icons/order-shipped.svg';

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
  const [isExpanded,setIsExpanded] = useState(true);
  const getOrderLevel = function(){
    switch(status.toLowerCase()){
      case 'pending':
        return 0;
      case 'processing':
        return 1;
      case 'shipped':
        return 2;
      default:
        return 0;
    };
  };
  const orderLevel = getOrderLevel();
  const pendingOrderColor = orderLevel>=0 ? '#006400' : 'grey';
  const processingOrderColor = orderLevel>=1 ? '#006400' : 'grey';
  const shippedOrderColor = orderLevel>=2 ? '#006400' : 'grey';

  const toggleExpandOrderItem = function(isExpanded:boolean, setIsExpanded:Function){
    if (isExpanded){
      setIsExpanded(false);
    }else{
      setIsExpanded(true);
    };
  };

  if (isExpanded){
    return(
      <div className='order-item'>
        <button className='order-item-expand-toggle'>
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
            <h4>Item Summary</h4>
            <ul>
              {
                cart.items.map((cartItem:CartItem,index:number)=>{
                  const formattedSelection:string = getSelectionName(cartItem);
                  return(
                    <li key={index}>
                      <span>{cartItem.quantity}x {cartItem.itemData.name}, {formattedSelection}:</span>
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
                <span><strong>-${order.cart.discountAmountInDollars.toFixed(2)}</strong></span>
              </p> :
              null
            }
            <p>
              <span>Total Cost:</span>
              <span><strong>${order.cart.finalPriceInDollars.toFixed(2)}</strong></span>
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
            <p className='order-tracking-visual'>
              <img src={orderPendingImg} alt='order pending' style={{backgroundColor: pendingOrderColor}} />
              <img src={orderProcessingImg} alt='order processing' style={{backgroundColor: processingOrderColor}} />
              <img src={orderShippedImg} alt='order shipped' style={{backgroundColor: shippedOrderColor}} />
            </p>
            <p>Current Status: {status}</p>
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
      </div>
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