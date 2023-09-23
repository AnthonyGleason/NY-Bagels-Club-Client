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