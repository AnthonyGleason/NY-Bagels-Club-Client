import React, { useEffect, useState } from 'react';

export default function StoreItem({
  itemImgUrl,
  itemName,
  itemPrice,
  setTotalCartItems,
  totalCartItems
}:{
  itemImgUrl:string,
  itemName: string,
  itemPrice: number,
  setTotalCartItems:Function,
  totalCartItems:number
}){
  const [amountOfItemInCart,setAmountOfItemInCart] = useState<number>(0);
  const modifyCart = function(modifier:number){
    setTotalCartItems(modifier+totalCartItems);
    setAmountOfItemInCart(modifier+amountOfItemInCart);
  };

  return(
    <article className='store-item'>
      <img src={itemImgUrl} alt={itemName} />
      <p className='item-info'>
        {itemName} ${itemPrice}
      </p>
      <div className='store-item-buttons'>
        <button onClick={()=>{modifyCart(-1)}}>-</button>
        <span>{amountOfItemInCart} Dozen(s)</span>
        <button onClick={()=>{modifyCart(1)}}>+</button>
      </div>
    </article>
  );
}