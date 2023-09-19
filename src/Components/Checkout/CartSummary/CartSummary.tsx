import React from 'react';
import './CartSummary.css';

export default function CartSummary(){
  return(
    <div className='cart-summary'>
      <h3>Shopping Cart</h3>
      <em>The following is a placeholder and does not reflect your current shopping cart.</em>
      <ol>
        <li>
          <b className='item-name'>Item Name</b>
          <b className='item-quantity'>Item Quantity</b>
          <b className='item-subtotal'>Item Subtotal</b>
        </li>
        <li>
          <span className='item-name'>4 Pack Plain Bagels</span>
          <span className='item-quantity'>2</span>
          <span className='item-subtotal'>$33.98</span>
        </li>
        <li>
          <span className='item-name'>4 Pack Everything Bagels</span>
          <span className='item-quantity'>3</span>
          <span className='item-subtotal'>$50.97</span>
        </li>
        <li>
          <span className='item-name'>1 Dozen Everything Bagels</span>
          <span className='item-quantity'>1</span>
          <span className='item-subtotal'>$34.99</span>
        </li>
      </ol>
      <div className='cart-subtotal'>
        <span>Subtotal:</span>
        <span>$119.94</span>
      </div>
      <b className='cart-shipping-note'>Note: Shipping and taxes are calculated at checkout.</b>
      <button>Checkout Now</button>
    </div>
  )
}