import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { getServerUrlPrefix } from '../../Config/clientSettings';
import Aos from 'aos';
import "aos/dist/aos.css";
import Sidebar from '../Home/Sidebar/Sidebar';
import { emptyCart, fetchAndHandleCart } from '../../Helpers/cart';
import { Cart } from '../../Interfaces/interfaces';
import { isValidEmail } from '../../Helpers/verification';
import { genErrorMessageElement, submitRegister } from '../../Helpers/accounts';

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

  const navigate = useNavigate();
  
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
      <section data-aos='fade-in' className='register-wrapper'>
        <form className='register'>
          <h3>Register</h3>
          <div>
            <label>First Name</label>
            <input value={firstNameInput} onChange={(e)=>{setFirstNameInput(e.target.value)}} type='text' min={1} required/>
          </div>
          <div>
            <label>Last Name</label>
            <input value={lastNameInput} onChange={(e)=>{setLastNameInput(e.target.value)}} type='text' min={1} required/>
          </div>
          <div>
            <label>Email</label>
            <input value={emailInput} onChange={(e)=>{setEmailInput(e.target.value)}} type='email' required/>
          </div>
          <div>
            <label>Password</label>
            <input value={passwordInput} onChange={(e)=>{setPasswordInput(e.target.value)}} type='password' required/>
          </div>
          <div>
            <label>Password (again)</label>
            <input value={passwordConfirmInput} onChange={(e)=>{setPasswordConfirmInput(e.target.value)}} type='password' required/>
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
                  setErrorMessage
                )
              }}>Submit</button>
            </li>
            <li>
              <button type='button' onClick={()=>{navigate('/login')}}>Login</button>
            </li>
          </ol>
        </form>
      </section>
    </>
  );
};