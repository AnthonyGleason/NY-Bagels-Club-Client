import React, { useEffect, useState } from 'react';
import { Item } from '../../../../Interfaces/interfaces';
import { getServerUrlPrefix } from '../../../../Config/clientSettings';

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
  
  const modifyCart = async function(modifier:number,curVal:number,itemQuantitySetter:Function,itemName:string){
    //calculate new quantity based on modifier
    const updatedQuantity:number = curVal + modifier;
    //make a request to the server to update quantity for cart
    const response = await fetch(`${getServerUrlPrefix()}/api/shop/carts`,{
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('cartToken')}`
      },
      body: JSON.stringify({
        itemName: itemName,
        quantity: updatedQuantity,
      })
    });
    const responseData = await response.json();
    if (responseData.cartToken && responseData.cart){
      //replace the cartToken in localStorage with the updated cartToken
      localStorage.setItem('cartToken',responseData.cartToken);
      //set the item quantity with the updated quantity with the updated cart (so that we know their request was successfully processed)
      itemQuantitySetter(updatedQuantity);
      //update cart state
      setCart(responseData.cart.items);
    };
  };

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