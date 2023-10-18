import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getServerUrlPrefix } from '../../../Config/clientSettings';
import './ResetPassword.css';
import { getResetTokenStatus, handleSubmitForgotPassword } from '../../../Helpers/accounts';

export default function ResetPassword(){
  const [passwordInput,setPasswordInput] = useState<string>('');
  const [passwordConfInput,setPasswordConfInput] = useState<string>('');
  const [message,setMessage] = useState<string>('');
  const [isExpired,setIsExpired] = useState<boolean>(false);
  const resetID = useParams().resetID;
  const navigate = useNavigate();

  //handle initial load get email, isExpired
  useEffect(()=>{
    if (!resetID) return;
    getResetTokenStatus(resetID,setIsExpired);
  },[]);

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
          <button type='button' onClick={()=>{
            if (!resetID) return;
            handleSubmitForgotPassword(
              resetID,
              passwordInput,
              passwordConfInput,
              setIsExpired,
              navigate,
              setMessage
            )
          }}>Submit</button>
        </form>
      </div>
    );
  }
};