import React, { useEffect, useRef, useState } from 'react';
import './StoreItem.css';
import { BagelItem, Cart, PastryItem, Product, SpreadItem } from '../../../../Interfaces/interfaces';
import { getItemQuantityFromCart, modifyCart } from '../../../../Helpers/cart';
import basketImg from '../../../../Assets/icons/cart.svg';
import { motion, useAnimation } from 'framer-motion';

export default function StoreItem({
  storeItem,
  cart,
  setCart,
  userTier,
  isSignedIn,
  setUserTier
}:{
  storeItem: Product,
  cart:Cart,
  setCart:Function,
  userTier:string,
  isSignedIn:boolean,
  setUserTier:Function
}){
  const [itemQuantity,setItemQuantity] = useState(0);
  const [sixPackItemQuantity,setSixPackItemQuantity] = useState(0);
  const [dozenItemQuantity,setDozenItemQuantity] = useState(0);
  const [itemImgSrc, setItemImgSrc] = useState<string | undefined>();
  const [isRequestPending, setIsRequestPending] = useState<boolean>(false);
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
      import(`../../../../Assets/storeItems/${storeItem._id}.webp`)
        .then((module)=>{
          setItemImgSrc(module.default);
        });
    };
  },[isInitialLoad]);

  //whenever the cart is updated update the quantities of items
  useEffect(()=>{
    if (storeItem.cat==='spread' || storeItem.cat==='pastry'){
      setItemQuantity(getItemQuantityFromCart(cart,storeItem.name,''));
    }else if (storeItem.cat==='bagel'){
      setSixPackItemQuantity(getItemQuantityFromCart(cart,storeItem.name,'six'));
      setDozenItemQuantity(getItemQuantityFromCart(cart,storeItem.name,'dozen'));
    };
  },[cart]);
  
  const calcPriceByUserTier = function(itemPrice:number,userTier:string):string{
    switch(userTier){
      case 'Non-Member':
        return (itemPrice).toFixed(2);
      case 'Gold Member':
        return (itemPrice-(itemPrice*0.05)).toFixed(2);
      case 'Platinum Member':
        return (itemPrice-(itemPrice*0.10)).toFixed(2);
      case 'Diamond Member':
        return (itemPrice-(itemPrice*0.15)).toFixed(2);
      default:
        return (itemPrice).toFixed(2);
    }
  };

  const getCurrentUserSpreadTierPricing = function(itemPrice:number,userTier:string){
    if (storeItem.cat==='spread'){
      return(
        <>
          <span>{userTier} Pricing</span>
          <span>One Pound - ${itemPrice.toFixed(2)}</span>
        </>
      )
    };
  };

  const getCurrentPastryTierPricing = function(itemPrice:number,userTier:string){
    if (storeItem.cat==='pastry'){
      return(
        <>
          <span>{userTier} Pricing</span>
          <span>Six Pack - ${itemPrice.toFixed(2)}</span>
        </>
      )
    };
  };

  const getCurrentUserBagelTierPricing = function(sixPackPrice:number,dozenPrice:number,userTier:string){
    if (storeItem.cat==='bagel'){
      return(
        <>
          <span>{userTier} Pricing</span>
          <span>Six Pack - ${sixPackPrice.toFixed(2)}</span>
          <span>Baker's Dozen - ${dozenPrice.toFixed(2)}</span>
        </>
      )
    }
  };

  const getStoreItemButtons = function(){
    if (storeItem.cat==='bagel'){
      return(
        <>
          <div className='store-item-button-wrapper'>
            <button className='quantity-button' onClick={()=>{
              const selection:string = 'six';
              modifyCart(
                getItemQuantityFromCart(cart,storeItem.name,selection)-1,
                storeItem._id,
                setCart,
                isRequestPending,
                setIsRequestPending,
                selection,
                false
              )
            }}>
              <div>
                -
              </div>
            </button>
            <span>{sixPackItemQuantity} Six Pack(s) in Basket</span>
            <button className='quantity-button' onClick={()=>{
              const selection:string = 'six';
              modifyCart(
                getItemQuantityFromCart(cart,storeItem.name,selection)+1,
                storeItem._id,
                setCart,
                isRequestPending,
                setIsRequestPending,
                selection,
                false
              )
            }}> 
              <div>
                +
              </div>
            </button>
          </div>
          <div className='store-item-button-wrapper'>
            <button className='quantity-button' onClick={()=>{
              const selection:string = 'dozen';
              modifyCart(
                getItemQuantityFromCart(cart,storeItem.name,selection)-1,
                storeItem._id,
                setCart,
                isRequestPending,
                setIsRequestPending,
                selection,
                false
              )
            }}>
              <div>
                -
              </div>
            </button>
            <span>{dozenItemQuantity} Dozen(s) in Basket</span>
            <button className='quantity-button' onClick={()=>{
              const selection:string = 'dozen';
              modifyCart(
                getItemQuantityFromCart(cart,storeItem.name,selection)+1,
                storeItem._id,
                setCart,
                isRequestPending,
                setIsRequestPending,
                selection,
                false
              )
            }}>
              <div>
                +
              </div>
            </button>
          </div>
        </>
      )
    }else if (storeItem.cat==='spread' || storeItem.cat ==='pastry'){
      return(
        <div className='store-item-button-wrapper'>
          <button className='quantity-button' onClick={()=>{
            modifyCart(
              getItemQuantityFromCart(cart,storeItem.name)-1,
              storeItem._id,
              setCart,
              isRequestPending,
              setIsRequestPending,
              '',
              false
            )
          }}>
            -
          </button>
          <span>{itemQuantity} in Basket</span>
          <button className='quantity-button' onClick={()=>{
            modifyCart(
              getItemQuantityFromCart(cart,storeItem.name)+1,
              storeItem._id,
              setCart,
              isRequestPending,
              setIsRequestPending,
              '',
              false
            )
          }}>
            +
          </button>
        </div>
      )
    }else{
      return(<></>);
    }
  };
  
  let spreadItem:SpreadItem | undefined;
  let bagelItem:BagelItem | undefined;
  let pastryItem:PastryItem | undefined;

  switch (storeItem.cat){
    case 'bagel':
      bagelItem = storeItem as BagelItem;
      break;
    case 'spread':
      spreadItem = storeItem as SpreadItem;
      break;
    case 'pastry':
      pastryItem = storeItem as PastryItem;
  };

  const bagelSixPackPrice = bagelItem?.sixPrice || 0;
  const bagelDozenPrice = bagelItem?.dozenPrice || 0;
  const spreadItemPrice = spreadItem?.price || 0;
  const pastryItemPrice = pastryItem?.price || 0;

  useEffect(()=>{
    if (!localStorage.getItem('loginToken')) setUserTier('Non-Member');
  },[isSignedIn,setUserTier])

  return(
    <article 
      id={`item-${storeItem._id}`} 
      className={`store-item `}
    >
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{duration: 2.5}}
        viewport={{once: false}}
        className='item-content'
      >
        <section
          className='item-info'
        >
          <span>{storeItem.name}</span> 
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
          {
            pastryItem && pastryItem.cat==='pastry'
            ?
              getCurrentPastryTierPricing(
                parseFloat(calcPriceByUserTier(pastryItemPrice,userTier)),
                userTier
              )
            :
              null
          }
        </section>
        <img 
          className='store-item-home-img' 
          id={`#${storeItem._id.toString()}-img`}
          src={itemImgSrc} alt={`Item ${storeItem._id}`}
        />
        <p>{storeItem.desc}</p>
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
            id={`#${storeItem._id.toString()}-buttons`}
          >
            {
              isAddToCartShown ?
                getStoreItemButtons()
              :
                <button onClick={()=>{setIsAddToCartExpanded(true)}} className='add-to-basket'><img src={basketImg} alt='shopping cart basket of items to checkout' /><span>Add To Basket</span></button>
            }
          </div>
        </motion.article>
      </motion.section>
    </article>
  );
};