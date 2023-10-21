import React from 'react';
import { useNavigate } from 'react-router-dom';
import CartSummaryItem from '../CartSummaryItem/CartSummaryItem';
import { Cart } from '../../../Interfaces/interfaces';

export default function PreCheckoutSummary({
  isSidebarExpanded,
  setIsSidebarExpanded,
  cart,
  isCheckoutView,
  setCart
}:{
  isSidebarExpanded:boolean,
  setIsSidebarExpanded:Function,
  cart:Cart,
  isCheckoutView:boolean,
  setCart:Function
}){
  const navigate = useNavigate();

  return(
    <section className='cart-summary' onClick={()=>{setIsSidebarExpanded(isSidebarExpanded===true ? false: false)}}>
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
          {
            cart.items.map((cartItem, index) => {
              return (
                <CartSummaryItem 
                  key={index}
                  cartItem={cartItem}
                  setCart={setCart}
                  isCheckoutView={isCheckoutView}
                />
              );
            })
          }
        </tbody>
      </table>
      <div className='cart-subtotal'>
        <span><strong>Basket Subtotal: ${cart.subtotal.toFixed(2)}</strong></span>
      </div>
      <b className='cart-shipping-note'>Note: Shipping and taxes are calculated at checkout.</b>
      {/* <button onClick={()=>{alert("We appreciate your interest in our delicious bagels! Although we're not officially open yet, we're still accepting orders. Feel free to contact sales@nybagelsclub.com to place any orders.")}}>Checkout</button> */}
      <button onClick={()=>{navigate('/cart/checkout')}}>Checkout</button>
    </section>
  )
};