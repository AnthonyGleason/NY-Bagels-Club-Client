import React, { useEffect, useRef, useState } from 'react';
import { Cart, CartItem, Product } from '../../Interfaces/interfaces';
import { emptyCart, fetchAndHandleCart, handlePlaceClubOrder, isClubCartValid } from '../../Helpers/cart';
import Sidebar from '../Sidebar/Sidebar';
import { getMembershipTier, verifyLoginToken } from '../../Helpers/auth';
import { fetchAndSetStoreItems } from '../../Helpers/store';
import './Club.css';
import ClubItem from './ClubItem';
import ClubCartItem from './ClubCartItem';
import { motion} from 'framer-motion';
import triangleUpArrowImg from '../../Assets/icons/up-arrow.svg';
import triangleDownArrowImg from '../../Assets/icons/down-arrow.svg';

export default function Club(){
  const [isSignedIn,setIsSignedIn] = useState<boolean>(false);
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);
  const [cart,setCart] = useState<Cart>(emptyCart);
  const [membershipTier,setMembershipTier] = useState<string>('');
  const [deliveriesRemaining,setDeliveriesRemaining] = useState<number>(0);
  const [billingCycleEndDate,setBillingCycleEndDate] = useState<string>();
  const [storeItems,setStoreItems] = useState<Product[]>([]);
  const [clubCart,setClubCart] = useState<Cart>(emptyCart);
  const [date,setDate] = useState<Date>();
  const [isCartExpanded,setIsCartExpanded] = useState<boolean>(false);
  const [isCartValid,setIsCartValid] = useState<boolean>(false);
  const [isShaking, setShaking] = useState(false);

  const isInitialLoad = useRef(true);
  
  useEffect(() => {
    if (clubCart) {
      // Trigger animation when the variable changes
      setShaking(true);

      // Reset animation after a short delay
      const timeoutId = setTimeout(() => {
        setShaking(false);
      }, 1000); // Adjust the duration as needed

      // Clean up the timeout to avoid memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [clubCart]);

  useEffect(()=>{
    setIsCartValid(isClubCartValid(clubCart));
  },[clubCart]);

  useEffect(()=>{
    if (isInitialLoad.current){
      isInitialLoad.current=false;
      //verify is signed in
      verifyLoginToken(setIsSignedIn);
      fetchAndHandleCart(setCart);
      //get store items
      fetchAndSetStoreItems(setStoreItems);
      //get membership tier and deliveries remaining
      getMembershipTier(setMembershipTier,setDeliveriesRemaining,setBillingCycleEndDate);
      //get a club cart
      fetchAndHandleCart(setClubCart,true);
    };
  },[]);

  if(
      !isSignedIn
    ){
    return(
      <>
        <Sidebar 
          cart={cart}
          isExpanded={isSidebarExpanded} 
          setIsExpanded={setIsSidebarExpanded}
          isSignedIn={isSignedIn}
          setIsSignedIn={setIsSignedIn}
        />
        <div onClick={()=>{setIsSidebarExpanded(isSidebarExpanded===true ? false: false)}} className='account-settings-message'>
          You must be signed in to access this page.
        </div>
      </>
    );
  }else if(membershipTier==='Non-Member'){
    return(
      <>
        <Sidebar 
          cart={cart}
          isExpanded={isSidebarExpanded} 
          setIsExpanded={setIsSidebarExpanded}
          isSignedIn={isSignedIn}
          setIsSignedIn={setIsSignedIn}
        />
        <div onClick={()=>{setIsSidebarExpanded(isSidebarExpanded===true ? false: false)}} className='account-settings-message'>
          You must be a club member to access this page.
        </div>
      </>
    );
  }else{
    return(
      <>
        <Sidebar
          cart={cart}
          isExpanded={isSidebarExpanded} 
          setIsExpanded={setIsSidebarExpanded}
          isSignedIn={isSignedIn}
          setIsSignedIn={setIsSignedIn}
        />
        <motion.div
          animate={{
            y: isShaking ? [5,0] : 0,
            height: isCartExpanded ? '75vh' : '135px',
          }}
          transition={{ duration: 1, ease: 'easeInOut'  }}
          className={isCartExpanded ? 'club-cart-snapped-expanded' : 'club-cart-snapped-closed'}
        >
          <div className='club-cart-heading'>
            <img onClick={()=>{setIsCartExpanded(!isCartExpanded)}} src={isCartExpanded===false ? triangleUpArrowImg : triangleDownArrowImg} alt='expand menu slider' />
            <div className='club-cart-date-wrapper' onClick={()=>{setIsCartExpanded(!isCartExpanded)}}>
            {
              date
                ? (
                  <>
                    Your Selected Ship Day is<br />
                    <b>{date.toDateString()}</b>
                  </>
                )
                : (
                  <>
                    <b>Please Select A Ship Day</b>
                  </>
                )
            }
            </div>
            <button onClick={()=>{handlePlaceClubOrder(cart,isCartValid,deliveriesRemaining,date)}} type='button' className={`club-cart-place-order-button club-cart-valid-background`}>Place Order</button>
          </div>
          <div className='club-cart-filled-wrapper'>
            <p className={`club-cart-valid ${isCartValid ? 'green' : 'yellow'}`}>
              {
                isCartValid === true
                ?
                  'You cart is full, an order can be placed!'
                :
                  'To place an order you must have 6 "Two Packs" and 1 "1/2 LB" spread in your cart.'
              }  
            </p>
          </div>
          {
            clubCart && clubCart.items.map((cartItem:CartItem,index:number)=>{
              return(
                <ClubCartItem key={index} cartItem={cartItem} setCart={setClubCart} />
              )
            })
          }
        </motion.div>
        <div
          className='club'
          onClick={()=>{setIsSidebarExpanded(isSidebarExpanded===true ? false: false)}}
        >
          <div className='club-heading'>
            <h2>Thank you for being a {membershipTier}!</h2>
            <p>
              You have <b>{deliveriesRemaining}</b> {deliveriesRemaining===1 ? 'delivery' : 'deliveries'} remaining left this billing cycle ending on <b>{billingCycleEndDate}</b>.
            </p>
            <p>To place a delivery please add <b>six</b> bagel selections and <b>one</b> spread to your cart.</p>
            <button type='button' onClick={()=>window.location.href='https://billing.stripe.com/p/login/4gw9Bb95Oeo70tadQQ'}>Manage Subscription</button>
          </div>
          <div className='calendar-wrapper'>
            <h3>Choose Your Ship Date</h3>
            <strong>
              {
                date ?
                  `Your order will ship on ${date.toDateString()} or the next available business day.`
                :
                  'Please select a Wednesday or Thursday you would like your order shipped on.'
              }
            </strong>
          </div>
          <div className='club-items-container'>
            {
              storeItems && storeItems.sort((a, b) => {
              if (a.cat === 'bagel' && b.cat !== 'bagel') {
                  return -1;
                } else if (a.cat === 'pastry' && b.cat !== 'bagel' && b.cat !== 'pastry') {
                  return -1;
                } else {
                  return 1;
                }
              }).map((storeItem: Product,index) => {
                //do not show the mystery bagel or pasteries
                if (storeItem.cat==='mystery') return null;
                if (storeItem.cat==='pastry') return null;
                return(
                  <ClubItem 
                    key={index} 
                    storeItem={storeItem}
                    cart={clubCart}
                    setCart={setClubCart}
                  />
                )
              })
            }
          </div>
        </div>
      </>
    )
  };
};