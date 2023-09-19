import React, { useEffect, useState } from 'react';

export default function StoreItem({
  itemImgUrl,
  itemName,
  itemDozenPrice,
  itemFourPackPrice,
  setTotalCartItems,
  totalCartItems
}:{
  itemImgUrl:string,
  itemName: string,
  itemDozenPrice: number,
  itemFourPackPrice?: number,
  setTotalCartItems:Function,
  totalCartItems:number
}){
  const [amountOfDozenInCart,setAmountOfDozenInCart] = useState<number>(0);
  
  const [plainFourPacks,setPlainFourPacks] = useState<number>(0);
  const [everythingFourPacks,setEverythingFourPacks] = useState<number>(0);
  const [cinRaisin,setCinRaisinFourPacks] = useState<number>(0);
  const [sesameFourPacks,setSesameFourPacks] = useState<number>(0);
  const [poppyFourPacks,setPoppyFourPacks] = useState<number>(0);
  const [blueberryFourPacks,setBlueberryFourPacks] = useState<number>(0);

  const modifyCart = function(modifier:number,curVal:number,valSetter:Function){
    //verify the change will be 0 or greater
    if (curVal+modifier>=0){
      valSetter(curVal+modifier);
      setTotalCartItems(totalCartItems+modifier);
    };
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
            <button onClick={()=>{modifyCart(1,plainFourPacks,setPlainFourPacks)}}>+</button>
            <button onClick={()=>{modifyCart(-1,plainFourPacks,setPlainFourPacks)}}>-</button>
          </li>
          <li className='store-item-buttons'>
            <span>{everythingFourPacks} Everything Four Pack(s)</span>
            <button onClick={()=>{modifyCart(1,everythingFourPacks,setEverythingFourPacks)}}>+</button>
            <button onClick={()=>{modifyCart(-1,everythingFourPacks,setEverythingFourPacks)}}>-</button>
          </li>
          <li className='store-item-buttons'>
            <span>{cinRaisin} Cinnamon Raisin Four Pack(s)</span>
            <button onClick={()=>{modifyCart(1,cinRaisin,setCinRaisinFourPacks)}}>+</button>
            <button onClick={()=>{modifyCart(-1,cinRaisin,setCinRaisinFourPacks)}}>-</button>
          </li>
          <li className='store-item-buttons'>
            <span>{sesameFourPacks} Sesame Seeds Four Pack(s)</span>
            <button onClick={()=>{modifyCart(1,sesameFourPacks,setSesameFourPacks)}}>+</button>
            <button onClick={()=>{modifyCart(-1,sesameFourPacks,setSesameFourPacks)}}>-</button>
          </li>
          <li className='store-item-buttons'>
            <span>{poppyFourPacks} Poppy Seeds Four Pack(s)</span>
            <button onClick={()=>{modifyCart(1,poppyFourPacks,setPoppyFourPacks)}}>+</button>
            <button onClick={()=>{modifyCart(-1,poppyFourPacks,setPoppyFourPacks)}}>-</button>
          </li>
          <li className='store-item-buttons'>
            <span>{blueberryFourPacks} Blueberry Four Pack(s)</span>
            <button onClick={()=>{modifyCart(1,blueberryFourPacks,setBlueberryFourPacks)}}>+</button>
            <button onClick={()=>{modifyCart(-1,blueberryFourPacks,setBlueberryFourPacks)}}>-</button>
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
            <button onClick={()=>{modifyCart(1,amountOfDozenInCart,setAmountOfDozenInCart)}}>+</button>
            <button onClick={()=>{modifyCart(-1,amountOfDozenInCart,setAmountOfDozenInCart)}}>-</button>
          </li>
        </ol>
      </article>
    );
  };
};