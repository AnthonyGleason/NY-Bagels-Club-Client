import React from 'react';
import './StoreItems.css';
import plainBagelsImg from '../../../Assets/bagels/plain.jpg';
import mixedBagelsImg from '../../../Assets/loadingBagels.jpg';
import everythingBagelsImg from '../../../Assets/bagels/everything.jpeg';
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
        itemDozenPrice={29.99}
        setTotalCartItems={setTotalCartItems}
        totalCartItems={totalCartItems}
      />
      <StoreItem 
        itemImgUrl={everythingBagelsImg}
        itemName='Everything Bagels'
        itemDozenPrice={34.99}
        setTotalCartItems={setTotalCartItems}
        totalCartItems={totalCartItems}
      />
      <StoreItem 
        itemImgUrl={mixedBagelsImg}
        itemName='Mix and Match'
        itemDozenPrice={39.99}
        itemFourPackPrice={16.99}
        setTotalCartItems={setTotalCartItems}
        totalCartItems={totalCartItems}
      />
    </section>
  )
}