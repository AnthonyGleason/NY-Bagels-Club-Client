import { getServerUrlPrefix } from "../Config/clientSettings";
import { requestApplyMembershipPricingToCart } from "./cart";
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
  const loginToken:string | null = localStorage.getItem('loginToken');
  try{
    if (!loginToken) throw new Error('A login token was not found! Are you logged in?');
    const response = await fetch(`${getServerUrlPrefix()}/api/shop/orders`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginToken}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch orders for the current user.');
    const responseData = await response.json();
    if (responseData.orders) setOrders(responseData.orders);
  }catch(err){
    console.log(err);
  };
};

export const getResetTokenStatus = async function(
    resetID:string,
    setIsExpired:Function
  ){
  try{
    const response = await fetch(`${getServerUrlPrefix()}/api/users/forgotPassword/${resetID}`,{
      method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to get password reset token status.');
    const responseData = await response.json();
    setIsExpired(responseData.isExpired);
  }catch(err){
    console.log(err);
  };
};

export const handleSubmitForgotPassword = async function(
    resetID:string,
    passwordInput:string,
    passwordConfInput:string,
    setIsExpired:Function,
    navigate:any,
    setMessage:Function
  ){
  try{
    if (!resetID || !passwordInput || !passwordConfInput) throw new Error('Required inputs are missing!');
    if (passwordInput!==passwordConfInput) throw new Error('Passwords do not match!');
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
    if (!response.ok) throw new Error('Failed to submit the forgot password form. Please try again later.');
    const responseData = await response.json();
    setIsExpired(responseData.isExpired);
    if (responseData.wasUpdated) navigate('/login');
    if (!responseData.isExpired) setMessage('Passwords do not match or user does not exist.');
  }catch(err){
    console.log(err);
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

export const submitLogin = async function(emailInput:string,passwordInput:string,setErrorMessage:Function,navigate:Function){
  try{
    //ensure all inputs are completed
    if (!emailInput || !passwordInput){
      const errMessage = '* Please ensure both the email and password input fields are completed before submitting this form.';
      setErrorMessage(errMessage);
      throw new Error(errMessage);
    };

    //ensure email is valid
    if (!isValidEmail(emailInput)){
      const errMessage = '* Please enter a valid email to submit this form';
      setErrorMessage(errMessage);
      throw new Error(errMessage);
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

    if (!response.ok) throw new Error('Failed to log in user.');

    const responseData = await response.json();
    if (responseData.token){
      localStorage.setItem('loginToken',responseData.token);
      //redirect user back to the last page they were on
      // window.history.back();
      
      //in the future i would like to have users redirected to certain pages if they are specified in props but for now we will redirect to the home page
      navigate('/');
    }else{
      setErrorMessage(responseData.message);
      throw new Error(responseData.message);
    };
  }catch(err){
    console.log(err);
  };
};

export const handleForgotPassword = async function(emailInput:string,setErrorMessage:Function){
  try{
    if (!emailInput){
      const errorMessage:string = '* The email field cannot be left blank.';
      setErrorMessage(errorMessage);
      throw new Error(errorMessage);
    };

    if (!isValidEmail(emailInput)){
      const errorMessage:string = '* Please ensure you have entered a valid email.';
      setErrorMessage(errorMessage);
      throw new Error(errorMessage);
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
    
    if (!response.ok) throw new Error('Failed to request a forgot password email.');
    const responseData = await response.json();
    if (responseData.isEmailSent){
      alert('Your request has been processed. If an account exists for the provided email address you will recieve an email with a password reset link.');
    };
  }catch(err){
    console.log(err);
  };
};

export const submitRegister = async function(
  emailInput:string,
  passwordInput:string,
  passwordConfirmInput:string,
  firstNameInput:string,
  lastNameInput:string,
  setErrorMessage:Function,
  isRequestSent:boolean,
  setIsRequestSent:Function
){
  if (isRequestSent) return;
  try{
    //ensure all inputs are completed
    if (!emailInput || !passwordInput || !passwordConfirmInput || !firstNameInput || !lastNameInput){
      const errMessage:string = '* Please ensure all input fields are completed before submitting this form.';
      setErrorMessage(errMessage);
      throw new Error(errMessage);
    };
    //ensure email is valid
    if (!isValidEmail(emailInput)){
      const errMessage:string = '* Please enter a valid email to submit this form';
      setErrorMessage(errMessage);
      throw new Error(errMessage);
    };
    //ensure passwords match
    if (passwordInput!==passwordConfirmInput){
      const errMessage:string = '* Entered passwords do not match.';
      setErrorMessage(errMessage);
      throw new Error(errMessage);
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
    setIsRequestSent(true);
    if (!response.ok) throw new Error('An error has occured when registering the new user.');

    const responseData = await response.json();

    if (responseData.token){
      localStorage.setItem('loginToken',responseData.token);
      setIsRequestSent(true);
      window.history.back();
    }else{
      setErrorMessage(responseData.message);
      setIsRequestSent(false);
    };
    
  }catch(err){
    console.log(err);
  };
};