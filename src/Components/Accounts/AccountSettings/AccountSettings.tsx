import React, { useEffect, useState } from 'react';
import { verifyLoginToken } from '../../../Helpers/auth';
import './AccountSettings.css';
import Sidebar from '../../Home/Sidebar/Sidebar';
import { emptyCart, fetchAndHandleCart } from '../../../Helpers/cart';
import { Cart } from '../../../Interfaces/interfaces';
import { applySettingsChanges, fetchAccountSettings } from '../../../Helpers/accounts';
import { useNavigate } from 'react-router-dom';

export default function AccountSettings(){
  //form input fields
  const [firstNameInput,setFirstNameInput] = useState<string>('');
  const [lastNameInput,setLastNameInput] = useState<string>('');
  const [emailInput,setEmailInput] = useState<string>('');
  const [passwordInput,setPasswordInput] = useState<string>('');
  const [passwordConfInput,setPasswordConfInput] = useState<string>('');
  const [currentPasswordInput,setCurrentPasswordInput] = useState<string>('');

  const [isSignedIn,setIsSignedIn] = useState<boolean>(true);
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);
  const [cart,setCart] = useState<Cart>(emptyCart);
  
  const navigate = useNavigate();

  //handle initial page load 
  useEffect(()=>{
    verifyLoginToken(setIsSignedIn);
    fetchAndHandleCart(setCart);
  },[]);

  useEffect(()=>{
    fetchAccountSettings(setFirstNameInput,setLastNameInput,setEmailInput);
  },[isSignedIn]);

  if (isSignedIn){
    return(
      <>
        <Sidebar 
          cart={cart}
          isExpanded={isSidebarExpanded} 
          setIsExpanded={setIsSidebarExpanded}
          isSignedIn={isSignedIn}
          setIsSignedIn={setIsSignedIn}
        />
        <div onClick={()=>{setIsSidebarExpanded(isSidebarExpanded===true ? false: false)}} className='account-settings'>
          <h3>Account Settings</h3>
          <div className='settings-input-wrapper'>
            <label>First Name</label>
            <input value={firstNameInput} onChange={(e)=>{setFirstNameInput(e.target.value)}} type='text' />
          </div>
          <div className='settings-input-wrapper'>
            <label>Last Name</label>
            <input value={lastNameInput} onChange={(e)=>{setLastNameInput(e.target.value)}} type='text' />
          </div>
          <h4>The following setting will change your login email.</h4>
          <div className='settings-input-wrapper'>
            <label>Email</label>
            <input value={emailInput} onChange={(e)=>{setEmailInput(e.target.value)}} type='email' />
          </div>
          <h4>The following setting will change your login password.</h4>
          <div className='settings-input-wrapper'>
            <label>New Password</label>
            <input value={passwordInput} onChange={(e)=>{setPasswordInput(e.target.value)}} type='password' />
          </div>
          <div className='settings-input-wrapper'>
            <label>New Password (Again)</label>
            <input value={passwordConfInput} onChange={(e)=>{setPasswordConfInput(e.target.value)}} type='password' />
          </div>
          <h4>You must enter your current password to apply any of the settings changes above.</h4>
          <div className='settings-input-wrapper'>
            <label>Current Password</label>
            <input value={currentPasswordInput} onChange={(e)=>{setCurrentPasswordInput(e.target.value)}} type='password' required/>
          </div>
          <button className='apply-account-settings' type='button' onClick={()=>{
            applySettingsChanges(
              firstNameInput,
              lastNameInput,
              emailInput,
              passwordInput,
              passwordConfInput,
              currentPasswordInput,
              navigate
            )
          }}>Apply Changes</button>
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
        <div onClick={()=>{setIsSidebarExpanded(isSidebarExpanded===true ? false: false)}} className='account-settings-message'>
          You must be signed in to access this page.
        </div>
      </>
    );
  };
};