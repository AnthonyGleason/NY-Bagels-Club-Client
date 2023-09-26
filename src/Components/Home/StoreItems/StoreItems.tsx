import React, { useEffect, useState } from 'react';
import './StoreItems.css';
import StoreItem from './StoreItem/StoreItem';
import { Item } from '../../../Interfaces/interfaces';
import { getServerUrlPrefix } from '../../../Config/clientSettings';

export default function StoreItems({
    cart,
    setCart
  }:{
    cart: Item[],
    setCart: Function
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

  return(
    <section className='store-items-container'>
      {
        storeItems.map((storeItem:Item)=>{
          return(
            <StoreItem
              key={storeItem._id}
              itemName={storeItem.name}
              itemID={storeItem._id}
              itemPrice={storeItem.price}
              cart={cart}
              setCart={setCart}
            />
          )
        })
      }
    </section>
  )
}