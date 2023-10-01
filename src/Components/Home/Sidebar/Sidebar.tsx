import React,{useEffect, useState} from 'react';
import menuImg from '../../../Assets/menu.svg';
import './Sidebar.css';
import registerImg from '../../../Assets/register.svg';
import loginImg from '../../../Assets/login.svg';
import cartImg from '../../../Assets/cart.svg';
import logoutImg from '../../../Assets/logout.svg';
import pianoNotes from '../../../Assets/audio/pianoNotes.mp3';
import { useNavigate } from 'react-router-dom';
import { getServerUrlPrefix } from '../../../Config/clientSettings';
import { Item } from '../../../Interfaces/interfaces';
import {motion} from 'framer-motion';

export default function Sidebar(
  {
    cart,
    isExpanded,
    setIsExpanded
  }:{
    cart:Item[];
    isExpanded:boolean,
    setIsExpanded:Function
  }
){
  const [hasAudioPlayed,setHasAudioPlayed] = useState<boolean>(false);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [totalQuantity,setTotalQuantity] = useState<number>(0);
  const navigate = useNavigate();
  
  const calculateTotalQuantity = function(){
    let totalItems = 0;
    //handle empty cart
    if (!cart) return totalItems;
    cart.forEach((item:Item)=>{
      if (item.quantity) totalItems+=item.quantity;
    });
    return totalItems;
  };
  
  //when cart is updated calculate new total quantity
  useEffect(()=>{
    setTotalQuantity(calculateTotalQuantity());
  },[cart])

  //check if user is logged in and login token is valid on initial page load
  useEffect(()=>{
    if (localStorage.getItem('loginToken')){
      verifyToken();
    };
  },[])

  const toggleExpandMenu = function(){
    //menu audio has not played yet in the current session
    if (!hasAudioPlayed) {
      //play the audio
      const audio = new Audio(pianoNotes);
      audio.play();
      //update the state so the audio doesn't play twice in a single user browsing session
      setHasAudioPlayed(true);
    };
    //expand the menu
    setIsExpanded(isExpanded===true ? false : true);
  };
  
  const verifyToken = async function(){
    const response = await fetch(`${getServerUrlPrefix()}/api/users/verify`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('loginToken')}`
      }
    });
    const responseData = await response.json();
    if (responseData.isValid===true){
      setIsSignedIn(true);
    };
  };

  const handleLogout = async function(){
    await fetch(`${getServerUrlPrefix()}/api/users/logout`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('loginToken')}`
      }
    });
    setIsSignedIn(false);
    //remove the token locally
    localStorage.removeItem('loginToken');
  };

  //sidebar is expanded
  if (isExpanded){
    return(
      <motion.section 
        className='sidebar-expanded'
        initial={{ right: -200 }}
        animate={{ right: isExpanded ? 0 : -200 }}
        transition={{ duration: 0.5 }}
      >
        <button className='sidebar-expand-toggle' onClick={()=>{toggleExpandMenu()}}>
          <img src={menuImg} alt='expand sidebar menu' /> 
        </button>
        <ol className='sidebar-nav'>
          {
            isSignedIn===false 
            ?
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
              <li>
                <button onClick={()=>{handleLogout()}}>
                  <img src={logoutImg} alt='logout' />
                  <span>Logout</span>
                </button> 
              </li>
          }
          <li className='cart'>
            <button onClick={()=>{navigate('/cart')}}>
              <img src={cartImg} alt='cart' />
              <span>{totalQuantity} Items</span>
            </button>
          </li>
          <li className='checkout'>
            <button onClick={()=>{navigate('/cart/checkout')}}>
              <span>Checkout</span>
            </button>
          </li>
        </ol>
      </motion.section>
    );
  }else{
    return(
      <section className='sidebar-closed'>
        <button className='sidebar-expand-toggle' onClick={()=>{toggleExpandMenu()}}>
          <img src={menuImg} alt='expand sidebar menu' /> 
        </button>
      </section>
    );
  }
}