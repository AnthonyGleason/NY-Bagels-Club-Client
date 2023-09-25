import React, { useEffect, useState } from 'react';
import { Item } from '../../../../Interfaces/interfaces';
import { getServerUrlPrefix } from '../../../../Config/clientSettings';
import { modifyCart } from '../../../../Helpers/auth';

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
  const [amountOfDozenInCart,setAmountOfDozenInCart] = useState<number>(0);
  const [plainFourPacks,setPlainFourPacks] = useState<number>(0);
  const [everythingFourPacks,setEverythingFourPacks] = useState<number>(0);
  const [cinRaisin,setCinRaisinFourPacks] = useState<number>(0);
  const [sesameFourPacks,setSesameFourPacks] = useState<number>(0);
  const [poppyFourPacks,setPoppyFourPacks] = useState<number>(0);
  const [blueberryFourPacks,setBlueberryFourPacks] = useState<number>(0);
  
  //when cart is updated update the quantities of items
  useEffect(()=>{
    //handle empty cart
    if (!cart) return;

    //cart is populated with items
    cart.forEach((item:Item)=>{
      switch(item.name){
        case 'Plain Four Pack':
          setPlainFourPacks(item.quantity);
          break;
        case 'Everything Four Pack':
          setEverythingFourPacks(item.quantity);
          break;
        case 'Cinnamon Raisin Four Pack':
          setCinRaisinFourPacks(item.quantity);
          break;
        case 'Sesame Seeds Four Pack':
          setSesameFourPacks(item.quantity);
          break;
        case 'Poppy Seeds Four Pack':
          setPoppyFourPacks(item.quantity);
          break;
        case 'Blueberry Four Pack':
          setBlueberryFourPacks(item.quantity);
          break;
        case 'Plain Bagels Dozen':
          setAmountOfDozenInCart(item.quantity);
          break;
        case 'Everything Bagels Dozen':
          setAmountOfDozenInCart(item.quantity);
          break;
        default:
          break;
      };
    });
  },[cart]);

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
            <button onClick={()=>{modifyCart(1,plainFourPacks,'Plain Four Pack',setCart,setPlainFourPacks)}}>+</button>
            <button onClick={()=>{modifyCart(-1,plainFourPacks,'Plain Four Pack',setCart,setPlainFourPacks)}}>-</button>
          </li>
          <li className='store-item-buttons'>
            <span>{everythingFourPacks} Everything Four Pack(s)</span>
            <button onClick={()=>{modifyCart(1,everythingFourPacks,'Everything Four Pack',setCart,setEverythingFourPacks)}}>+</button>
            <button onClick={()=>{modifyCart(-1,everythingFourPacks,'Everything Four Pack',setCart,setEverythingFourPacks)}}>-</button>
          </li>
          <li className='store-item-buttons'>
            <span>{cinRaisin} Cinnamon Raisin Four Pack(s)</span>
            <button onClick={()=>{modifyCart(1,cinRaisin,'Cinnamon Raisin Four Pack',setCart,setCinRaisinFourPacks)}}>+</button>
            <button onClick={()=>{modifyCart(-1,cinRaisin,'Cinnamon Raisin Four Pack',setCart,setCinRaisinFourPacks)}}>-</button>
          </li>
          <li className='store-item-buttons'>
            <span>{sesameFourPacks} Sesame Seeds Four Pack(s)</span>
            <button onClick={()=>{modifyCart(1,sesameFourPacks,'Sesame Seeds Four Pack',setCart,setSesameFourPacks)}}>+</button>
            <button onClick={()=>{modifyCart(-1,sesameFourPacks,'Sesame Seeds Four Pack',setCart,setSesameFourPacks)}}>-</button>
          </li>
          <li className='store-item-buttons'>
            <span>{poppyFourPacks} Poppy Seeds Four Pack(s)</span>
            <button onClick={()=>{modifyCart(1,poppyFourPacks,'Poppy Seeds Four Pack',setCart,setPoppyFourPacks)}}>+</button>
            <button onClick={()=>{modifyCart(-1,poppyFourPacks,'Poppy Seeds Four Pack',setCart,setPoppyFourPacks)}}>-</button>
          </li>
          <li className='store-item-buttons'>
            <span>{blueberryFourPacks} Blueberry Four Pack(s)</span>
            <button onClick={()=>{modifyCart(1,blueberryFourPacks,'Blueberry Four Pack',setCart,setBlueberryFourPacks)}}>+</button>
            <button onClick={()=>{modifyCart(-1,blueberryFourPacks,'Blueberry Four Pack',setCart,setBlueberryFourPacks)}}>-</button>
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
            <button onClick={()=>{modifyCart(1,amountOfDozenInCart,itemIdentifier || '',setCart,setAmountOfDozenInCart)}}>+</button>
            <button onClick={()=>{modifyCart(-1,amountOfDozenInCart,itemIdentifier || '',setCart,setAmountOfDozenInCart)}}>-</button>
          </li>
        </ol>
      </article>
    );
  };
};