import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getServerUrlPrefix } from '../../../Config/clientSettings';
import './ResetPassword.css';

export default function ResetPassword(){
  const [passwordInput,setPasswordInput] = useState<string>('');
  const [passwordConfInput,setPasswordConfInput] = useState<string>('');
  const [isExpired,setIsExpired] = useState<boolean>(false);
  const [message,setMessage] = useState<string>('');
  const resetID = useParams().resetID;
  const navigate = useNavigate();

  //handle initial load get email, isExpired
  useEffect(()=>{
    getResetTokenStatus()
  },[]);

  const getResetTokenStatus = async function(){
    const response = await fetch(`${getServerUrlPrefix()}/api/users/forgotPassword/${resetID}`,{
      method: 'GET'
    });
    const responseData = await response.json();
    setIsExpired(responseData.isExpired);
  };

  const handleSubmitForgotPassword = async function(){
    const response = await fetch(`${getServerUrlPrefix()}/api/users/forgotPassword/${resetID}`,{
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        password: passwordInput,
        passwordConf: passwordConfInput
      })
    });
    const responseData = await response.json();
    setIsExpired(responseData.isExpired);
    if (responseData.wasUpdated){
      navigate('/login');
    }else if (!isExpired){
      setMessage('Passwords do not match or user does not exist.')
    };
  };

  if (isExpired){
    return(
      <div className='pass-expired'>
        It appears that this password reset link has expired. Please request another password reset to proceed.
      </div>
    )
  }else{
    return(
      <div>
        <form className='pass-reset-form'>
          <div>
            <label>New Password</label>
            <input type='password' value={passwordInput} onChange={(e)=>{setPasswordInput(e.target.value)}} />
          </div>
          <div>
            <label>New Password (again)</label>
            <input type='password' value={passwordConfInput} onChange={(e)=>{setPasswordConfInput(e.target.value)}} />
          </div>
          <div>{message}</div>
          <button type='button' onClick={()=>{handleSubmitForgotPassword()}}>Submit</button>
        </form>
      </div>
    );
  }
};