import React,{useEffect, useRef, useState} from 'react';
import menuImg from '../../../Assets/icons/menu.svg';
import registerImg from '../../../Assets/icons/register.svg';
import loginImg from '../../../Assets/icons/login.svg';
import cartImg from '../../../Assets/icons/cart.svg';
import logoutImg from '../../../Assets/icons/logout.svg';
import vipImg from '../../../Assets/icons/vip.svg';
import ordersImg from '../../../Assets/icons/orders.svg';
import settingsImg from '../../../Assets/icons/settings.svg';
import adminImg from '../../../Assets/icons/admin.svg';
import homeImg from '../../../Assets/icons/round-home.svg';
import supportImg from '../../../Assets/icons/support-agent.svg';

import './Sidebar.css';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { handleLogout, verifyLoginToken } from '../../../Helpers/auth';
import { toggleExpandMenu } from '../../../Helpers/sidebar';
import { Cart } from '../../../Interfaces/interfaces';

export default function Sidebar(
  {
    cart,
    isExpanded,
    setIsExpanded,
    isSignedIn,
    setIsSignedIn,
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
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [showExpandedMenu, setShowExpandedMenu] = useState<boolean>(false);
  const [didAnimationPlay,setDidAnimationPlay] = useState<boolean>(true);

  const navigate = useNavigate();
  const controls = useAnimation();
  
  const isInitialLoad = useRef(true);
  
  //check if user is logged in and login token is valid on initial page load
  useEffect(()=>{
    if( isInitialLoad.current ){
      isInitialLoad.current = false;
      verifyLoginToken(setIsSignedIn,setIsAdmin);
    };
  },[isInitialLoad])

  const myAnimation = async function() {
    await controls.start({ x: 0 });
    // First animation
    await controls.start({ x: '100%' }).then(()=>{
      const tempElement = document.querySelector('#sidebar');
      //reversed because the state was already changed to trigger this function
      if (isExpanded){
        tempElement?.classList.remove('sidebar-closed');
        tempElement?.classList.add('sidebar-expanded');
      }else if (!isExpanded){
        tempElement?.classList.remove('sidebar-expanded');
        tempElement?.classList.add('sidebar-closed');
      };
      setShowExpandedMenu(isExpanded);
    });
    // Second animation
    await controls.start({ x: 0 });
  };

  //when cart is updated calculate new total quantity
  useEffect(()=>{
    setTotalQuantity(cart.totalQuantity);
  },[cart])

  useEffect(()=>{
    if (!didAnimationPlay){
      myAnimation();
    }else{
      setDidAnimationPlay(false);
    };
  },[isExpanded]);

  return (
    <motion.section 
      id='sidebar' 
      className='sidebar-closed'
      initial={{ x: 0 }}
      animate={controls}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      {showExpandedMenu ? (
        <ol className='sidebar-nav'>
          <li>
            <button
              className='sidebar-expand-toggle'
              onClick={() =>{
                  toggleExpandMenu(
                    hasAudioPlayed,
                    setHasAudioPlayed,
                    isExpanded,
                    setIsExpanded
                  );
                }
              }
            >
              <img src={menuImg} alt='expand sidebar menu' />
            </button>
          </li>
          <li className='home-sidebar-button'>
            <button onClick={() => navigate('/')}>
              <img src={homeImg} alt='home' />
              <span>Home</span>
            </button>
          </li>
          {isAdmin === false ? null : (
            <>
              <li>
                <button onClick={() => navigate('/admin')}>
                  <img src={adminImg} alt='admin panel' />
                  <span>Admin</span>
                </button>
              </li>
            </>
          )}
          <li className='cart'>
            <button onClick={() => navigate('/cart')}>
              <img src={cartImg} alt='cart' />
              <span>{totalQuantity || 0} Items</span>
            </button>
          </li>
          {isSignedIn === false ? null : (
            <>
              <li>
                <button onClick={() => navigate('/accounts/orders')}>
                  <img src={ordersImg} alt='my orders' />
                  <span>Orders</span>
                </button>
              </li>
            </>
          )}
          <li>
            <button
              onClick={() =>
                alert(
                  "We appreciate your interest joining the New York Bagels Club Family! Our subscriptions are not available for purchase yet. We expect to launch sometime towards the end of November. If you have questions please email our support team!"
                )
              }
            >
              <img src={vipImg} alt='subscribe' />
              <span>Subscribe</span>
            </button>
          </li>
          {isSignedIn === false ? (
            <>
              <li>
                <button onClick={() => navigate('/login')}>
                  <img src={loginImg} alt='login' />
                  <span>Login</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/register')}>
                  <img src={registerImg} alt='register' />
                  <span>Register</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button onClick={() => navigate('/accounts/settings')}>
                  <img src={settingsImg} alt='account settings' />
                  <span>Settings</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleLogout(setIsSignedIn)}>
                  <img src={logoutImg} alt='logout' />
                  <span>Logout</span>
                </button>
              </li>
            </>
          )}
          <li>
            <button onClick={() => navigate('/support')}>
              <img src={supportImg} alt='support' />
              <span>Support</span>
            </button>
          </li>
        </ol>
      ) : (
        <>
          <button
            className='sidebar-expand-toggle'
            onClick={() =>{
                toggleExpandMenu(
                  hasAudioPlayed,
                  setHasAudioPlayed,
                  isExpanded,
                  setIsExpanded
                );
              }
            }
          >
            <img src={menuImg} alt='expand sidebar menu' />
          </button>
        </>
      )}
    </motion.section>
  );  
}