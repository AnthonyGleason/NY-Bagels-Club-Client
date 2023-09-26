import React, { useEffect, useState } from 'react';
import { Item } from '../../../../Interfaces/interfaces';
import { modifyCart } from '../../../../Helpers/auth';

export default function StoreItem({
  itemName,
  itemID,
  itemPrice,
  cart,
  setCart
}:{
  itemName: string,
  itemID:string,
  itemPrice:number,
  cart:Item[],
  setCart:Function
}){
  const [itemQuantity,setItemQuantity] = useState(0);
  const [itemImgSrc, setItemImgSrc] = useState<string | undefined>();

  const getItemQuantityFromCart = function(itemID:string,cart:Item[]):number{
    let itemQuantity:number = 0;
    const item:Item | undefined= cart.find((cartItem:Item)=>{
      return cartItem._id===itemID
    });
    if (item) itemQuantity = item.quantity;
    return itemQuantity;
  };

  //handle initial page load
  useEffect(()=>{
    //dynamically import image
    import(`../../../../Assets/bagels/${itemID}.jpg`)
      .then((module)=>{
        setItemImgSrc(module.default);
      })
  },[]);

  //whenever the cart is updated update the quantities of items
  useEffect(()=>{
    setItemQuantity(getItemQuantityFromCart(itemID,cart));
  },[cart]);

  return(
    <article className='store-item'>
      <img src={itemImgSrc} alt={`Item ${itemID}`} />
      <p className='item-info'>
        {itemName} 
        <br />
        ${itemPrice} each
      </p>
      <div className='store-item-buttons'>
        <span>{itemQuantity} {itemName}(s)</span>
        <button className='quantity-button' onClick={()=>{
          modifyCart(
            getItemQuantityFromCart(itemID,cart)+1,
            itemID,
            setCart
          )
        }}>+</button>
        <button className='quantity-button' onClick={()=>{
          modifyCart(
            getItemQuantityFromCart(itemID,cart)-1,
            itemID,
            setCart
          )
        }}>-</button>
      </div>
    </article>
  );
};