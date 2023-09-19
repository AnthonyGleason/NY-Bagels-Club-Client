import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

export default function Register(){
  const [errorMessage,setErrorMessage] = useState<string>('');
  
  const [firstNameInput,setFirstNameInput] = useState<string>('');
  const [lastNameInput,setLastNameInput] = useState<string>('');
  const [emailInput,setEmailInput] = useState<string>('');
  const [passwordInput,setPasswordInput] = useState<string>('');
  const [passwordConfirmInput,setPasswordConfirmInput] = useState<string>('');

  const navigate = useNavigate();
  const genErrorMessageElement = function(){
    //an error does not exist
    if (!errorMessage) return null;
    //display error
    return(
      <p>{errorMessage}</p>
    );
  };
  
  const submitRegister = async function(){
    const response = await fetch('http://localhost:5000/api/users/register',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstNameInput,
        lastName: lastNameInput,
        email: emailInput,
        password: passwordInput,
        passwordConfirm: passwordConfirmInput,
      })
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
    <section className='register-wrapper'>
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
  );
};