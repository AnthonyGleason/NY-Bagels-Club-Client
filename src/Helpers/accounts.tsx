import { getServerUrlPrefix } from "../Config/clientSettings";
import { isValidEmail } from "./verification";

export const fetchAccountSettings = async function(
  setFirstNameInput?:Function,
  setLastNameInput?:Function,
  setEmailInput?:Function
):Promise<void>{
  
  try{
    //ensure the user is logged in
    const loginToken:string | null = localStorage.getItem('loginToken');
    if (!loginToken) throw new Error('A login token was not provided! Are you logged in?');

    //make the request for the user account settings
    const response = await fetch(`${getServerUrlPrefix()}/api/users/settings`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginToken}`
      }
    });
    
    //verify an ok response was recieved 
    if (!response.ok) {
      throw new Error('Failed to fetch account settings');
    };

    const responseData = await response.json();

    //set the appropriate inputs if they were provided 
    if (setFirstNameInput) setFirstNameInput(responseData.firstName);
    if (setLastNameInput) setLastNameInput(responseData.lastName);
    if (setEmailInput) setEmailInput(responseData.email);
  }catch(err){
    console.log(err);
  };
};

export const applySettingsChanges = async function(
  firstNameInput:string,
  lastNameInput:string,
  emailInput:string,
  passwordInput:string,
  passwordConfInput:string,
  currentPasswordInput:string,
  navigate:Function
){
  try{
    //required inputs were not provided
    if (
      !firstNameInput || 
      !lastNameInput ||
      !emailInput ||
      !currentPasswordInput
    ) throw new Error('The first name, last name, email and current password input fields are required.');

    if (
      !isValidEmail(emailInput)
    ) throw new Error('The provided email is not a valid email');

    //a new password was provided but it does not match the new password confirmation
    if (
      passwordInput &&
      passwordConfInput &&
      passwordInput!==passwordConfInput
    ) throw new Error('New passwords do not match!');
    
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

    //verify an ok response was recieved 
    if (!response.ok) {
      throw new Error('Failed to apply new account settings');
    };

    const responseData = await response.json();
    
    if (responseData.wasUserUpdated){
      //log the user out the user was updated but a new login token wasnt created properly
      if (!responseData.loginToken){
        localStorage.removeItem('loginToken');
        throw new Error('A new login token was not provided!');
      };

      //otherwise we can safely update the login token with the response data
      localStorage.setItem('loginToken',responseData.loginToken);
      navigate('/');
    };
  }catch(err){
    console.log(err);
  };
};

export const fetchOrders = async function(setOrders:Function){
  const response = await fetch(`${getServerUrlPrefix()}/api/shop/orders`,{
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('loginToken')}`
    }
  });
  const responseData = await response.json();
  if (responseData.orders) setOrders(responseData.orders);
};

export const getResetTokenStatus = async function(
    resetID:string,
    setIsExpired:Function
  ){
  const response = await fetch(`${getServerUrlPrefix()}/api/users/forgotPassword/${resetID}`,{
    method: 'GET'
  });
  const responseData = await response.json();
  setIsExpired(responseData.isExpired);
};

export const handleSubmitForgotPassword = async function(
    resetID:string,
    passwordInput:string,
    passwordConfInput:string,
    setIsExpired:Function,
    isExpired:boolean,
    navigate:any,
    setMessage:Function
  ){
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

export const genErrorMessageElement = function(errorMessage:string,){
  //an error does not exist
  if (!errorMessage) return null;
  //display error
  return(
    <p className='login-error-message'>{errorMessage}</p>
  );
};

export const submitLogin = async function(emailInput:string,passwordInput:string,setErrorMessage:Function){
  //ensure all inputs are completed
  if (!emailInput || !passwordInput){
    setErrorMessage('* Please ensure both the email and password input fields are completed before submitting this form.');
    return;
  };
  //ensure email is valid
  if (!isValidEmail(emailInput)){
    setErrorMessage('* Please enter a valid email to submit this form');
    return;
  };
  const response = await fetch(`${getServerUrlPrefix()}/api/users/login`,{
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
    window.history.back();
  }else{
    setErrorMessage(responseData.message);
  }
};

export const handleForgotPassword = async function(emailInput:string,setErrorMessage:Function){
  if (!isValidEmail(emailInput)){
    setErrorMessage('* Please ensure you have entered a valid email');
    return;
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
    alert('Your request has been processed. If an account exists for the provided email address you will recieve an email with a password reset link.');
  };
};

export const submitRegister = async function(
  emailInput:string,
  passwordInput:string,
  passwordConfirmInput:string,
  firstNameInput:string,
  lastNameInput:string,
  setErrorMessage:Function
){
  //ensure all inputs are completed
  if (!emailInput || !passwordInput || !passwordConfirmInput || !firstNameInput || !lastNameInput){
    setErrorMessage('* Please ensure all input fields are completed before submitting this form.');
    return;
  };
  //ensure email is valid
  if (!isValidEmail(emailInput)){
    setErrorMessage('* Please enter a valid email to submit this form');
    return;
  };
  //ensure passwords match
  if (passwordInput!==passwordConfirmInput){
    setErrorMessage('* Entered passwords do not match.');
    return;
  };
  const response = await fetch(`${getServerUrlPrefix()}/api/users/register`,{
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
    window.history.back();
  }else{
    setErrorMessage(responseData.message);
  }
};