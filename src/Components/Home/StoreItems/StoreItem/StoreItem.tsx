import React, { useEffect, useRef, useState } from 'react';
import './StoreItem.css';
import { BagelItem, Cart, SpreadItem } from '../../../../Interfaces/interfaces';
import { getItemQuantityFromCart, modifyCart } from '../../../../Helpers/cart';
import basketImg from '../../../../Assets/icons/cart.svg';
import { motion, useAnimation } from 'framer-motion';

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
  const [sixPackItemQuantity,setSixPackItemQuantity] = useState(0);
  const [dozenItemQuantity,setDozenItemQuantity] = useState(0);
  const [itemImgSrc, setItemImgSrc] = useState<string | undefined>();
  const [isRequestPending, setIsRequestPending] = useState<boolean>(false);
  const [selection, setSelection] = useState<string>('');
  const [isAddToCartShown, setIsAddToCartShown] = useState<boolean>(false);
  const [didAnimationPlay,setDidAnimationPlay] = useState<boolean>(true);

  const [isAddToCartExpanded,setIsAddToCartExpanded] = useState<boolean>(false);
  const controls = useAnimation();
  const myAnimation = async function() {
    await controls.start({ opacity: 1 });
    // First animation
    await controls.start({ opacity: 0 }).then(()=>{
      setIsAddToCartShown(isAddToCartExpanded);
    })
    // Second animation
    await controls.start({ opacity: 1 });
  }

  useEffect(()=>{
    if (!didAnimationPlay){
      myAnimation();
    }else{
      setDidAnimationPlay(false);
    };
  },[isAddToCartExpanded])

  //handle initial page load
  const isInitialLoad = useRef(true);
  
  useEffect(()=>{
    if (isInitialLoad.current){
      isInitialLoad.current = false;
      //dynamically import images
      import(`../../../../Assets/storeItems/${storeItem._id}.jpg`)
        .then((module)=>{
          setItemImgSrc(module.default);
        });
    };
  },[isInitialLoad]);

  //whenever the cart is updated update the quantities of items
  useEffect(()=>{
    if (storeItem.cat==='spread'){
      setItemQuantity(getItemQuantityFromCart(cart,storeItem.name,''));
    }else if (storeItem.cat==='bagel'){
      setSixPackItemQuantity(getItemQuantityFromCart(cart,storeItem.name,'six'));
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

  const getCurrentUserBagelTierPricing = function(sixPackPrice:number,dozenPrice:number,userTier:string){
    if (storeItem.cat==='bagel'){
      return(
        <>
          <span>{userTier} Pricing</span>
          <span>Six Pack ${sixPackPrice}</span>
          <span>Baker's Dozen ${dozenPrice}</span>
        </>
      )
    }
  };

  const getStoreItemButtons = function(){
    if (storeItem.cat==='bagel'){
      return(
        <>
          <div className='store-item-button-wrapper'>
            <span>{sixPackItemQuantity} Six Pack(s) in Basket</span>
            <button className='quantity-button' onClick={()=>{
              const selection:string = 'six';
              setSelection(selection);
              modifyCart(
                getItemQuantityFromCart(cart,storeItem.name,selection)+1,
                storeItem._id,
                setCart,
                isRequestPending,
                setIsRequestPending,
                selection
              )
            }}> 
              <div>
                +
              </div>
            </button>
            <button className='quantity-button' onClick={()=>{
              const selection:string = 'six';
              setSelection(selection);
              modifyCart(
                getItemQuantityFromCart(cart,storeItem.name,selection)-1,
                storeItem._id,
                setCart,
                isRequestPending,
                setIsRequestPending,
                selection
              )
            }}>
              <div>
                -
              </div>
            </button>
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
            }}>
              <div>
                +
              </div>
            </button>
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
            }}>
              <div>
                -
              </div>
            </button>
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

  const [bagelSixPackPrice,setBagelSixPackPrice] = useState<number>(bagelItem?.sixPrice || 0);
  const [bagelDozenPrice,setBagelDozenPrice] = useState<number>(bagelItem?.dozenPrice || 0);
  const [spreadItemPrice,setSpreadItemPrice] = useState<number>(spreadItem?.price || 0);

  useEffect(()=>{
    if (!localStorage.getItem('loginToken')) setUserTier('Non-Member');
  },[isSignedIn])

  return(
    <article 
      id={`item-${storeItem._id}`} 
      className={`store-item ${altThemeClass}`}
    >
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{duration: 2.5}}
        viewport={{once: false}}
        className='item-info'
      >
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
              parseFloat(calcPriceByUserTier(bagelSixPackPrice,userTier)),
              parseFloat(calcPriceByUserTier(bagelDozenPrice,userTier)),
              userTier
            )
          :
            null
        }
      </motion.section>
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{duration: 2.5}}
        viewport={{once: false}}
        className='item-content'
      >
        <img 
          className='store-item-home-img' 
          src={itemImgSrc} alt={`Item ${storeItem._id}`} 
        />
        <motion.article
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          animate={controls}
          viewport={{once: false}}
          transition={{duration: 0.5, ease: "easeInOut"}}
          className='store-item-buttons'
        >
          <div 
            className='store-item-button-container'
          >
            {
              isAddToCartShown ?
                getStoreItemButtons()
              :
                <button onClick={()=>{setIsAddToCartExpanded(true)}} className='add-to-basket'><img src={basketImg} /><span>Add To Basket</span></button>
            }
          </div>
        </motion.article>
      </motion.section>
    </article>
  );
};