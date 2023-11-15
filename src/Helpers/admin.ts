import { getServerUrlPrefix } from "../Config/clientSettings";
import { Order } from "../Interfaces/interfaces";

export  const updateOrder = async function(tempOrder:Order){
  const response = await fetch(`${getServerUrlPrefix()}/api/admin/orders/${tempOrder._id}`,{
    method: 'PUT',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('loginToken')}`
    },
    body:JSON.stringify({
      status: tempOrder.status,
      trackingNumberArr: tempOrder.trackingNumberArr,
      giftMessage: tempOrder.giftMessage
    })
  });
  const responseData = await response.json();
}

export const getAllPendingOrders = async function(setAllPendingOrders:Function){
  const response = await fetch(`${getServerUrlPrefix()}/api/admin/orders/pending`,{
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('loginToken')}`
    }
  });
  const responseData = await response.json();
  setAllPendingOrders(responseData.orders);
  return responseData.orders;
};

export const getAllProcessingOrders = async function(setAllProcessingOrders:Function){
  const response = await fetch(`${getServerUrlPrefix()}/api/admin/orders/processing`,{
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('loginToken')}`
    }
  });
  const responseData = await response.json();
  setAllProcessingOrders(responseData.orders);
  return responseData.orders;
};

export const getAllOrders = async function(setAllOrders:Function, orderSearchInput?:string){
  if (orderSearchInput){
    //performing a search
    handleGetOrderSearchResults(orderSearchInput,setAllOrders);
  }{
    //not performing a search
    const response = await fetch(`${getServerUrlPrefix()}/api/admin/orders`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('loginToken')}`
      }
    });
    const responseData = await response.json();
    setAllOrders(responseData.orders);
    return responseData.orders;
  }
};

export const handleGetOrderSearchResults = async function(orderSearchInput:string,setOrderSearchResults:Function){
  const response = await fetch(`${getServerUrlPrefix()}/api/admin/orders/search/${orderSearchInput}`,{
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('loginToken')}`
    },
  });
  const responseData = await response.json();
  if (responseData.results){
    setOrderSearchResults(responseData.results);
  }else{
    setOrderSearchResults([]);
  };
};