import React, { useEffect, useRef, useState } from 'react';
import './StoreItems.css';
import StoreItem from './StoreItem/StoreItem';
import { getMembershipTier } from '../../../Helpers/auth';
import { BagelItem, Cart, SpreadItem } from '../../../Interfaces/interfaces';
import { fetchAndSetStoreItems } from '../../../Helpers/store';

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
  
  const isInitialLoad = useRef(true);
  
  // get store items on initial load
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      fetchAndSetStoreItems(setStoreItems);
      getMembershipTier(setUserTier);
    };
  }, [isInitialLoad]);

  let counter:number = 0;

  return(
    <section className='store-items-container'>
      {
        storeItems.sort((a,b)=>{
          if (a.cat==='bagel' && b.cat!=='bagel'){
            return -1;
          }else{
            return 1;
          };
        }).map((storeItem:SpreadItem | BagelItem)=>{  
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