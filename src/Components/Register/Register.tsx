import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

export default function Register(){
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
  
  const submitRegister = function(){
    
  };

  return(
    <section className='register-wrapper'>
      <form className='register'>
        <h3>Register</h3>
        <div>
          <label>First Name</label>
          <input type='text' min={1} required/>
        </div>
        <div>
          <label>Last Name</label>
          <input type='text' min={1} required/>
        </div>
        <div>
          <label>Email</label>
          <input type='email' required/>
        </div>
        <div>
          <label>Password</label>
          <input type='password' required/>
        </div>
        <div>
          <label>Password (again)</label>
          <input type='password' required/>
        </div>
        <ol>
          <li>
            <button type='button' onClick={()=>{submitRegister()}}>Submit</button>
          </li>
          <li>
            <button type='button' onClick={()=>{navigate('/login')}}>Login</button>
          </li>
        </ol>
        {genErrorMessageElement()}
      </form>
    </section>
  )
}