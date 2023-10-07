import React, { useEffect, useState } from 'react';
import './StoreItem.css';
import { BagelItem, Cart, CartItem, SpreadItem } from '../../../../Interfaces/interfaces';
import { modifyCart } from '../../../../Helpers/cart';

export default function StoreItem({
  itemName,
  itemID,
  itemPrice,
  cart,
  setCart,
  isAltTheme,
  userTier,
  selection
}:{
  itemName: string,
  itemID:string,
  itemPrice:number,
  cart:Cart,
  setCart:Function,
  isAltTheme:boolean,
  userTier:string,
  selection?:string
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

  const getItemQuantityFromCart = function(itemName: string, selection?: string): number {
    if (!cart || !cart.items) return 0;
  
    let quantity = 0;
  
    for (let index = 0; index < cart.items.length; index++) {
      const cartItem: CartItem = cart.items[index];
  
      // Check if the selection and itemName match
      if (
        cartItem.selection === selection &&
        (cartItem.itemData.cat === 'bagel' || cartItem.itemData.cat === 'spread') &&
        cartItem.itemData.name === itemName
      ) {
        quantity = cartItem.quantity;
        break; // Exit the loop if the item is found
      }
    };
    
    return quantity;
  };
  

  //whenever the cart is updated update the quantities of items
  useEffect(()=>{
    setItemQuantity(getItemQuantityFromCart(itemName,selection));
  },[cart]);

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
            getItemQuantityFromCart(itemName,selection)+1,
            itemID,
            setCart,
            isRequestPending,
            setIsRequestPending,
            selection || ''
          )
        }}>+</button>
        <button className='quantity-button' onClick={()=>{
          modifyCart(
            getItemQuantityFromCart(itemName,selection)-1,
            itemID,
            setCart,
            isRequestPending,
            setIsRequestPending,
            selection || ''
          )
        }}>-</button>
      </div>
    </article>
  );
};