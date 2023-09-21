import React from 'react';
import './StoreItems.css';
import plainBagelsImg from '../../../Assets/bagels/plain.jpg';
import mixedBagelsImg from '../../../Assets/loadingBagels.jpg';
import everythingBagelsImg from '../../../Assets/bagels/everything.jpeg';
import StoreItem from './StoreItem/StoreItem';
import { Item } from '../../../Interfaces/interfaces';

export default function StoreItems(
    {
      cart,
      setCart
    }:{
      cart: Item[],
      setCart: Function
    }
  ){
  return(
    <section className='store-items-container'>
      <StoreItem 
        itemImgUrl={plainBagelsImg}
        itemName='Plain Bagels'
        itemIdentifier='Plain Bagels Dozen'
        itemDozenPrice={29.99}
        cart={cart}
        setCart={setCart}
      />
      <StoreItem 
        itemImgUrl={everythingBagelsImg}
        itemName='Everything Bagels'
        itemIdentifier='Everything Bagels Dozen'
        itemDozenPrice={34.99}
        cart={cart}
        setCart={setCart}
      />
      <StoreItem 
        itemImgUrl={mixedBagelsImg}
        itemName='Mix and Match'
        itemDozenPrice={39.99}
        itemFourPackPrice={16.99}
        cart={cart}
        setCart={setCart}
      />
    </section>
  )
}