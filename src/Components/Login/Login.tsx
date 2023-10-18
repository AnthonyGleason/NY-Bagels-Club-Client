import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Aos from 'aos';
import "aos/dist/aos.css";
import Sidebar from '../Home/Sidebar/Sidebar';
import { emptyCart, fetchAndHandleCart } from '../../Helpers/cart';
import { Cart } from '../../Interfaces/interfaces';
import { genErrorMessageElement, handleForgotPassword, submitLogin } from '../../Helpers/accounts';

export default function Login(){
  const navigate = useNavigate();

  const [errorMessage,setErrorMessage] = useState<string>('');
  const [emailInput,setEmailInput] = useState<string>('');
  const [passwordInput,setPasswordInput] = useState<string>('');
  const [isSignedIn,setIsSignedIn] = useState<boolean>(true);
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);
  const [cart,setCart] = useState<Cart>(emptyCart);

  useEffect(()=>{
    //setup fade animation length
    Aos.init({duration: 1500});
    fetchAndHandleCart(setCart);
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
      <section className='login-wrapper'>
        <form data-aos='fade-in' className='login'>
          <h3>Login</h3>
          <div>
            <label>Email</label>
            <input value={emailInput} onChange={(e)=>{setEmailInput(e.target.value)}} type='email' required/>
          </div>
          <div>
            <label>Password</label>
            <input value={passwordInput} onChange={(e)=>{setPasswordInput(e.target.value)}} type='password' required/>
          </div>
          {
            genErrorMessageElement(errorMessage)
          }
          <ol>
            <li>
              <button type='button' onClick={()=>{submitLogin(emailInput,passwordInput,setErrorMessage)}}>Submit</button>
            </li>
            <li>
              <button type='button' onClick={()=>{navigate('/register')}}>Register</button>
            </li>
            <li>
              <button type='button' onClick={()=>{handleForgotPassword(emailInput,setErrorMessage)}}>Forgot Password</button>
            </li>
          </ol>
        </form>
      </section>
    </>
  )
}