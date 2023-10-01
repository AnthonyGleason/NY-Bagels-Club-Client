import React, { useEffect, useState } from 'react';
import { modifyCart } from '../../../Helpers/auth';
import { Item } from '../../../Interfaces/interfaces';
import removeImg from '../../../Assets/x.svg';

export default function CartSummaryItem(
  {
    cartItem,
    setCart,
    isCheckoutView
  }:{
    cartItem:Item,
    setCart:Function,
    isCheckoutView:boolean
  }
){
  const [cartQuantity,setCartQuantity] = useState<number | string>(cartItem.quantity);
  const [isRequestPending,setIsRequestPending] = useState<boolean>(false);
  useEffect(()=>{
    setCartQuantity(cartItem.quantity);
  },[cartItem])
  if (!isCheckoutView){
    return(
      <tr>
        <td className='item-name'>{cartItem.name}</td>
        <td>
          <input
            type='number'
            value={cartQuantity}
            onChange={(e) => {
              const newVal: number = parseInt(e.target.value);
              //we dont want users to accidently delete their cart so lets prevent that
              if (!newVal) {
                setCartQuantity('');
                return ;
              }
              modifyCart(
                newVal,
                cartItem._id,
                setCart,
                isRequestPending,
                setIsRequestPending
              );
            }}
          />
        </td>
        <td className='item-subtotal'>
          ${parseFloat((cartItem.price * cartItem.quantity).toString()).toFixed(2)}
        </td>
        <td className='item-remove-wrapper'>
          <button onClick={() => {
            modifyCart(
              0,
              cartItem._id,
              setCart,
              isRequestPending,
              setIsRequestPending
            );
          }}>
            <img src={removeImg} alt='remove from cart' />
          </button>
        </td>
      </tr>
    )
  }else{
    return(
      <tr>
        <td className='item-name'>{cartItem.name}</td>
        <td>
          <span>{cartQuantity}</span>
        </td>
        <td className='item-subtotal'>
          ${parseFloat((cartItem.price * cartItem.quantity).toString()).toFixed(2)}
        </td>
      </tr>
    )
  };
};