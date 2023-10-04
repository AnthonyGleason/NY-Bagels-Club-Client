import React, { useEffect, useState } from 'react';
import { Item } from '../../../../Interfaces/interfaces';
import { modifyCart } from '../../../../Helpers/cart';
import './StoreItem.css';
import { getServerUrlPrefix } from '../../../../Config/clientSettings';

export default function StoreItem({
  itemName,
  itemID,
  itemPrice,
  cart,
  setCart,
  isAltTheme,
  userTier
}:{
  itemName: string,
  itemID:string,
  itemPrice:number,
  cart:Item[],
  setCart:Function,
  isAltTheme:boolean,
  userTier:string
}){
  const [itemQuantity,setItemQuantity] = useState(0);
  const [itemImgSrc, setItemImgSrc] = useState<string | undefined>();
  const [isRequestPending, setIsRequestPending] = useState<boolean>(false);
  

 //handle initial page load
 useEffect(()=>{
    //dynamically import images
    import(`../../../../Assets/storeItems/${itemID}.jpg`)
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

  const altThemeClass: string = function() {
    return isAltTheme ? 'alt-store-item' : '';
  }();
  
  const calcPriceByUserTier = function(itemPrice:number,userTier:string):string{
    switch(userTier){
      case 'Non-Member':
        return (itemPrice).toFixed(2);
      case 'Gold Member':
        return (itemPrice-(itemPrice*0.05)).toFixed(2);
      case 'Platinum Member':
        return (itemPrice-(itemPrice*0.10)).toFixed(2);
      case 'Diamond Member':
        return (itemPrice-(itemPrice*0.15)).toFixed(2)
      default:
        return (itemPrice).toFixed(2);
    }
  };

  const getCurrentUserTierPricing = function(itemPrice:number,userTier:string){
    return(
      <>
        {userTier} Pricing
        <br />
        ${calcPriceByUserTier(itemPrice,userTier)}
      </>
    )
  };
  
  return(
    <article id={`item-${itemID}`} className={`store-item ${altThemeClass}`}>
      <p data-aos='fade-right' className='item-info'>
        {/* dynamically show prices based on access level, server will verify price and membership level */}
        {itemName} 
        <br />
        {getCurrentUserTierPricing(itemPrice,userTier)}
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