import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartSummaryItem from '../CartSummaryItem/CartSummaryItem';
import { Cart } from '../../../Interfaces/interfaces';
import Calendar from 'react-calendar';
import './PreCheckoutSummary.css';
import { getServerUrlPrefix } from '../../../Config/clientSettings';

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
  const [date,setDate] = useState<Date>();

  const updateDesiredShipDate = async function(){
    const response = await fetch(`${getServerUrlPrefix()}/api/shop/carts/shipDate`,{
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
        'Cart-Token': `Bearer ${localStorage.getItem('cartToken')}`,
        'Authorization': `Bearer ${localStorage.getItem('loginToken')}`
      },
      body: JSON.stringify({
        desiredShipDate: date
      })
    });
    const responseData = await response.json();
    if (responseData.cartToken) localStorage.setItem('cartToken',responseData.cartToken);
  };

  useEffect(()=>{
    //update the date in the mongodb cart
    updateDesiredShipDate()
  },[date]);

  const handleNavigateCheckout = function(){
    if (!date){
      alert('You must select a ship date for your order to proceed.');
    }else{
      navigate('/cart/checkout');
    };
  };

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
        <span><strong>Basket Subtotal: ${cart.subtotalInDollars.toFixed(2)}</strong></span>
      </div>
      <div className='calendar-wrapper'>
        <h3>Choose Your Ship Date</h3>
        <Calendar 
          value={date} 
          onChange={(selectedDate:any)=>{setDate(selectedDate)}}
          tileDisabled={({date}) => ![3, 4].includes(date.getDay())}
          minDetail='month'
          maxDetail='month'
        />
        <strong>
          {
            date ?
            `Your Order Will Ship On  ${date.toDateString()}`
            :
              'Please Select A Wednesday or Thursday'
          }
        </strong>
      </div>
      <b className='cart-shipping-note'>Note: Shipping and taxes are calculated at checkout.</b>
      {/* <button onClick={()=>{alert("We appreciate your interest in our delicious bagels! Although we're not officially open yet, we're still accepting orders. Feel free to contact sales@nybagelsclub.com to place any orders.")}}>Checkout</button> */}
      <button className='button-styled' onClick={()=>{handleNavigateCheckout()}}>Checkout</button>
    </section>
  )
};