import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
export default function Login(){
  const [errorMessage,setErrorMessage] = useState<string>('');

  const [emailInput,setEmailInput] = useState<string>('');
  const [passwordInput,setPasswordInput] = useState<string>('');

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
    const response = await fetch('http://localhost:5000/api/users/login',{
      method: 'POST',
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
      navigate('/');
    }else{
      setErrorMessage(responseData.message);
    }
  };

  return(
    <section className='login-wrapper'>
      <form className='login'>
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
            <button type='button' onClick={()=>{}}>Forgot Password</button>
          </li>
        </ol>
        {genErrorMessageElement()}
      </form>
    </section>
  )
}