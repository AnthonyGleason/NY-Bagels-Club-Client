import { getServerUrlPrefix } from "../Config/clientSettings";

export const verifyCartToken = async function(setCart:Function){
  const response = await fetch(`${getServerUrlPrefix()}/api/shop/carts/verify`,{
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('cartToken')}`
    }
  });
  const responseData = await response.json();
  if (responseData.isValid){
    setCart(responseData.cart.items);
    return responseData.isValid;
  }
};

export const requestCartToken = async function(){
  const response = await fetch(`${getServerUrlPrefix()}/api/shop/carts`,{
    method: 'POST',
  });
  const responseData = await response.json();
  if (responseData.cartToken){
    //return the cart session token
    return responseData.cartToken;  
  }
};

export const fetchAndHandleCart = async function(setCart:Function){
  const cartToken:string | null = localStorage.getItem('cartToken');
  //a cart token exists but is invalid, or a cart token does not exist
  if ((cartToken && !await verifyCartToken(setCart)) || !cartToken){
    localStorage.setItem('cartToken',await requestCartToken());
  };
};

export const modifyCart = async function(
  updatedQuantity:number,
  itemID:string,
  setCart:Function
){
  //make a request to the server to update quantity for cart
  const response = await fetch(`${getServerUrlPrefix()}/api/shop/carts`,{
    method: 'PUT',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('cartToken')}`
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
    //update cart state
    setCart(responseData.cart.items);
  };
};