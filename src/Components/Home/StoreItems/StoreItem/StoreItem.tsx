import React, { useEffect, useState } from 'react';
import { Item } from '../../../../Interfaces/interfaces';

export default function StoreItem({
  itemImgUrl,
  itemName,
  itemDozenPrice,
  itemFourPackPrice,
  itemIdentifier,
  cart,
  setCart
}:{
  itemImgUrl:string,
  itemName: string,
  itemDozenPrice: number,
  itemFourPackPrice?: number,
  itemIdentifier?:string,
  cart:Item[],
  setCart:Function
}){
  const getCurrentQuantityFromCart = function(itemName:string,cart:Item[]):number{
    let index:number | undefined;
    //handle cart length is 0 (empty cart)
    if (cart.length===0) return 0;
    //find index of item
    for(let i=0;i<=cart.length;i++){
      if (cart[i].name===itemName){
        index=i;
        break;
      };
    };
    //an index and quantity was found
    if (index){
      const quantity:number | undefined = cart[index].quantity;
      return quantity || 0;
    }else{
      return 0;
    }
  };

  const [amountOfDozenInCart,setAmountOfDozenInCart] = useState<number>(getCurrentQuantityFromCart(itemIdentifier || '',cart));
  const [plainFourPacks,setPlainFourPacks] = useState<number>(getCurrentQuantityFromCart('Plain Four Pack',cart));
  const [everythingFourPacks,setEverythingFourPacks] = useState<number>(getCurrentQuantityFromCart('Everything Four Pack',cart));
  const [cinRaisin,setCinRaisinFourPacks] = useState<number>(getCurrentQuantityFromCart('Cinnamon Raisin Four Pack',cart));
  const [sesameFourPacks,setSesameFourPacks] = useState<number>(getCurrentQuantityFromCart('Sesame Seeds Four Pack',cart));
  const [poppyFourPacks,setPoppyFourPacks] = useState<number>(getCurrentQuantityFromCart('Poppy Seeds Four Pack',cart));
  const [blueberryFourPacks,setBlueberryFourPacks] = useState<number>(getCurrentQuantityFromCart('Blueberry Four Pack',cart));
  
  
  const modifyCart = function(modifier:number,curVal:number,itemQuantitySetter:Function,itemName:string){
    //calculate new quantity based on modifier
    //make a request to the server to update quantity for cart
    //replace the cartToken in localStorage with the updated cartToken
    //set the item quantity with the updated quantity with the updated cart (so that we know their request was successfully processed)
    //update cart state
  };

  if (itemName==='Mix and Match'){
    return(
      <article className='store-item'>
        <img src={itemImgUrl} alt={itemName} />
        <p className='item-info'>
          {itemName} 
          <br />
          4 Pack - ${itemFourPackPrice} each
        </p>
        <ol>
          <li className='store-item-buttons'>
            <span>{plainFourPacks} Plain Four Pack(s)</span>
            <button onClick={()=>{modifyCart(1,plainFourPacks,setPlainFourPacks,'Plain Four Pack')}}>+</button>
            <button onClick={()=>{modifyCart(-1,plainFourPacks,setPlainFourPacks,'Plain Four Pack')}}>-</button>
          </li>
          <li className='store-item-buttons'>
            <span>{everythingFourPacks} Everything Four Pack(s)</span>
            <button onClick={()=>{modifyCart(1,everythingFourPacks,setEverythingFourPacks,'Everything Four Pack')}}>+</button>
            <button onClick={()=>{modifyCart(-1,everythingFourPacks,setEverythingFourPacks,'Everything Four Pack')}}>-</button>
          </li>
          <li className='store-item-buttons'>
            <span>{cinRaisin} Cinnamon Raisin Four Pack(s)</span>
            <button onClick={()=>{modifyCart(1,cinRaisin,setCinRaisinFourPacks,'Cinnamon Raisin Four Pack')}}>+</button>
            <button onClick={()=>{modifyCart(-1,cinRaisin,setCinRaisinFourPacks,'Cinnamon Raisin Four Pack')}}>-</button>
          </li>
          <li className='store-item-buttons'>
            <span>{sesameFourPacks} Sesame Seeds Four Pack(s)</span>
            <button onClick={()=>{modifyCart(1,sesameFourPacks,setSesameFourPacks,'Sesame Seeds Four Pack')}}>+</button>
            <button onClick={()=>{modifyCart(-1,sesameFourPacks,setSesameFourPacks,'Sesame Seeds Four Pack')}}>-</button>
          </li>
          <li className='store-item-buttons'>
            <span>{poppyFourPacks} Poppy Seeds Four Pack(s)</span>
            <button onClick={()=>{modifyCart(1,poppyFourPacks,setPoppyFourPacks,'Poppy Seeds Four Pack')}}>+</button>
            <button onClick={()=>{modifyCart(-1,poppyFourPacks,setPoppyFourPacks,'Poppy Seeds Four Pack')}}>-</button>
          </li>
          <li className='store-item-buttons'>
            <span>{blueberryFourPacks} Blueberry Four Pack(s)</span>
            <button onClick={()=>{modifyCart(1,blueberryFourPacks,setBlueberryFourPacks,'Blueberry Four Pack')}}>+</button>
            <button onClick={()=>{modifyCart(-1,blueberryFourPacks,setBlueberryFourPacks,'Blueberry Four Pack')}}>-</button>
          </li>
        </ol>
      </article>
    );
  }else{
    return(
      <article className='store-item'>
        <img src={itemImgUrl} alt={itemName} />
        <p className='item-info'>
          {itemName}
          <br />
          1 Dozen - ${itemDozenPrice} each
        </p>
        <ol>
          <li className='store-item-buttons'>
            <span>{amountOfDozenInCart} Dozen(s)</span>
            <button onClick={()=>{modifyCart(1,amountOfDozenInCart,setAmountOfDozenInCart,itemIdentifier || '')}}>+</button>
            <button onClick={()=>{modifyCart(-1,amountOfDozenInCart,setAmountOfDozenInCart,itemIdentifier || '')}}>-</button>
          </li>
        </ol>
      </article>
    );
  };
};