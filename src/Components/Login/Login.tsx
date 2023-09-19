import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
export default function Login(){
  const [errorMessage,setErrorMessage] = useState<string>('');
  const navigate = useNavigate();
  const genErrorMessageElement = function(){
    //an error does not exist
    if (!errorMessage) return null;
    //display error
    return(
      <p>{errorMessage}</p>
    );
  };
  
  const submitLogin = function(){
    
  };

  return(
    <section className='login-wrapper'>
      <form className='login'>
        <h3>Login</h3>
        <div>
          <label>Email</label>
          <input type='email' required/>
        </div>
        <div>
          <label>Password</label>
          <input type='password' required/>
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