import React,{useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import Sidebar from '../Sidebar/Sidebar';
import { emptyCart, fetchAndHandleCart } from '../../Helpers/cart';
import { Cart } from '../../Interfaces/interfaces';
import { genErrorMessageElement, submitRegister } from '../../Helpers/accounts';
import {motion} from 'framer-motion';

export default function Register(){
  const [errorMessage,setErrorMessage] = useState<string>('');
  
  const [firstNameInput,setFirstNameInput] = useState<string>('');
  const [lastNameInput,setLastNameInput] = useState<string>('');
  const [emailInput,setEmailInput] = useState<string>('');
  const [passwordInput,setPasswordInput] = useState<string>('');
  const [passwordConfirmInput,setPasswordConfirmInput] = useState<string>('');
  const [isSignedIn,setIsSignedIn] = useState<boolean>(true);
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);
  const [cart,setCart] = useState<Cart>(emptyCart);
  const [isRequestSent,setIsRequestSent] = useState<boolean>(false);

  const navigate = useNavigate();
  
  const isInitialLoad = useRef(true);
  
  useEffect(()=>{
    if (isInitialLoad.current){
      isInitialLoad.current=false;
      fetchAndHandleCart(setCart);
    };
  },[isInitialLoad]);

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
        className='register-wrapper'
        onClick={()=>{setIsSidebarExpanded(isSidebarExpanded===true ? false: false)}}
      >
        <motion.form
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{duration: 3}}
          viewport={{once: false}} 
          className='register'
        >
          <h3>Register</h3>
          <div>
            <input placeholder='First Name' value={firstNameInput} onChange={(e)=>{setFirstNameInput(e.target.value)}} type='text' min={1} required/>
          </div>
          <div>
            <input placeholder='Last Name' value={lastNameInput} onChange={(e)=>{setLastNameInput(e.target.value)}} type='text' min={1} required/>
          </div>
          <div>
            <input placeholder='Email' value={emailInput} onChange={(e)=>{setEmailInput(e.target.value)}} type='email' required/>
          </div>
          <div>
            <input placeholder='Password' value={passwordInput} onChange={(e)=>{setPasswordInput(e.target.value)}} type='password' required/>
          </div>
          <div>
            <input placeholder='Password (Again)' value={passwordConfirmInput} onChange={(e)=>{setPasswordConfirmInput(e.target.value)}} type='password' required/>
          </div>
          {
            genErrorMessageElement(errorMessage)
          }
          <ol>
            <li>
              <button type='button' onClick={()=>{
                submitRegister(
                  emailInput,
                  passwordInput,
                  passwordConfirmInput,
                  firstNameInput,
                  lastNameInput,
                  setErrorMessage,
                  isRequestSent,
                  setIsRequestSent
                )
              }}>Submit</button>
            </li>
            <li>
              <button type='button' onClick={()=>{navigate('/login')}}>Login</button>
            </li>
          </ol>
          <h4>New York Bagels Club is commited to your privacy and will not share your contact information with third parties.</h4>
        </motion.form>
      </section>
    </>
  );
};