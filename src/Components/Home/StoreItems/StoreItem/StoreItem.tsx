import React, { useEffect, useState } from 'react';
import { Item } from '../../../../Interfaces/interfaces';
import { modifyCart } from '../../../../Helpers/auth';

export default function StoreItem({
  itemName,
  itemID,
  itemPrice,
  cart,
  setCart,
  isAltTheme
}:{
  itemName: string,
  itemID:string,
  itemPrice:number,
  cart:Item[],
  setCart:Function,
  isAltTheme:boolean
}){
  const [itemQuantity,setItemQuantity] = useState(0);
  const [itemImgSrc, setItemImgSrc] = useState<string | undefined>();
  const [isRequestPending, setIsRequestPending] = useState<boolean>(false);
  
 //handle initial page load
 useEffect(()=>{
    //dynamically import images
    import(`../../../../Assets/bagels/${itemID}.jpg`)
      .then((module)=>{
        setItemImgSrc(module.default);
      });
  },[]);

  //whenever the cart is updated update the quantities of items
  useEffect(()=>{
    setItemQuantity(getItemQuantityFromCart(itemID,cart));
  },[cart]);

  const getItemQuantityFromCart = function(itemID:string,cart:Item[]):number{
    let itemQuantity:number = 0;
    const item:Item | undefined= cart.find((cartItem:Item)=>{
      return cartItem._id===itemID
    });
    if (item) itemQuantity = item.quantity;
    return itemQuantity;
  };

  const getAltThemeClass = function() {
    return isAltTheme ? 'alt-store-item' : '';
  };
  
  const altThemeClass: string = getAltThemeClass();
  
  return(
    <article id={`item-${itemID}`} className={`store-item ${altThemeClass}`}>
      <p data-aos='fade-right' className='item-info'>
        {itemName} 
        <br />
        ${itemPrice} each
      </p>
      <img data-aos='fade-right' src={itemImgSrc} alt={`Item ${itemID}`} />
      <div data-aos='fade-right' className='store-item-buttons'>
        <span>{itemQuantity} in Basket</span>
        <button className='quantity-button' onClick={()=>{
          modifyCart(
            getItemQuantityFromCart(itemID,cart)+1,
            itemID,
            setCart,
            isRequestPending,
            setIsRequestPending
          )
        }}>+</button>
        <button className='quantity-button' onClick={()=>{
          modifyCart(
            getItemQuantityFromCart(itemID,cart)-1,
            itemID,
            setCart,
            isRequestPending,
            setIsRequestPending
          )
        }}>-</button>
      </div>
    </article>
  );
};