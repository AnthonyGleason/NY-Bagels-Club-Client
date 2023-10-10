import React,{useEffect, useState} from 'react';
import menuImg from '../../../Assets/icons/menu.svg';
import registerImg from '../../../Assets/icons/register.svg';
import loginImg from '../../../Assets/icons/login.svg';
import cartImg from '../../../Assets/icons/cart.svg';
import logoutImg from '../../../Assets/icons/logout.svg';
import vipImg from '../../../Assets/icons/vip.svg';
import ordersImg from '../../../Assets/icons/orders.svg';
import settingsImg from '../../../Assets/icons/settings.svg';
import creditCardImg from '../../../Assets/icons/creditcard.svg';

import './Sidebar.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { handleLogout, verifyLoginToken } from '../../../Helpers/auth';
import { toggleExpandMenu } from '../../../Helpers/sidebar';
import { Cart } from '../../../Interfaces/interfaces';
import { getItemQuantityFromCart } from '../../../Helpers/cart';

export default function Sidebar(
  {
    cart,
    isExpanded,
    setIsExpanded,
    isSignedIn,
    setIsSignedIn
  }:{
    cart:Cart;
    isExpanded:boolean,
    setIsExpanded:Function,
    isSignedIn:boolean,
    setIsSignedIn:Function
  }
){
  const [hasAudioPlayed,setHasAudioPlayed] = useState<boolean>(false);
  const [totalQuantity,setTotalQuantity] = useState<number>(cart.totalQuantity || 0);
  const navigate = useNavigate();

   //check if user is logged in and login token is valid on initial page load
   useEffect(()=>{
    if (localStorage.getItem('loginToken')){
      verifyLoginToken(setIsSignedIn);
    };
  },[])

  //when cart is updated calculate new total quantity
  useEffect(()=>{
    setTotalQuantity(cart.totalQuantity);
  },[cart])

  //sidebar is expanded
  if (isExpanded){
    return(
      <motion.section 
        className='sidebar-expanded'
        initial={{ right: -200 }}
        animate={{ right: isExpanded ? 0 : -200 }}
        transition={{ duration: 0.5 }}
      >
        <ol className='sidebar-nav'>
          <li>
            <button className='sidebar-expand-toggle' onClick={()=>{
              toggleExpandMenu(
                hasAudioPlayed,
                setHasAudioPlayed,
                isExpanded,
                setIsExpanded
              )
            }}>
              <img src={menuImg} alt='expand sidebar menu' /> 
            </button>
          </li>
          <li className='cart'>
            <button onClick={()=>{navigate('/cart')}}>
              <img src={cartImg} alt='cart' />
              <span>{totalQuantity} Items</span>
            </button>
          </li>    
          {
            isSignedIn===false 
            ?
            // user is not signed in
             null
            :
            // user is signed in
              <>
                <li>
                  <button onClick={()=>{navigate('/accounts/orders')}}>
                    <img src={ordersImg} alt='my orders' />
                    <span>Orders</span>
                  </button> 
                </li>
              </>
          }
          <li className='checkout'>
            <button onClick={()=>{navigate('/cart/checkout')}}>
              <img src={creditCardImg} alt='checkout' />
              <span>Checkout</span>
            </button>
          </li>
          <li>
            <button onClick={()=>{navigate('/subscribe')}}>
              <img src={vipImg} alt='subscribe' />
              <span>Subscribe</span>
            </button>
          </li>  
          {
            isSignedIn===false 
            ?
            // user is not signed in
            <>
              <li>
                <button onClick={()=>{navigate('/login')}}>
                  <img src={loginImg} alt='login' />
                  <span>Login</span>
                </button>
              </li>
              <li>
                <button onClick={()=>{navigate('/register')}}>
                  <img src={registerImg} alt='register' />
                  <span>Register</span>
                </button>
              </li>
            </> 
            :
            // user is signed in
            <>
              <li>
                <button onClick={()=>{navigate('/accounts/settings')}}>
                  <img src={settingsImg} alt='account settings' />
                  <span>Settings</span>
                </button> 
              </li>
              <li>
                <button onClick={()=>{handleLogout(setIsSignedIn)}}>
                  <img src={logoutImg} alt='logout' />
                  <span>Logout</span>
                </button> 
              </li>
            </>
          }
        </ol>
      </motion.section>
    );
  }else{
    return(
      <section className='sidebar-closed'>
        <button className='sidebar-expand-toggle' onClick={()=>{toggleExpandMenu(
            hasAudioPlayed,
            setHasAudioPlayed,
            isExpanded,
            setIsExpanded
        )}}>
          <img src={menuImg} alt='expand sidebar menu' /> 
        </button>
      </section>
    );
  }
}