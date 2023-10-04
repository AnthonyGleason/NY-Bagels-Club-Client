import React, { useEffect, useState } from 'react';
import './StoreItems.css';
import StoreItem from './StoreItem/StoreItem';
import { Item } from '../../../Interfaces/interfaces';
import { getServerUrlPrefix } from '../../../Config/clientSettings';

export default function StoreItems({
    cart,
    setCart,
    isSignedIn,
    setIsSignedIn
  }:{
    cart: Item[],
    setCart: Function,
    isSignedIn: boolean,
    setIsSignedIn: Function
  }){
  const [storeItems,setStoreItems] = useState<Item[]>([]); 

  const fetchAndSetStoreItems = async function(storeItemSetter:Function){
    const response = await fetch(`${getServerUrlPrefix()}/api/shop/all`,{
      method: 'GET'
    });
    const responseData = await response.json();
    const allItems: Item[] | null = responseData.allItems;
    if (allItems) storeItemSetter(responseData.allItems);
  };

  //get store items on initial load
  useEffect(()=>{
    fetchAndSetStoreItems(setStoreItems);
  },[]);

  let counter:number = 1;

  return(
    <section className='store-items-container'>
      {
        storeItems.sort((a:Item,b:Item)=>{
          if (a.index>b.index){
            return 1;
          }else{
            return -1;
          }
        }).map((storeItem:Item)=>{
          counter+=1;
          return(
            <StoreItem
              key={storeItem._id}
              itemName={storeItem.name}
              itemID={storeItem._id}
              itemPrice={storeItem.price}
              cart={cart}
              setCart={setCart}
              isAltTheme={counter%2===0}
              isSignedIn={isSignedIn}
              setIsSignedIn={setIsSignedIn}
            />
          )
        })
      }
    </section>
  )
}