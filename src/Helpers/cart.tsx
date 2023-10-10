import CartSummaryItem from "../Components/Checkout/CartSummaryItem/CartSummaryItem";
import { getServerUrlPrefix } from "../Config/clientSettings";
import { BagelItem, Cart, CartItem, SpreadItem } from "../Interfaces/interfaces";
import { requestCartToken, verifyCartToken } from "./auth";

export const modifyCart = async function(
  updatedQuantity:number,
  itemID:string,
  setCart:Function,
  isRequestPending:boolean,
  setIsRequestPending:Function,
  selection: string
){
  //handle request is already pending limited users to 1 request at a time
  if (isRequestPending) return;
  //set request to pending
  setIsRequestPending(true);
  //make a request to the server to update quantity for cart
  const response = await fetch(`${getServerUrlPrefix()}/api/shop/carts`,{
    method: 'PUT',
    mode: 'cors',
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
  const responseData = await response.json();
  if (responseData.cartToken && responseData.cart){
    //replace the cartToken in localStorage with the updated cartToken
    localStorage.setItem('cartToken',responseData.cartToken);
    //update cart state
    setCart(responseData.cart);
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
export const getUnitPriceFromCartItem = function(storeItem:SpreadItem | BagelItem, selection?:string):number{
  let price:number = 0;
  if (storeItem.cat==='bagel' && selection==='four'){
    const tempStoreItem:BagelItem = storeItem as BagelItem;
    price = tempStoreItem.fourPrice;
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

export const getCartItemSubtotal = function(cartItem:CartItem):number{
  return cartItem.quantity * cartItem.unitPrice;
};


export const getItemQuantityFromCart = function(cart:Cart, itemName: string, selection?: string): number {
  if (!cart || !cart.items) return 0;

  let quantity = 0;

  for (let index = 0; index < cart.items.length; index++) {
    const cartItem: CartItem = cart.items[index];

    // Check if the selection and itemName match
    if (
      cartItem.selection === selection &&
      (cartItem.itemData.cat === 'bagel' || cartItem.itemData.cat === 'spread') &&
      cartItem.itemData.name === itemName
    ) {
      quantity = cartItem.quantity;
      break; // Exit the loop if the item is found
    }
  };
  return quantity;
};


//the below functions are enabled to avoid errors but have not been vetted



export const getCartItems = function (
  cart:CartItem[],
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