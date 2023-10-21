import React, { useEffect, useState } from 'react';
import './StoreItem.css';
import { BagelItem, Cart, SpreadItem } from '../../../../Interfaces/interfaces';
import { getItemQuantityFromCart, modifyCart } from '../../../../Helpers/cart';

export default function StoreItem({
  storeItem,
  cart,
  setCart,
  isAltTheme,
  userTier,
  isSignedIn,
  setUserTier
}:{
  storeItem: BagelItem | SpreadItem,
  cart:Cart,
  setCart:Function,
  isAltTheme:boolean,
  userTier:string,
  isSignedIn:boolean,
  setUserTier:Function
}){
  const [itemQuantity,setItemQuantity] = useState(0);
  const [fourPackItemQuantity,setFourPackItemQuantity] = useState(0);
  const [dozenItemQuantity,setDozenItemQuantity] = useState(0);
  const [itemImgSrc, setItemImgSrc] = useState<string | undefined>();
  const [isRequestPending, setIsRequestPending] = useState<boolean>(false);
  const [selection, setSelection] = useState<string>('');

 //handle initial page load
 useEffect(()=>{
    //dynamically import images
    import(`../../../../Assets/storeItems/${storeItem._id}.jpg`)
      .then((module)=>{
        setItemImgSrc(module.default);
      });
  },[]);

  //whenever the cart is updated update the quantities of items
  useEffect(()=>{
    if (storeItem.cat==='spread'){
      setItemQuantity(getItemQuantityFromCart(cart,storeItem.name,''));
    }else if (storeItem.cat==='bagel'){
      setFourPackItemQuantity(getItemQuantityFromCart(cart,storeItem.name,'four'));
      setDozenItemQuantity(getItemQuantityFromCart(cart,storeItem.name,'dozen'));
    };
  },[cart]);

  const altThemeClass: string = function() {
    return isAltTheme ? 'alt-store-item' : '';
  }();
  
  const calcPriceByUserTier = function(itemPrice:number,userTier:string):string{
    switch(userTier){
      case 'Non-Member':
        return (itemPrice).toFixed(2);
      case 'Gold Member':
        return (itemPrice-(itemPrice*0.05)).toFixed(2);
      case 'Platinum Member':
        return (itemPrice-(itemPrice*0.10)).toFixed(2);
      case 'Diamond Member':
        return (itemPrice-(itemPrice*0.15)).toFixed(2)
      default:
        return (itemPrice).toFixed(2);
    }
  };

  const getCurrentUserSpreadTierPricing = function(itemPrice:number,userTier:string){
    if (storeItem.cat==='spread'){
      return(
        <>
          <span>{userTier} Pricing</span>
          <span>${itemPrice}</span>
        </>
      )
    };
  };

  const getCurrentUserBagelTierPricing = function(fourPackPrice:number,dozenPrice:number,userTier:string){
    if (storeItem.cat==='bagel'){
      return(
        <>
          <span>{userTier} Pricing</span>
          <span>Four Pack ${fourPackPrice}</span>
          <span>Dozen ${dozenPrice}</span>
        </>
      )
    }
  };

  const getStoreItemButtons = function(){
    if (storeItem.cat==='bagel'){
      return(
        <>
          <div className='store-item-button-wrapper'>
            <span>{fourPackItemQuantity} Four Pack(s) in Basket</span>
            <button className='quantity-button' onClick={()=>{
              const selection:string = 'four';
              setSelection(selection);
              modifyCart(
                getItemQuantityFromCart(cart,storeItem.name,selection)+1,
                storeItem._id,
                setCart,
                isRequestPending,
                setIsRequestPending,
                selection
              )
            }}>+</button>
            <button className='quantity-button' onClick={()=>{
              const selection:string = 'four';
              setSelection(selection);
              modifyCart(
                getItemQuantityFromCart(cart,storeItem.name,selection)-1,
                storeItem._id,
                setCart,
                isRequestPending,
                setIsRequestPending,
                selection
              )
            }}>-</button>
          </div>
          <div className='store-item-button-wrapper'>
            <span>{dozenItemQuantity} Dozen(s) in Basket</span>
            <button className='quantity-button' onClick={()=>{
              const selection:string = 'dozen';
              setSelection(selection);
              modifyCart(
                getItemQuantityFromCart(cart,storeItem.name,selection)+1,
                storeItem._id,
                setCart,
                isRequestPending,
                setIsRequestPending,
                selection
              )
            }}>+</button>
            <button className='quantity-button' onClick={()=>{
              const selection:string = 'dozen';
              setSelection(selection);
              modifyCart(
                getItemQuantityFromCart(cart,storeItem.name,selection)-1,
                storeItem._id,
                setCart,
                isRequestPending,
                setIsRequestPending,
                selection
              )
            }}>-</button>
          </div>
        </>
      )
    }else if (storeItem.cat==='spread'){
      return(
        <div className='store-item-button-wrapper'>
          <span>{itemQuantity} in Basket</span>
          <button className='quantity-button' onClick={()=>{
            modifyCart(
              getItemQuantityFromCart(cart,storeItem.name)+1,
              storeItem._id,
              setCart,
              isRequestPending,
              setIsRequestPending,
              ''
            )
          }}>+</button>
          <button className='quantity-button' onClick={()=>{
            modifyCart(
              getItemQuantityFromCart(cart,storeItem.name)-1,
              storeItem._id,
              setCart,
              isRequestPending,
              setIsRequestPending,
              ''
            )
          }}>-</button>
        </div>
      )
    }else{
      return(<></>);
    }
  };
  
  let spreadItem:SpreadItem | undefined;
  let bagelItem:BagelItem | undefined;
  switch (storeItem.cat){
    case 'bagel':
      bagelItem = storeItem as BagelItem;
      break;
    case 'spread':
      spreadItem = storeItem as SpreadItem;
      break;
  };

  const [bagelFourPackPrice,setBagelFourPackPrice] = useState<number>(bagelItem?.fourPrice || 0);
  const [bagelDozenPrice,setBagelDozenPrice] = useState<number>(bagelItem?.dozenPrice || 0);
  const [spreadItemPrice,setSpreadItemPrice] = useState<number>(spreadItem?.price || 0);

  useEffect(()=>{
    if (!localStorage.getItem('loginToken')) setUserTier('Non-Member');
  },[isSignedIn])

  return(
    <article data-aos='fade-right' id={`item-${storeItem._id}`} className={`store-item ${altThemeClass}`}>
      <p className='item-info'>
        <span>{storeItem.name}</span> 
        {
          storeItem.cat==='spread'
          ?
            'One Pound'
          :
            null
        } 
        {
          spreadItem && spreadItem.cat==='spread'
          ?
            getCurrentUserSpreadTierPricing(
              parseFloat(calcPriceByUserTier(spreadItemPrice,userTier)),
              userTier
            )
          :
            null
        }
        {
          bagelItem && bagelItem.cat==='bagel'
          ?
            getCurrentUserBagelTierPricing(
              parseFloat(calcPriceByUserTier(bagelFourPackPrice,userTier)),
              parseFloat(calcPriceByUserTier(bagelDozenPrice,userTier)),
              userTier
            )
          :
            null
        }
      </p>
      <img src={itemImgSrc} alt={`Item ${storeItem._id}`} />
      <div data-aos='fade-right' className='store-item-buttons'>
        <div className='store-item-button-container'>
          {
            getStoreItemButtons()
          }
        </div>
      </div>
    </article>
  );
};