import { getServerUrlPrefix } from "../Config/clientSettings";
import { Cart } from "../Interfaces/interfaces";

export const fetchAndSetStoreItems = async function(setBagelItems?:Function,setPastryItems?:Function,setBundleItems?:Function){  
  try{
    //make request for all store items
    const response = await fetch(`${getServerUrlPrefix()}/api/shop/all`,{
      method: 'GET'
    });
    const responseData = await response.json();
    const { bagelItems,pastryItems,bundleItems } = responseData;
    //handle no items found
    if (!bagelItems || !pastryItems || !bundleItems) throw new Error('There was an error retrieving shop items.');

    if (setBagelItems && bagelItems) setBagelItems(bagelItems);
    if (setPastryItems && pastryItems) setPastryItems(pastryItems);
    if (setBundleItems && bundleItems) setBundleItems(bundleItems)
  }catch(err){
    console.log(`There was an error ${err} when retrieving shop items.`);
  };
};

export const handleNavigateCheckout = async function(cart:Cart,date:string,giftMessageInput:string){
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

export const getNextValidDay = function() {
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

export const isDateValid = function(date:string):boolean{
  const selectedDate = new Date(date);
  // Format today's date with the "America/New_York" time zone
  const today = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
  // Format selected date with the "America/New_York" time zone
  const formattedSelectedDate = new Date(selectedDate.toLocaleString("en-US", { timeZone: "America/New_York" }));
  // Check if the selected date is today or in the future
  const isFutureDate = formattedSelectedDate.getTime() > new Date(today).getTime();

  return isFutureDate;
};