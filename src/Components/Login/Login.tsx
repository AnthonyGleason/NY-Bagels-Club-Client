import React,{useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Sidebar from '../Sidebar/Sidebar';
import { emptyCart, fetchAndHandleCart } from '../../Helpers/cart';
import { Cart } from '../../Interfaces/interfaces';
import { genErrorMessageElement, handleForgotPassword, submitLogin } from '../../Helpers/accounts';
import { motion } from 'framer-motion';
import Nav from '../Nav/Nav';

export default function Login(){
  const navigate = useNavigate();
  
  const [errorMessage,setErrorMessage] = useState<string>('');
  const [emailInput,setEmailInput] = useState<string>('');
  const [passwordInput,setPasswordInput] = useState<string>('');
  const [isSignedIn,setIsSignedIn] = useState<boolean>(true);
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);
  const [cart,setCart] = useState<Cart>(emptyCart);

  const isInitialLoad = useRef(true);

  useEffect(()=>{
    if (isInitialLoad.current){
      isInitialLoad.current = false;
      fetchAndHandleCart(setCart);
    };
  },[]);
  
  return(
    <>
      <Sidebar 
        cart={cart}
        isExpanded={isSidebarExpanded} 
        setIsExpanded={setIsSidebarExpanded}
        isSignedIn={isSignedIn}
        setIsSignedIn={setIsSignedIn}
      />
      <section 
        className='login-wrapper'
        onClick={()=>{setIsSidebarExpanded(isSidebarExpanded===true ? false: false)}}
      >
        <motion.form 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{duration: 3}}
          viewport={{once: false}}
          className='login'
        >
          <h3>Login</h3>
          <div>
            {/* <label>Email</label> */}
            <input placeholder={'Email'} value={emailInput} onChange={(e)=>{setEmailInput(e.target.value)}} type='email' required/>
          </div>
          <div>
            {/* <label>Password</label> */}
            <input placeholder={'Password'} value={passwordInput} onChange={(e)=>{setPasswordInput(e.target.value)}} type='password' required/>
          </div>
          {
            genErrorMessageElement(errorMessage)
          }
          <ol>
            <li>
              <button type='button' onClick={()=>{submitLogin(emailInput,passwordInput,setErrorMessage,navigate)}}>Submit</button>
            </li>
            <li>
              <button type='button' onClick={()=>{navigate('/register')}}>Register</button>
            </li>
            <li>
              <button type='button' onClick={()=>{handleForgotPassword(emailInput,setErrorMessage)}}>Forgot Password</button>
            </li>
          </ol>
        </motion.form>
      </section>
    </>
  )
}