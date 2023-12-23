import React, { useEffect, useRef, useState } from 'react';
import './StoreItems.css';
import StoreItem from './StoreItem/StoreItem';
import { getMembershipTier } from '../../../Helpers/auth';
import { Cart, Product } from '../../../Interfaces/interfaces';
import {motion} from 'framer-motion';
import { fetchAndSetStoreItems } from '../../../Helpers/store';

export default function StoreItems({
  cart,
  setCart,
  isSignedIn,
}: {
  cart: Cart;
  setCart: Function;
  isSignedIn: boolean;
}) {
  const [userTier, setUserTier] = useState<string>('Non-Member');
  const isInitialLoad = useRef(true);

  const [bagelItems,setBagelItems] = useState<Product[]>([]);
  const [pastryItems,setPastryItems] = useState<Product[]>([]);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      getMembershipTier(setUserTier);
      fetchAndSetStoreItems(setBagelItems,setPastryItems);
    }
  }, [isInitialLoad]);
  
  return (
    <section id='store' className='store-items-container'>
      <h3 
        className='store-items-heading'
        id='store-item-heading'
      >
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{duration: 2.5}}
          viewport={{once: false}}
        >
          A Taste of New York to Your Doorstep
        </motion.span>
      </h3>
      {
        bagelItems.map((storeItem: Product) => (
          <StoreItem
            key={storeItem._id}
            storeItem={storeItem}
            cart={cart}
            setCart={setCart}
            userTier={userTier}
            isSignedIn={isSignedIn}
            setUserTier={setUserTier}
          />
        ))
      }
      {
        pastryItems.map((storeItem: Product) => (
          <StoreItem
            key={storeItem._id}
            storeItem={storeItem}
            cart={cart}
            setCart={setCart}
            userTier={userTier}
            isSignedIn={isSignedIn}
            setUserTier={setUserTier}
          />
        ))
      }
    </section>
  );
}