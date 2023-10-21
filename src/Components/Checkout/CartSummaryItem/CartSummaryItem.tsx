import React, { useEffect, useState } from 'react';
import { getCartItemSubtotal, getSelectionName, handleCartItemInputChange, modifyCart } from '../../../Helpers/cart';
import removeImg from '../../../Assets/icons/x.svg';
import { CartItem } from '../../../Interfaces/interfaces';

export default function CartSummaryItem(
  {
    cartItem,
    setCart,
    isCheckoutView
  }:{
    cartItem:CartItem,
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
  },[cartItem.quantity, cartItem])

  if (!isCheckoutView){
    return(
      <tr>
        <td className='item-name'>{cartItem.itemData.name} {getSelectionName(cartItem)}</td>
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
                setIsRequestPending,
                cartItem.selection || ''
              )
            }}
          />
        </td>
        <td className='item-subtotal'>
          ${cartItemSubtotal.toFixed(2)}
        </td>
        <td className='item-remove-wrapper'>
          <button onClick={() => {
            modifyCart(
              0,
              cartItem.itemData._id,
              setCart,
              isRequestPending,
              setIsRequestPending,
              cartItem.selection || ''
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
        <td className='item-name'>{cartItem.itemData.name} {getSelectionName(cartItem)}</td>
        <td>
          <span>{cartItemQuantity}</span>
        </td>
        <td className='item-subtotal'>
          ${parseFloat((cartItem.unitPrice * cartItem.quantity).toString()).toFixed(2)}
        </td>
      </tr>
    )
  };
};