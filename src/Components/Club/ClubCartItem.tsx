import React, { useEffect, useState } from 'react';
import xImg from '../../Assets/icons/x.svg';
import { CartItem } from '../../Interfaces/interfaces';
import { handleCartItemInputChange, modifyCart } from '../../Helpers/cart';

export default function ClubCartItem({cartItem,setCart}:{cartItem:CartItem,setCart:Function}){
  const [isRequestPending,setIsRequestPending] = useState<boolean>(false);
  const [cartItemQuantity,setCartItemQuantity] = useState<number | string>(cartItem.quantity);

  useEffect(()=>{
    setCartItemQuantity(cartItem.quantity);
  },[cartItem.quantity]);

  return(
    <div className='club-cart-item'>
      <div>
        <p>{cartItem.itemData.name}</p>
        <p>{cartItem.selection === 'two' ? 'Two Pack(s)' : ''}{cartItem.selection === 'halflb' ? '1/2 LB' : ''}</p>
      </div>
      <p>
        {
          cartItem.itemData.cat==='mystery' ?
            cartItem.quantity+' '
          :
          <input 
            type='number'
            value={cartItemQuantity} 
            onChange={(e) => { 
              handleCartItemInputChange(
                e,
                setCartItemQuantity,
                cartItem,
                setCart,
                isRequestPending,
                setIsRequestPending,
                cartItem.selection || '',
                true
              )
            }}
          /> 
        }
        
        in cart
        </p>
      {
        cartItem.itemData.cat==='mystery'
          ?
          <button 
            type='button' 
            className='button-styled' 
          >
            <p>Included</p>
          </button>
        :
          <button 
            type='button' 
            className='button-styled' 
            onClick={() => {
              modifyCart(
                0,
                cartItem.itemData._id,
                setCart,
                isRequestPending,
                setIsRequestPending,
                cartItem.selection || '',
                true
              );
            }}
          >
          <p>Remove</p>
          <img src={xImg} alt='remove from cart' />
        </button>
      }
    </div>
  )
};