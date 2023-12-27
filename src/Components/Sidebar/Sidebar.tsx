import React,{useEffect, useRef, useState} from 'react';
import menuImg from '../../Assets/icons/menu.svg';
import registerImg from '../../Assets/icons/register.svg';
import loginImg from '../../Assets/icons/login.svg';
import cartImg from '../../Assets/icons/cart.svg';
import logoutImg from '../../Assets/icons/logout.svg';
import ordersImg from '../../Assets/icons/orders.svg';
import settingsImg from '../../Assets/icons/settings.svg';
import adminImg from '../../Assets/icons/admin.svg';
import supportImg from '../../Assets/icons/support-agent.svg';
import shopImg from '../../Assets/icons/shop.svg';

import './Sidebar.css';
import { motion, useAnimation } from 'framer-motion';
import { handleLogout, verifyLoginToken } from '../../Helpers/auth';
import { Cart } from '../../Interfaces/interfaces';

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
  const [totalQuantity,setTotalQuantity] = useState<number>(cart.totalQuantity || 0);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [showExpandedMenu, setShowExpandedMenu] = useState<boolean>(false);
  const [didAnimationPlay,setDidAnimationPlay] = useState<boolean>(true);

  const controls = useAnimation();
  
  const isInitialLoad = useRef(true);
  
  //check if user is logged in and login token is valid on initial page load
  useEffect(()=>{
    if( isInitialLoad.current ){
      isInitialLoad.current = false;
      verifyLoginToken(setIsSignedIn,setIsAdmin);
    };
  },[isInitialLoad,setIsSignedIn])

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

  useEffect(()=>{
    if (!didAnimationPlay){
      myAnimation();
    }else{
      setDidAnimationPlay(false);
    };
  },[isExpanded]);

  //when cart is updated calculate new total quantity
  useEffect(()=>{
    setTotalQuantity(cart.totalQuantity);
  },[cart])

  return (
    <motion.aside 
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
                  setIsExpanded(isExpanded===true ? false : true);
                }
              }
            >
              <img decoding='async' loading='lazy' src={menuImg} alt='expand sidebar menu'  />
            </button>
          </li>
          <li className='home-sidebar-button'>
            <a href='https://nybagelsclub.com'>
              <img decoding='async' loading='lazy' src={shopImg} alt='shop'  />
              <span>Home</span>
            </a>
          </li>
          {/* {
            userMembershipTier === 'Gold Member' ||
            userMembershipTier === 'Platinum Member' ||
            userMembershipTier === 'Diamond Member'
              ?
                <>
                  <li>
                    <button onClick={() => navigate('/club')}>
                      <img src={starImg} alt='club member page'  />
                      <span>Club</span>
                    </button>
                  </li>
                </>
              :
                null
          } */}
          {isAdmin === false ? null : (
            <>
              <li>
                <a href='https://nybagelsclub.com/#/admin'>
                  <img decoding='async' loading='lazy' src={adminImg} alt='admin panel'  />
                  <span>Admin</span>
                </a>
              </li>
            </>
          )}
          <li className='cart'>
            <a href='https://nybagelsclub.com/#/cart'>
              <img decoding='async' loading='lazy' src={cartImg} alt='cart'  />
              <span>{totalQuantity || 0} Items</span>
            </a>
          </li>
          <li>
            <a href='https://nybagelsclub.com/#/accounts/orders'>
              <img decoding='async' loading='lazy' src={ordersImg} alt='my orders'  />
              <span>Orders</span>
            </a>
          </li>
          {/* <li>
            <button
              onClick={() =>
                navigate('/subscribe')
              }
            >
              <img src={vipImg} alt='subscribe' />
              <span>Subscribe</span>
            </button>
          </li> */}
          {isSignedIn === false ? (
            <>
              <li>
                <a href='https://nybagelsclub.com/#/login'>
                  <img decoding='async' loading='lazy' src={loginImg} alt='login'  />
                  <span>Login</span>
                </a>
              </li>
              <li>
                <a href='https://nybagelsclub.com/#/register'>
                  <img decoding='async' loading='lazy' src={registerImg} alt='register'  />
                  <span>Register</span>
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href='https://nybagelsclub.com/#/accounts/settings'>
                  <img decoding='async' loading='lazy' src={settingsImg} alt='account settings'  />
                  <span>Settings</span>
                </a>
              </li>
              <li>
                <button onClick={() => handleLogout(setIsSignedIn)}>
                  <img decoding='async' loading='lazy' src={logoutImg} alt='logout'  />
                  <span>Logout</span>
                </button>
              </li>
            </>
          )}
          <li>
            <a href='https://nybagelsclub.com/#/support'>
              <img decoding='async' loading='lazy' src={supportImg} alt='support'  />
              <span>Support</span>
            </a>
          </li>
          {/* <li>
            <button onClick={()=>navigate('/careers')}>
              <img src={workImg} alt='careers' />
              <span>Careers</span>
            </button>
          </li> */}
        </ol>
      ) : (
        <>
          <button
            className='sidebar-expand-toggle'
            onClick={() =>{
                setIsExpanded(isExpanded===true ? false : true);
              }
            }
          >
            <img decoding='async' loading='lazy' src={menuImg} alt='expand sidebar menu'  />
          </button>
        </>
      )}
    </motion.aside>
  );  
}