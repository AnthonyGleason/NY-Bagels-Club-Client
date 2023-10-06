import React, { useEffect, useState } from 'react';
import { getCartItemSubtotal, handleCartItemInputChange, modifyCart } from '../../../Helpers/cart';
import { Item } from '../../../Interfaces/interfaces';
import removeImg from '../../../Assets/icons/x.svg';

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
  const [cartItemQuantity,setCartItemQuantity] = useState<number | string>(cartItem.quantity);
  const [cartItemSubtotal,setCartItemSubtotal] = useState<number>(getCartItemSubtotal(cartItem));
  const [isRequestPending,setIsRequestPending] = useState<boolean>(false);
  //whenever the cartItem quantity is updated, update the states
  useEffect(()=>{
    //update item quantity
    setCartItemQuantity(cartItem.quantity);
    //update subtotal
    setCartItemSubtotal(getCartItemSubtotal(cartItem))
  },[cartItem.quantity])

  if (!isCheckoutView){
    return(
      <tr>
        <td className='item-name'>{cartItem.name}</td>
        <td>
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
                setIsRequestPending
              )
            }}
          />
        </td>
        <td className='item-subtotal'>
          ${cartItemSubtotal}
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
          <span>{cartItemQuantity}</span>
        </td>
        <td className='item-subtotal'>
          ${parseFloat((cartItem.price * cartItem.quantity).toString()).toFixed(2)}
        </td>
      </tr>
    )
  };
};