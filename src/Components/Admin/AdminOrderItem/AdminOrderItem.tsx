import React, { useEffect, useState } from 'react';
import { Address, Cart, CartItem, Order } from '../../../Interfaces/interfaces';
import { getServerUrlPrefix } from '../../../Config/clientSettings';
import AdminTrackingItem from '../AdminTrackingItem/AdminTrackingItem';
import { getAllOrders, updateOrder } from '../../../Helpers/admin';

export default function AdminOrderItem({
  orderItem,
  allOrders,
  setAllOrders,
  orderSearchInput
}:{
  orderItem:Order,
  allOrders:Order[],
  setAllOrders:Function,
  orderSearchInput?:string
}){
  const [order,setOrder] = useState<Order>(orderItem);

  const orderDate = new Date(order.dateCreated);
  const dateCreated = new Date(orderDate.getUTCFullYear(), orderDate.getUTCMonth(), orderDate.getUTCDate(), orderDate.getUTCHours(), orderDate.getUTCMinutes(), orderDate.getUTCSeconds());

  const shippingAddress:Address = order.shippingAddress;
  const totalAmount:number = order.cart.finalPriceInDollars;
  const cart:Cart = order.cart;

  const [isExpanded,setIsExpanded] = useState<boolean>(false);
  const [orderStatusInput,setOrderStatusInput] = useState<string>(orderItem.status);
  const [orderGiftMessageInput,setOrderGiftMessageInput] = useState<string>(orderItem.giftMessage || '');

  const handleAddEmptyTrackingToOrder = async function(){
    let tempOrder:Order = order;
    let trackingNumberArr = tempOrder.trackingNumberArr || [];
    trackingNumberArr.push('');
    tempOrder.trackingNumberArr = trackingNumberArr;
    await updateOrder(tempOrder);
    await getAllOrders(setAllOrders,orderSearchInput);
  };

  //update order when states change
  const handleUpdateOrderStatus = async function(val:string){
    let tempOrder:Order = order;
    tempOrder.status = val;
    setOrderStatusInput(val)
    await updateOrder(tempOrder);
    await getAllOrders(setAllOrders,orderSearchInput);
    //now that the status is updated regrab all orders
  };

  const handleUpdateGiftMessage = async function(val:string){
    let tempOrder:Order = order;
    tempOrder.giftMessage = val;
    setOrderGiftMessageInput(val);
    await updateOrder(tempOrder);
    await getAllOrders(setAllOrders,orderSearchInput);
  }

  if (isExpanded){
    return(
      <li className='order-item'>
        <button className='order-item-expand-toggle' onClick={()=>{setIsExpanded(!isExpanded)}}>
          <span className='order-date'>Order Date: {dateCreated.toDateString()}</span>
          <span className='order-id'>Order Number: #{order._id}</span>
        </button>
        <div className='order-info-wrapper'>
          <div>
            <h4>Order Status</h4>
            <select value={orderStatusInput} onChange={(e)=>{handleUpdateOrderStatus(e.target.value)}}>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
            </select>
          </div>
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
            {
              order.cart.promoCodeID ? (
                <p>
                  <span>Promo Code Savings:</span>
                  <span><strong>-${order.cart.discountAmountInDollars.toFixed(2)}</strong></span>
                </p>
              ) : null
            }
            <p>
              <span>Calculated Tax:</span>
              <span><strong>${order.cart.taxInDollars}</strong></span>
            </p>
            <p>
              <span>Shipping Cost:</span>
              <span><strong>Free</strong></span>
            </p>
            <p>
              <span>Total Cost:</span>
              <span><strong>${totalAmount.toFixed(2)}</strong></span>
            </p>
          </div>
          {
            order.trackingNumberArr && order.trackingNumberArr.length>0 ?
              <div>
                {
                  order.trackingNumberArr.map((trackingNumber: string,index:number) => (
                    <AdminTrackingItem allOrders={allOrders} key={index} setAllOrders={setAllOrders} trackingNumberArr={order.trackingNumberArr || []} index={index} order={order} trackingNumber={trackingNumber} />
                  ))
                }
                <p onClick={()=>{handleAddEmptyTrackingToOrder()}}>Add a tracking number +</p>
                <p>
                  The customer's selected ship date is 
                  <br />
                  <strong>{new Date(order.cart.desiredShipDate).toDateString()}</strong>.
                </p>
              </div>
            :
            <div key="noTracking">
              <h4>Tracking</h4>
              <p onClick={()=>{handleAddEmptyTrackingToOrder()}}>Add a tracking number +</p>
              <p>Your selected ship date is <strong>{new Date(order.cart.desiredShipDate).toDateString()}</strong>.</p>
            </div>
          }
          {
            orderGiftMessageInput!==''
            ?
            <div>
              <h4>Gift Message:</h4>
              <input value={orderGiftMessageInput} placeholder='Gift Message' onChange={(e)=>{handleUpdateGiftMessage(e.target.value)}} />
            </div>
            : null
          }
        </div>
      </li>
    );
  }else{
    return(
      <button className='order-item-expand-toggle' onClick={()=>{setIsExpanded(!isExpanded)}}>
        <span className='order-date'>Order Date: {dateCreated.toDateString()}</span>
        <span className='order-id'>Order Number: #{order._id}</span>
      </button>
    );
  };
};