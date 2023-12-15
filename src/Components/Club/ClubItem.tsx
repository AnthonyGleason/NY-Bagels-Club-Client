import React, { useEffect, useRef, useState } from 'react';
import { getItemQuantityFromCart, modifyCart } from '../../Helpers/cart';
import { Cart, Product } from '../../Interfaces/interfaces';

export default function ClubItem({
  storeItem,
  cart,
  setCart
}:{
  storeItem:Product
  cart:Cart,
  setCart:Function
}){
  const [itemImgSrc, setItemImgSrc] = useState<string | undefined>();
  const [isRequestPending,setIsRequestPending] = useState<boolean>(false);

  //handle initial page load
  const isInitialLoad = useRef(true);

  useEffect(()=>{
    if (isInitialLoad.current){
      isInitialLoad.current = false;
      //dynamically import images
      import(`../../Assets/storeItems/${storeItem._id.toString()}.jpg`)
        .then((module)=>{
          setItemImgSrc(module.default);
        });
    };
  },[isInitialLoad]);

  return(
    <div 
      className='club-item'
      style={{
        backgroundImage: `url(${itemImgSrc})`
      }}
    >
      <div className='club-item-info'>
        <div className='club-item-desc'>
          <p>{storeItem.name}</p>
          {
            storeItem.cat==='bagel'
            ?
              <p>Two Pack(s)</p>
            :
              null
          }
          {
            storeItem.cat==='spread'
            ?
              <p>1/2 LB</p>
            :
              null
          }
        </div>
        {
          storeItem.cat==='bagel'
           ?
            <button
                onClick={()=>{
                  const selection:string = 'two';
                  modifyCart(
                    getItemQuantityFromCart(cart,storeItem.name,selection)+1,
                    storeItem._id.toString(),
                    setCart,
                    isRequestPending,
                    setIsRequestPending,
                    selection,
                    true
                  )
                }}
              >
                +
              </button>
           :
            null
        }
        {
          storeItem.cat==='spread'
           ?
            <button
                onClick={()=>{
                  const selection:string = 'halflb';
                  modifyCart(
                    getItemQuantityFromCart(cart,storeItem.name,selection)+1,
                    storeItem._id.toString(),
                    setCart,
                    isRequestPending,
                    setIsRequestPending,
                    selection,
                    true
                  )
                }}
              >
                +
              </button>
           :
            null
        }
      </div>
    </div>
  )
}