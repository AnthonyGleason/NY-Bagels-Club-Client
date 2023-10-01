import React, { useEffect, useState } from 'react';
import './CartSummary.css';
import { Item } from '../../../Interfaces/interfaces';
import { fetchAndHandleCart, modifyCart } from '../../../Helpers/auth';
import CartSummaryItem from '../CartSummaryItem/CartSummaryItem';
import { useNavigate } from 'react-router-dom';

export default function CartSummary({
  isCheckoutView
}:{
  isCheckoutView:boolean
}){
  const [cart,setCart] = useState<Item[]>([]);
  const [totalPrice,setTotalPrice] = useState<number>(0);
  
  const navigate = useNavigate();
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
      totalPrice += cartItem.price * cartItem.quantity;
    });
    return totalPrice;
  };

  const getCartItems = function () {
    // Loop over cart items
    const cartRows = cart.map((cartItem, index) => {
      return (
        <CartSummaryItem 
          key={index}
          cartItem={cartItem}
          setCart={setCart}
          isCheckoutView={isCheckoutView}
        />
      );
    });
    // Return the cart rows
    return cartRows;
  };  

  //handle empty shopping cart
  if (cart.length===0){
    return(
      <div className='cart-summary'>
        <h3>Basket</h3>
        <strong>Your Basket is Currently Empty.</strong>
      </div>
    );
  }else if (cart.length>0 && !isCheckoutView){
    return(
      <div className='cart-summary'>
        <h3>Basket</h3>
        <table>
          <thead>
            <tr>
              <th className="item-name">Name</th>
              <th className="item-quantity">Quantity</th>
              <th className="item-subtotal">Subtotal</th>
              <th className="item-remove">Remove</th>
            </tr>
          </thead>
          <tbody>
            {getCartItems()}
          </tbody>
        </table>
        <div className='cart-subtotal'>
          <span><strong>Basket Subtotal: ${totalPrice.toFixed(2)}</strong></span>
        </div>
        <b className='cart-shipping-note'>Note: Shipping and taxes are calculated at checkout.</b>
        <button onClick={()=>{navigate('/cart/checkout')}}>Checkout Now</button>
      </div>
    );
  }else{
    return(
      <div className='cart-summary checkout-cart-summary'>
        <h3>Basket Summary</h3>
        <table>
          <thead>
            <tr>
              <th className="item-name">Name</th>
              <th className="item-quantity">Quantity</th>
              <th className="item-subtotal">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {getCartItems()}
          </tbody>
        </table>
        <div className='cart-subtotal'>
          <span><strong>Basket Subtotal: ${totalPrice.toFixed(2)}</strong></span>
        </div>
      </div>
    )
  }
};