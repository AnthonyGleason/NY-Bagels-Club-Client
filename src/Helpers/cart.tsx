import CartSummaryItem from "../Components/Checkout/CartSummaryItem/CartSummaryItem";
import { getServerUrlPrefix } from "../Config/clientSettings";
import { Item } from "../Interfaces/interfaces";
import { getMembershipTier, requestCartToken, verifyCartToken } from "./auth";

export const getCartSubtotalPrice = function(cart:Item[]):number{
  let totalPrice:number = 0;
  cart.forEach((cartItem:Item)=>{
    totalPrice += cartItem.price * cartItem.quantity;
  });
  return totalPrice;
};

export const getCartItems = function (
  cart:Item[],
  setCart:Function,
  isCheckoutView:boolean
) {
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

export const modifyCart = async function(
  updatedQuantity:number,
  itemID:string,
  setCart:Function,
  isRequestPending:boolean,
  setIsRequestPending:Function
){
  //handle request is already pending limited users to 1 request at a time
  if (isRequestPending) return;
  //set request to pending
  setIsRequestPending(true);
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
    })
  });
  const responseData = await response.json();
  if (responseData.cartToken && responseData.cart){
    //replace the cartToken in localStorage with the updated cartToken
    localStorage.setItem('cartToken',responseData.cartToken);
    console.log(responseData.cart.items);
    //update cart state
    setCart(responseData.cart.items);
  };
  //allow another request to the server
  setIsRequestPending(false);
};

export const fetchAndHandleCart = async function(setCart:Function){
  const cartToken:string | null = localStorage.getItem('cartToken');
  //a cart token exists but is invalid, or a cart token does not exist
  if ((cartToken && !await verifyCartToken(setCart)) || !cartToken){
    localStorage.setItem('cartToken',await requestCartToken());
  };
};

export const handleCartItemInputChange = function(
  e:any,
  setCartQuantity:Function,
  cartItem:Item,
  setCart:Function,
  isRequestPending:boolean,
  setIsRequestPending:Function
){ //accepts an event from an input onChange 
  const newVal: number = parseInt(e.target.value);
  //we dont want users to accidently delete their cart so lets prevent that
  if (!newVal) {
    setCartQuantity('');
    return ;
  }
  modifyCart(
    newVal,
    cartItem._id,
    setCart,
    isRequestPending,
    setIsRequestPending
  );
};

export const getCartItemSubtotal = function(cartItem: Item): number {
  const cartSubtotal: number = parseFloat((cartItem.price * cartItem.quantity).toFixed(2));
  return cartSubtotal;
};

export const calculateTotalCartQuantity = function(cart:Item[]){
  let totalItems = 0;
  //handle empty cart
  if (!cart) return totalItems;
  cart.forEach((item:Item)=>{
    if (item.quantity) totalItems+=item.quantity;
  });
  return totalItems;
};

export const applyMembershipCartPricing = async function(cart:Item[],setCart:Function){
  const membershipTier:string = await getMembershipTier();
  let discountMultiplier:number = 1; //initalize discount to 1
  switch (membershipTier){
    case 'Gold Member':
      discountMultiplier = 0.05;
      break;
    case 'Platinum Member':
      discountMultiplier = 0.10;
      break;
    case 'Diamond Member':
      discountMultiplier = 0.15;
      break;
    default:
      discountMultiplier = 1;
  };
  let updatedCart:Item[] = cart;
  cart.forEach((cartItem:Item, index:number)=>{
    updatedCart[index].price = cartItem.price - (cartItem.price * discountMultiplier);
  });
  setCart(updatedCart);
};