import React, { useState } from 'react';
import CartSummaryItem from '../CartSummaryItem/CartSummaryItem';
import { Cart } from '../../../Interfaces/interfaces';
import './PreCheckoutSummary.css';
import { getServerUrlPrefix } from '../../../Config/clientSettings';
import '../Checkout.css';
import stripeImg from '../../../Assets/icons/stripe.svg';
import lockImg from '../../../Assets/icons/lock-1.svg';

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
  const getNextValidDay = function() {
    let i = 1; // Start from tomorrow
    const today = new Date();
    while (true) {
        //control loop shouldn't have to scan for more than a week to find a valid day
        if (i>7) break; 
        const nextDay = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
        if (isDateValid(nextDay.toISOString())) {
            return nextDay.toISOString().split('T')[0];
        }
        i++;
    }
    return '';
  };

  const isDateValid = function(date:string):boolean{
    const selectedDate = new Date(date);
    // Format today's date with the "America/New_York" time zone
    const today = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    // Format selected date with the "America/New_York" time zone
    const formattedSelectedDate = new Date(selectedDate.toLocaleString("en-US", { timeZone: "America/New_York" }));
    // Check if the selected date is today or in the future
    const isFutureDate = formattedSelectedDate.getTime() > new Date(today).getTime();

    return isFutureDate;
  };

  const [date,setDate] = useState<string>(getNextValidDay());
  const [isGiftInput,setIsGiftInput] = useState<boolean>(false);
  const [giftMessageInput,setGiftMessageInput] = useState<string>('');

  const handleNavigateCheckout = async function(){
    if (cart.subtotalInDollars<=25){
      alert('Your cart must be at least $25 to checkout.');
      return;
    };

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

    
  
  const handleDateChange = function (newDate: string) {
    if (isDateValid(newDate)) {
      setDate(new Date(newDate).toISOString().split('T')[0]); // Convert the string to a Date object
    } else {
      alert('You have selected an invalid date, please select a future Monday, Tuesday, Wednesday or Thursday.');
    }
  };

  return(
    <section id='pre-checkout' className='cart-summary' onClick={()=>{setIsSidebarExpanded(isSidebarExpanded===true ? false: false)}}>
      <div className='cart-summary-wrapper'>
        <div className='calendar-wrapper'>
          <h3>Choose Your Ship Date</h3>
          <strong>
            {
              date ?
                `Your order will ship on ${new Date(new Date(date).toLocaleString('en-US', { timeZone: 'UTC' })).toDateString()} or the next available business day.`
              :
                'Please select a Monday, Tuesday, Wednesday or Thursday you would like your order shipped on.'
            }
          </strong>
          <input type='date' 
            value={date}
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </div>
        <div className='basket-wrapper'>  
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
            <b className='cart-shipping-note'>We have applied our FREE Priority Shipping offer to your cart. Taxes are calculated at checkout.</b>
          </div>
        </div>
        {/* <button onClick={()=>{alert("We appreciate your interest in our delicious bagels! Although we're not officially open yet, we're still accepting orders. Feel free to contact sales@nybagelsclub.com to place any orders.")}}>Checkout</button> */}
        <div className='gift-wrapper'>
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
        </div>
        <div className='checkout-secured'>
          <p>Checkout Secured By</p> 
          <img alt='checkout secured by stripe' className='stripe-footer-img' src={stripeImg} loading="lazy" />
          <img alt='this website is secured with ssl' className='lock-img' src={lockImg} loading="lazy" />
        </div>
        <button className='button-styled' onClick={()=>{handleNavigateCheckout()}}>Checkout Now</button>
      </div>
    </section>
  )
};