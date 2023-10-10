import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { getServerUrlPrefix } from '../../Config/clientSettings';
import Aos from 'aos';
import "aos/dist/aos.css";

export default function Login(){
  const [errorMessage,setErrorMessage] = useState<string>('');
  const [emailInput,setEmailInput] = useState<string>('');
  const [passwordInput,setPasswordInput] = useState<string>('');

  useEffect(()=>{
    //setup fade animation length
    Aos.init({duration: 1500});
  },[]);

  const navigate = useNavigate();
  const genErrorMessageElement = function(){
    //an error does not exist
    if (!errorMessage) return null;
    //display error
    return(
      <p>{errorMessage}</p>
    );
  };
  
  const submitLogin = async function(){
    const response = await fetch(`${getServerUrlPrefix()}/api/users/login`,{
      method: 'POST',
      mode: 'cors',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
      }),
    });
    const responseData = await response.json();
    if (responseData.token){
      localStorage.setItem('loginToken',responseData.token);
      window.history.back();
    }else{
      setErrorMessage(responseData.message);
    }
  };

  const handleForgotPassword = async function(){
    if (!emailInput){
      alert('Please enter a email in the email field to perform this action.');
    };
    const response = await fetch(`${getServerUrlPrefix()}/api/users/forgotPassword`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailInput
      })
    });
    const responseData = await response.json();
    if (responseData.isEmailSent){
      alert('Your request has been processed. Please check your email for a password reset link.');
    };
  };

  return(
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
        <ol>
          <li>
            <button type='button' onClick={()=>{submitLogin()}}>Submit</button>
          </li>
          <li>
            <button type='button' onClick={()=>{navigate('/register')}}>Register</button>
          </li>
          <li>
            <button type='button' onClick={()=>{handleForgotPassword()}}>Forgot Password</button>
          </li>
        </ol>
        {genErrorMessageElement()}
      </form>
    </section>
  )
}