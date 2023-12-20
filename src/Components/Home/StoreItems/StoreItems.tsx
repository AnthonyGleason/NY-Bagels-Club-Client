import React, { useEffect, useRef, useState } from 'react';
import './StoreItems.css';
import StoreItem from './StoreItem/StoreItem';
import { getMembershipTier } from '../../../Helpers/auth';
import { Cart, Product } from '../../../Interfaces/interfaces';
import { fetchAndSetStoreItems } from '../../../Helpers/store';

export default function StoreItems({
  cart,
  setCart,
  isSignedIn,
  storeItems,
  setStoreItems
}: {
  cart: Cart;
  setCart: Function;
  isSignedIn: boolean;
  storeItems: Product[];
  setStoreItems: Function;
}) {
  const [userTier, setUserTier] = useState<string>('Non-Member');
  const isInitialLoad = useRef(true);

  const sortStoreItems = (a: Product, b: Product) => {
    if (a.cat === 'bagel' && b.cat !== 'bagel') {
      return -1;
    } else if (a.cat === 'pastry' && b.cat !== 'bagel' && b.cat !== 'pastry') {
      return -1;
    } else {
      return 1;
    }
  };

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      fetchAndSetStoreItems(setStoreItems);
      getMembershipTier(setUserTier);
    }
  }, [isInitialLoad]);

  const filteredStoreItems = storeItems
    .filter((item) => {
      return (item.cat !=='mystery')
    })
    .sort(sortStoreItems);

  return (
    <section className='store-items-container'>
      {filteredStoreItems.map((storeItem: Product) => (
        <StoreItem
          key={storeItem._id}
          storeItem={storeItem}
          cart={cart}
          setCart={setCart}
          userTier={userTier}
          isSignedIn={isSignedIn}
          setUserTier={setUserTier}
        />
      ))}
    </section>
  );
}