import React, { useEffect, useState } from 'react';
import { verifyLoginToken } from '../../../Helpers/auth';
import { getServerUrlPrefix } from '../../../Config/clientSettings';
import { useNavigate } from 'react-router-dom';

export default function AccountSettings(){
  const [firstNameInput,setFirstNameInput] = useState<string>('');
  const [lastNameInput,setLastNameInput] = useState<string>('');
  const [emailInput,setEmailInput] = useState<string>('');
  const [passwordInput,setPasswordInput] = useState<string>('');
  const [passwordConfInput,setPasswordConfInput] = useState<string>('');
  const [currentPasswordInput,setCurrentPasswordInput] = useState<string>('');
  const [isSignedIn,setIsSignedIn] = useState<boolean>(true);

  const navigate = useNavigate();

  const fetchAccountSettings = async function(){
    const response = await fetch(`${getServerUrlPrefix()}/api/users/settings`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('loginToken')}`
      }
    });
    const responseData = await response.json();
    setFirstNameInput(responseData.firstName);
    setLastNameInput(responseData.lastName);
    setEmailInput(responseData.email);
  };

  //handle initial page load 
  useEffect(()=>{
    verifyLoginToken(setIsSignedIn);
  },[]);

  useEffect(()=>{
    fetchAccountSettings();
  },[isSignedIn]);

  const applySettingsChanges = async function(){
    const response = await fetch(`${getServerUrlPrefix()}/api/users/settings`,{
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('loginToken')}`
      },
      body: JSON.stringify({
        firstName: firstNameInput,
        lastName: lastNameInput,
        emailInput: emailInput,
        passwordInput: passwordInput,
        passwordConfInput: passwordConfInput,
        currentPasswordInput: currentPasswordInput
      })
    });

    const responseData = await response.json();
    if (responseData.wasUserUpdated){
      localStorage.setItem('loginToken',responseData.loginToken);
      navigate('/');
    };
  };

  if (isSignedIn){
    return(
      <div>
        <h3>Account Settings</h3>
        <div>
          <label>First Name</label>
          <input value={firstNameInput} onChange={(e)=>{setFirstNameInput(e.target.value)}} />
        </div>
        <div>
          <label>Last Name</label>
          <input value={lastNameInput} onChange={(e)=>{setLastNameInput(e.target.value)}} />
        </div>
        <div>
          <h4>This will change your login email.</h4>
          <label>Email</label>
          <input value={emailInput} onChange={(e)=>{setEmailInput(e.target.value)}} />
        </div>
        <div>
          <h4>This will change your login password.</h4>
          <label>New Password</label>
          <input value={passwordInput} onChange={(e)=>{setPasswordInput(e.target.value)}} />
        </div>
        <div>
          <label>New Password (Again)</label>
          <input value={passwordConfInput} onChange={(e)=>{setPasswordConfInput(e.target.value)}} />
        </div>
        <div>
          <h4>You must enter your current password to apply any settings changes.</h4>
          <label>Current Password</label>
          <input value={currentPasswordInput} onChange={(e)=>{setCurrentPasswordInput(e.target.value)}} required/>
        </div>
        <button type='button' onClick={()=>{applySettingsChanges()}}>Apply Changes</button>
      </div>
    );
  }else{
    return(
      <div>
        You must be signed in to access this page.
      </div>
    );
  };
};