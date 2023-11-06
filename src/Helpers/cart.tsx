import CartSummaryItem from "../Components/Checkout/CartSummaryItem/CartSummaryItem";
import { getServerUrlPrefix } from "../Config/clientSettings";
import { Address, BagelItem, Cart, CartItem, SpreadItem } from "../Interfaces/interfaces";
import { requestCartToken, verifyCartToken } from "./auth";

export const modifyCart = async function(
  updatedQuantity:number,
  itemID:string,
  setCart:Function,
  isRequestPending:boolean,
  setIsRequestPending:Function,
  selection: string
){
  try{
    //handle request is already pending limited users to 1 request at a time
    if (isRequestPending) throw new Error('A request is already pending. Please wait for the current request to complete.');
    //set request to pending
    setIsRequestPending(true);
    if (!itemID || updatedQuantity<0) throw new Error('One or more required inputs were left blank.');
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
        selection: selection
      })
    });
    //if the cart token is invalid request a fresh one and call modifyCart again
    if (response.status===403){
      //request a new cart token
      localStorage.setItem('cartToken',await requestCartToken());
      modifyCart(updatedQuantity,itemID,setCart,isRequestPending,setIsRequestPending,selection);
    };
    if (!response.ok) throw new Error('An error occurred when updating the cart.');
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
    console.log(err);
    setIsRequestPending(false);
  };
};

export const fetchAndHandleCart = async function(setCart:Function){
  try{
    const cartToken:string | null = localStorage.getItem('cartToken');

    //if a cart token was not found obtain a fresh one
    if (!cartToken){
      //request a new cart token
      localStorage.setItem('cartToken',await requestCartToken());
    };

    //a cart token exists but is invalid
    if (!await verifyCartToken(setCart)){
      localStorage.setItem('cartToken',await requestCartToken());
      //because a new cart token was requested we set the cart state back to an empty array
      setCart([]);
    };
  }catch(err){
    console.log(err);
  }
};
export const getUnitPriceFromCartItem = function(storeItem:SpreadItem | BagelItem, selection?:string):number{
  let price:number = 0;
  if (storeItem.cat==='bagel' && selection==='six'){
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
  selection: string
){ //accepts an event from an input onChange 
  const newVal: number = parseInt(e.target.value);
  //we dont want users to accidently delete their cart so lets prevent that
  if (!newVal) {
    setCartQuantity('');
    return ;
  }
  modifyCart(
    newVal,
    cartItem.itemData._id,
    setCart,
    isRequestPending,
    setIsRequestPending,
    selection
  );
};

export const populateTaxCalculation = async function(
    address:Address,
    paymentIntentToken:string,
    setCartTotalPrice:Function,
    setTaxPrice:Function,
    setPaymentIntentToken:Function
  ){
  const response = await fetch(`${getServerUrlPrefix()}/api/shop/carts/create-tax-calculation`,{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('loginToken')}`,
      'Cart-Token': `Bearer ${localStorage.getItem('cartToken')}`
    },
    body: JSON.stringify({
      address: address,
      clientSecret: paymentIntentToken
    })
  });
  const responseData = await response.json();
  setCartTotalPrice(responseData.total/100);
  setTaxPrice(responseData.taxAmount/100);
  if (setPaymentIntentToken) setPaymentIntentToken(responseData.paymentIntentToken);
};

export const getSelectionName = function(cartItem:CartItem){
  if (cartItem.selection==='six') return 'Six Pack(s)';
  if (cartItem.selection==='dozen') return 'Dozen(s)';
  if (cartItem.itemData.cat==='spread') return 'One Pound';
  
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
    }
  };
  return quantity;
};


export const emptyCart = {
  items: [],
  subtotalInDollars: 0,
  taxInDollars: 0,
  totalQuantity: 0,
  promoCodeID: '',
  discountAmountInDollars: 0,
  finalPriceInDollars: 0,
  desiredShipDate: new Date()
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