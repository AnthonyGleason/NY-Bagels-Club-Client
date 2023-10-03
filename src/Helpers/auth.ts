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
  };
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

export const verifyLoginToken = async function(setIsSignedIn?:Function):Promise<boolean>{
  let isValid:boolean = false;
  try{
    const response = await fetch(`${getServerUrlPrefix()}/api/users/verify`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('loginToken')}`
      }
    });
    const responseData = await response.json();
    isValid=responseData.isValid;
  }catch(err){
    console.log(err);
  };
  if (setIsSignedIn) setIsSignedIn(isValid);
  return isValid;
};

export const handleLogout = async function(setIsSignedIn?:Function){
  await fetch(`${getServerUrlPrefix()}/api/users/logout`,{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('loginToken')}`
    }
  });
  if (setIsSignedIn) setIsSignedIn(false);
  //remove the token locally
  localStorage.removeItem('loginToken');
};