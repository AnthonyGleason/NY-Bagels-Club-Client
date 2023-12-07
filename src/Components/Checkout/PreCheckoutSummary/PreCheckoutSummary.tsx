import React, { useState } from 'react';
import CartSummaryItem from '../CartSummaryItem/CartSummaryItem';
import { Cart } from '../../../Interfaces/interfaces';
import Calendar from 'react-calendar';
import './PreCheckoutSummary.css';
import { getServerUrlPrefix } from '../../../Config/clientSettings';

export default function PreCheckoutSummary({
  isSidebarExpanded,
  setIsSidebarExpanded,
  cart,
  setCart
}:{
  isSidebarExpanded:boolean,
  setIsSidebarExpanded:Function,
  cart:Cart,
  setCart:Function
}){
  const [date,setDate] = useState<Date>();
  const [isGiftInput,setIsGiftInput] = useState<boolean>(false);
  const [giftMessageInput,setGiftMessageInput] = useState<string>('');
  
  const handleNavigateCheckout = async function(){
    if (!date){
      alert('You must select a ship date for your order to proceed.');
    }else{
      const body = {
        giftMessage: giftMessageInput || '',
        shipDate: date
      };
      const response = await fetch(`${getServerUrlPrefix()}/api/shop/carts/create-checkout-session`,{
        method: 'POST',
        headers:{
          'Authorization': `Bearer ${localStorage.getItem('loginToken')}`,
          'cart-token': `Bearer ${localStorage.getItem('cartToken')}`,
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
      });
      const responseData = await response.json();
      if (response.status!==200){
        alert('There was an error retrieving your account information. Please sign in again.');
      }else{
        window.location.href=responseData.sessionUrl;
      };
    };
  };

  // get tomorrow's date
  const getTomorrowDate = function(){
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };

  return(
    <section id='pre-checkout' className='cart-summary' onClick={()=>{setIsSidebarExpanded(isSidebarExpanded===true ? false: false)}}>
      <div className='cart-summary-wrapper'>
        <div className='calendar-wrapper'>
          <h3>Choose Your Ship Date</h3>
          <Calendar 
            value={date} 
            onChange={(selectedDate:any)=>{setDate(selectedDate)}}
            tileDisabled={({date}) => ![3, 4].includes(date.getDay())}
            minDetail='month'
            maxDetail='month'
            minDate={getTomorrowDate()}
          />
          <strong>
            {
              date ?
                `Your order will ship on ${date.toDateString()} or the next available business day.`
              :
                'Please select a Wednesday or Thursday you would like your order shipped on.'
            }
          </strong>
        </div>
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
                  />
                );
              })
            }
          </tbody>
        </table>
        <div className='cart-subtotal'>
          <span><strong>Basket Subtotal: ${cart.subtotalInDollars.toFixed(2)}</strong></span>
        </div>
        <b className='cart-shipping-note'>Note: Shipping and taxes are calculated at checkout.</b>
        {/* <button onClick={()=>{alert("We appreciate your interest in our delicious bagels! Although we're not officially open yet, we're still accepting orders. Feel free to contact sales@nybagelsclub.com to place any orders.")}}>Checkout</button> */}
        <h3>Is This Order A Gift?</h3>
          <div className='gift-options-content'>
            <div className='gift-toggle-container'>
              <input
                type='checkbox'
                checked={isGiftInput}
                onChange={(e) => setIsGiftInput(e.target.checked)}
              />
            </div>
            {
              isGiftInput===true
              ?
                <div className='gift-options-form'>
                  <div>
                    <label>Leave A Gift Message (Optional)</label>
                    <textarea maxLength={400} value={giftMessageInput} onChange={(e)=>{setGiftMessageInput(e.target.value)}} />
                  </div>
                </div>
              :
                null
            }
          </div>
        <button className='button-styled' onClick={()=>{handleNavigateCheckout()}}>Checkout Now</button>
      </div>
    </section>
  )
};