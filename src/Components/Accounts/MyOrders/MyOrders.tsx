import React, { useEffect, useState } from 'react';
import { Address, Cart, CartItem, Order } from '../../../Interfaces/interfaces';
import { getServerUrlPrefix } from '../../../Config/clientSettings';
import './MyOrders.css';

export default function MyOrders(){
  const [orders,setOrders] = useState<Order[]>([]);

  const fetchOrders = async function(setOrders:Function){
    const response = await fetch(`${getServerUrlPrefix()}/api/shop/orders`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('loginToken')}`
      }
    });
    const responseData = await response.json();
    if (responseData.orders) setOrders(responseData.orders);
  };

  useEffect(()=>{
    fetchOrders(setOrders);
  },[]);

  return(
    <div className='my-orders'>
      <h3>My Orders</h3>
      <ul className='orders-container'>
        {
          orders.length<=0
          ?
            <li>Place your first order to get started!</li>
          :
          orders.map((order:Order,index:number)=>{
            const cart:Cart = order.cart;
            const dateCreated:Date = new Date(order.dateCreated);
            const giftMessage:string = order.giftMessage || '';
            const shippingAddress:Address = order.shippingAddress;
            const status:string = order.status;
            const totalAmount:number = order.totalAmount/100;
            const trackingNumber:string = order.trackingNumber || '';

            return(
              <li key={index}>
                <div>
                  <h4>Order Number</h4>
                  <p>#{order._id}</p>
                </div>
                <div>
                  <h4>Date Placed</h4>
                  <p>{dateCreated.toDateString()}</p>
                </div>
                <div>
                  <h4>Status</h4>
                  <p>{status}</p>
                </div>
                <div>
                  <h4>Shipping Address</h4>
                  <ul>
                    <li>{shippingAddress.fullName}</li>
                    <li>{shippingAddress.phone}</li>
                    <li>{shippingAddress.line1}</li>
                    <li>{shippingAddress.city}</li>
                    <li>{shippingAddress.state}, {shippingAddress.postal_code}</li>
                    <li>{shippingAddress.country}</li>
                  </ul>
                </div>
                <div>
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
                                if (selection==='four') formattedSelection = 'Four Pack(s)';
                                if (selection==='dozen') formattedSelection = 'Dozen(s)';
                                break;
                            }
                            return formattedSelection;
                        };

                        const formattedSelection:string = getFormattedSelection(cartItem.itemData.cat,cartItem.selection || '');
                        return(
                          <li key={index}>
                            <p>{cartItem.quantity} {formattedSelection}, {cartItem.itemData.name} @ {cartItem.unitPrice.toFixed(2)} each</p>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
                <div>
                  <h4>Order Total</h4>
                  <p>${totalAmount}</p>
                </div>
                {
                  trackingNumber!==''
                  ?
                  <div>
                    <h4>Tracking Number</h4>
                    <p>{trackingNumber}</p>
                  </div>
                  : 
                  <div>
                    <h4>Tracking Number</h4>
                    <p>Pending</p>
                  </div>
                }
                {
                  giftMessage!==''
                  ?
                  <div>
                    <h4>Gift Message:</h4>
                    <p>{giftMessage}</p>
                  </div>
                  : null
                }
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}