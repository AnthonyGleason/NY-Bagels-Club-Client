import { getServerUrlPrefix } from "../Config/clientSettings";
import { BagelItem, Cart, CartItem, SpreadItem } from "../Interfaces/interfaces";
import { requestCartToken } from "./auth";

export const modifyCart = async function(
  updatedQuantity:number,
  itemID:string,
  setCart:Function,
  isRequestPending:boolean,
  setIsRequestPending:Function,
  selection: string,
){
  try{
    //handle request is already pending limited users to 1 request at a time
    if (isRequestPending) throw new Error('A request is already pending. Please wait for the current request to complete.');
    //set request to pending
    setIsRequestPending(true);
    if (!itemID || updatedQuantity<0) throw new Error('One or more required inputs were left blank.');
    if(!'cartToken') throw new Error('Your request for a local storage cart token was invalid. Did you provide a isClub value to this function?');
    //make a request to the server to update quantity for cart
    const response = await fetch(`${getServerUrlPrefix()}/api/shop/carts`,{
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
        'Cart-Token': `Bearer ${localStorage.getItem('cartToken')}`,
        'Authorization': `Bearer ${localStorage.getItem('loginToken')}`
      },
      body: JSON.stringify({
        itemID: itemID,
        updatedQuantity: updatedQuantity,
        selection: selection,
      })
    });
    if (response.status===510){
      alert('You have reached the maximum allowed quantity for the selected item.');
    };
    //if the cart token is invalid request a fresh one and call modifyCart again
    if (response.status===403){ //BUG WARNING IF 403 IS RETURNED WHEN YOU CANT ADD ANYTHING NEW TO YOUR CLUB CART YOU WILL BE CAUGHT IN AN ENDLESS LOOP OF 403 RESPONSES
      //request a new cart token
      localStorage.setItem('cartToken',await requestCartToken());
      modifyCart(updatedQuantity,itemID,setCart,isRequestPending,setIsRequestPending,selection);
    };
    if (!response.ok) throw new Error('An error occurred in the request to update the cart.');
    const responseData = await response.json();

    if (responseData.cartToken && responseData.cart){
      //replace the cartToken in localStorage with the updated cartToken
      localStorage.setItem('cartToken',responseData.cartToken);
      //update cart state
      setCart(responseData.cart);
    };
    //allow another request to the server
    setIsRequestPending(false);
  }catch(err){
    setIsRequestPending(false);
  };
};

export const fetchAndVerifyCart = async function(setCart?:Function){
  let isCartValid:boolean = false;
  try {
    const cartToken: string | null = localStorage.getItem('cartToken');
    // If a cart token was not found, obtain a fresh one
    if (!cartToken) {
      // Request a new cart token
      localStorage.setItem('cartToken', await requestCartToken());
    };
    
    //ask the server if the cart token is still valid
    try{
      const response = await fetch(`${getServerUrlPrefix()}/api/shop/carts/verify`,{
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'Cart-Token': `Bearer ${localStorage.getItem('cartToken')}`,
          'Authorization': `Bearer ${localStorage.getItem('loginToken')}`
        }
      });
      if (response.status!==200) throw new Error('No valid cart detected. Either the user does not have a cart token or the token expired.');
      //cart is valid continue
      const responseData = await response.json();
      //set the cart in state if a setter was provided
      if (setCart) setCart(responseData.cart);
      isCartValid = true;
    }catch(err){
      console.log(err);
      isCartValid = false;
    };

    // If a cart token exists but is invalid
    if (!isCartValid) {
      localStorage.setItem('cartToken', await requestCartToken());
      // Because a new cart token was requested, set the cart state back to an empty array
      if (setCart) setCart([]);
    };
  } catch (err) {
    console.log(err);
  };  
};

export const getUnitPriceFromCartItem = function(storeItem:SpreadItem | BagelItem, selection?:string):number{
  let price:number = 0;
  if (storeItem.cat==='bagel' && selection==='two'){
    const tempStoreItem:BagelItem = storeItem as BagelItem;
    price = tempStoreItem.twoPrice;
  }else if (storeItem.cat==='bagel' && selection==='six'){
    const tempStoreItem:BagelItem = storeItem as BagelItem;
    price = tempStoreItem.sixPrice;
  }else if (storeItem.cat==='bagel' && selection==='dozen'){
    const tempStoreItem:BagelItem = storeItem as BagelItem;
    price = tempStoreItem.dozenPrice;
  }else if (storeItem.cat==='spread'){
    const tempCartItem:SpreadItem = storeItem as SpreadItem;
    price = tempCartItem.price;
  };
  return price;
};

export const handleCartItemInputChange = function(
  e:any,
  setCartQuantity:Function,
  cartItem:CartItem,
  setCart:Function,
  isRequestPending:boolean,
  setIsRequestPending:Function,
  selection: string,
){ //accepts an event from an input onChange 
  const newVal: number = parseInt(e.target.value);
  //we dont want users to accidently delete their cart so lets prevent that
  if (!newVal) {
    setCartQuantity('');
    return ;
  };
  modifyCart(
    newVal,
    cartItem.itemData._id,
    setCart,
    isRequestPending,
    setIsRequestPending,
    selection,
  );
};

export const getSelectionName = function(cartItem:CartItem){
  if (cartItem.itemData.cat==='bagel' && cartItem.selection==='six') return 'Six Pack(s)';
  if (cartItem.itemData.cat==='bagel' && cartItem.selection==='dozen') return "Baker's Dozen(s)";
  if (cartItem.itemData.cat==='bagel' && cartItem.selection==='two') return 'Two Pack(s)';

  //order is important here
  if (cartItem.itemData.cat==='spread' && cartItem.selection==='halflb') return '1/2 LB';
  if (cartItem.itemData.cat==='spread') return 'One Pound';
  
  if (cartItem.itemData.cat==='pastry') return 'Six Pack(s)';
  if (cartItem.itemData.cat==='mystery') return 'Single(s)';
  if (cartItem.itemData.cat==='bundle') return 'Bundle(s)';
  return 'N/A';
};

export const getCartItemSubtotal = function(cartItem:CartItem):number{
  return cartItem.quantity * cartItem.unitPriceInDollars;
};

export const getItemQuantityFromCart = function(cart:Cart, itemName: string, selection?: string): number {
  if (!cart || !cart.items) return 0;

  let quantity = 0;

  for (let index = 0; index < cart.items.length; index++) {
    const cartItem: CartItem = cart.items[index];
    
    // Check if the selection and itemName match
    if (
      cartItem.selection === selection &&
      cartItem.itemData.cat === 'bagel' &&
      cartItem.itemData.name === itemName
    ) {
      quantity = cartItem.quantity;
      break; // Exit the loop if the item is found
    }else if(
      cartItem.itemData.cat === 'spread' &&
      cartItem.itemData.name === itemName
    ){
      quantity = cartItem.quantity;
      break; // Exit the loop if the item is found
    }else if(
      cartItem.itemData.cat === 'pastry' &&
      cartItem.itemData.name === itemName
    ){
      quantity = cartItem.quantity;
      break;
    }else if(
      cartItem.itemData.cat === 'bundle' &&
      cartItem.itemData.name === itemName
    ){
      quantity = cartItem.quantity;
      break;
    }
  };
  return quantity;
};


export const emptyCart = {
  items: [],
  subtotalInDollars: 0,
  taxInDollars: 0,
  totalQuantity: 0,
  discountAmountInDollars: 0,
  finalPriceInDollars: 0,
  desiredShipDate: new Date(),
  isGuest: false
};

export const requestApplyMembershipPricingToCart = async function(setCart?:Function):Promise<void>{
  const cartToken:string | null = localStorage.getItem('cartToken');
  const loginToken:string | null = localStorage.getItem('loginToken');

  if (cartToken){
    const response = await fetch(`${getServerUrlPrefix()}/api/shop/carts/applyMembershipPricing`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Cart-Token': `Bearer ${cartToken}`,
        'Authorization': `Bearer ${loginToken}`
      }
    });
    if (response.ok){
      const responseData = await response.json();
      localStorage.setItem('cartToken',responseData.cartToken);
      if (setCart) setCart(responseData.cart);
      console.log('Membership pricing successfully applied!');
    }else{
      console.log('User is not a member.');
    };
  };
};

export const isClubCartValid = function(clubCart:Cart):boolean{
  let totalSpreadQuantity = 0;
  let totalBagelQuantity = 0;

  clubCart.items.map((cartItem)=>{
    switch (cartItem.itemData.cat){
      case 'bagel':
        totalBagelQuantity+=cartItem.quantity;
        break;
      case 'spread':
        totalSpreadQuantity+=cartItem.quantity;
        break;
      default:
        break;
    };
  });
  return (totalSpreadQuantity===1 && totalBagelQuantity===6);
}

export const handlePlaceClubOrder = async function(clubCart:Cart,isClubCartValid:boolean,deliveriesRemaining:number,shipDate?:Date){
  if (!isClubCartValid){
    alert('To place your order you must have 6 "Two Packs" and 1 "1/2 LB" spread in your cart.')
  }else if(!shipDate){
    alert('You must select a ship date to place your order.');
  }else if(deliveriesRemaining<=0){
    alert('You do not have any deliveries remaining this billing cycle.');
  }else{
    //request the cart token
    const response = await fetch(`${getServerUrlPrefix()}/api/memberships/create-club-checkout-session`,{
      method: 'POST',
      headers:{
        'Content-Type': `application/json`,
        'Authorization': `Bearer ${localStorage.getItem('loginToken')}`,
        'cart-token': `Bearer ${localStorage.getItem('clubCartToken')}`
      },
      body:JSON.stringify({
        shipDate: shipDate
      })
    });
    const responseData = await response.json();
    if (responseData.sessionUrl) window.location.href=responseData.sessionUrl;
  }
};