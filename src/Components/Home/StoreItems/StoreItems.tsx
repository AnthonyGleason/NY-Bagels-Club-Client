import React, { useEffect, useState } from 'react';
import './StoreItems.css';
import StoreItem from './StoreItem/StoreItem';
import { getServerUrlPrefix } from '../../../Config/clientSettings';
import { getMembershipTier } from '../../../Helpers/auth';
import { BagelItem, Cart, CartItem, SpreadItem } from '../../../Interfaces/interfaces';
import { getUnitPriceFromCartItem } from '../../../Helpers/cart';

export default function StoreItems({
    cart,
    setCart,
    isSignedIn,
    storeItems,
    setStoreItems
  }:{
    cart: Cart,
    setCart: Function,
    isSignedIn: boolean,
    storeItems: (BagelItem | SpreadItem)[],
    setStoreItems: Function
  }){
  const [userTier, setUserTier] = useState<string>('Non-Member');

  const fetchAndSetStoreItems = async function(storeItemSetter:Function){
    const response = await fetch(`${getServerUrlPrefix()}/api/shop/all`,{
      method: 'GET'
    });
    const responseData = await response.json();
    const allItems: (BagelItem | SpreadItem)[] | null = responseData.allItems;
    if (allItems) storeItemSetter(responseData.allItems);
  };

  //get store items on initial load
  useEffect(()=>{
    fetchAndSetStoreItems(setStoreItems);
    getMembershipTier(setUserTier);
  },[]);

  useEffect(()=>{
    getMembershipTier(setUserTier);
  },[isSignedIn]);


  let counter:number = 1;

  return(
    <section className='store-items-container'>
      {
        storeItems.map((storeItem:SpreadItem | BagelItem)=>{  
          counter+=1;
          return(
            <StoreItem
              key={storeItem._id}
              storeItem={storeItem}
              cart={cart}
              setCart={setCart}
              isAltTheme={counter%2===0}
              userTier={userTier}
              isSignedIn={isSignedIn}
              setUserTier={setUserTier}
            />
          )
        })
      }
    </section>
  )
}