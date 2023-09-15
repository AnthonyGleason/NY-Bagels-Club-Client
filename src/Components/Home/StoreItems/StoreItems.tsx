import React from 'react';
import './StoreItems.css';
import plainBagelsImg from '../../../Assets/bagels/plain.jpg';
import mixedBagelsImg from '../../../Assets/loadingBagels.jpg';
import StoreItem from './StoreItem/StoreItem';
export default function StoreItems(
    {
      totalCartItems,
      setTotalCartItems
    }:{
      totalCartItems:number,
      setTotalCartItems:Function
    }
  ){
  return(
    <section className='store-items-container'>
      <StoreItem 
        itemImgUrl={plainBagelsImg}
        itemName='Plain Bagels'
        itemPrice={85}
        setTotalCartItems={setTotalCartItems}
        totalCartItems={totalCartItems}
      />
      <StoreItem 
        itemImgUrl={plainBagelsImg}
        itemName='Everything Bagels'
        itemPrice={85}
        setTotalCartItems={setTotalCartItems}
        totalCartItems={totalCartItems}
      />
      <StoreItem 
        itemImgUrl={mixedBagelsImg}
        itemName='Build Your Own Dozen Bagels'
        itemPrice={85}
        setTotalCartItems={setTotalCartItems}
        totalCartItems={totalCartItems}
      />
    </section>
  )
}