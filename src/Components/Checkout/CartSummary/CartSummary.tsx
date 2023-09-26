import React, { useEffect, useState } from 'react';
import './CartSummary.css';
import removeImg from '../../../Assets/x.svg';
import { Item } from '../../../Interfaces/interfaces';
import { fetchAndHandleCart, modifyCart } from '../../../Helpers/auth';

export default function CartSummary(){
  const [cart,setCart] = useState<Item[]>([]);
  const [totalPrice,setTotalPrice] = useState<number>(0);
  
  //handle initial page load (grab latest cart data);
  useEffect(()=>{
    fetchAndHandleCart(setCart);
  },[]);
  
  //when the cart is updated, update the total price of all items in the cart
  useEffect(()=>{
    setTotalPrice(getCartTotalPrice());
  },[cart])

  const getCartTotalPrice = function():number{
    let totalPrice:number = 0;
    cart.forEach((cartItem)=>{
      totalPrice+=cartItem.price*cartItem.quantity;
    });
    return totalPrice;
  };

  const getCartItems = function(){
    //loop over cart items
    const cartElement = cart.map((cartItem:Item,index:number)=>{
      return(
        <li key={index}>
          <span className='item-name'>{cartItem.name}</span>
          <input 
            type='number'
            value={cartItem.quantity}
            onChange={(e)=>{
              const newVal:number = parseInt(e.target.value) || 0;
              modifyCart(newVal,cartItem._id,setCart)
            }}
          />
          <span className='item-subtotal'>${parseFloat((cartItem.price*cartItem.quantity).toString()).toFixed(2)}</span>
          <button onClick={()=>{
            modifyCart(0,cartItem._id,setCart)
          }}>
            <img src={removeImg} alt='remove from cart' />
          </button>
        </li>
      )
    });
    //return the cart element
    return cartElement;
  };

  return(
    <div className='cart-summary'>
      <h3>Shopping Cart</h3>
      <ol>
        <li>
          <b className='item-name'>Name</b>
          <b className='item-quantity'>Quantity</b>
          <b className='item-subtotal'>Subtotal</b>
          <b className='item-remove'>Remove</b>
        </li>
        {
          getCartItems()
        }
      </ol>
      <div className='cart-subtotal'>
        <span>Cart Subtotal:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <b className='cart-shipping-note'>Note: Shipping and taxes are calculated at checkout.</b>
      <button>Checkout Now</button>
    </div>
  );
};