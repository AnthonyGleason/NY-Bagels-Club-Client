import React, { useEffect, useRef, useState } from 'react';
import './Careers.css';
import spinnerImg from '../../Assets/icons/bubble-loading-white.svg';
import Sidebar from '../Sidebar/Sidebar';
import { emptyCart, fetchAndHandleCart } from '../../Helpers/cart';
import { Cart } from '../../Interfaces/interfaces';

export default function Careers() {
  const [didResumeSubmit, setDidResumeSubmit] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setSelectedFile(file);
    } else {
      alert('Please select a valid PDF or DOCX file.');
      // Reset the file input if an invalid file is selected
      event.target.value = '';
    }
  };

  const [isLoading,setIsLoading] = useState<boolean>(false);

  const handleSubmitResume = () => {
    if (!selectedFile){
      alert('Please upload either a pdf or docx to submit this form.');
      return 0;
    };
    setIsLoading(true);
    setTimeout(() => {
      setDidResumeSubmit(true);
      setIsLoading(false);
    }, 5000);
    
  };

  const isInitialLoad = useRef(true);

  const [cart,setCart] = useState<Cart>(emptyCart);
  const [isSignedIn,setIsSignedIn] = useState<boolean>(true);
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);

  useEffect(()=>{
    if (isInitialLoad.current){
      isInitialLoad.current=false;
      fetchAndHandleCart(setCart);
    };
  },[isInitialLoad]);

  return (
    <>
      <Sidebar 
        cart={cart}
        isExpanded={isSidebarExpanded} 
        setIsExpanded={setIsSidebarExpanded}
        isSignedIn={isSignedIn}
        setIsSignedIn={setIsSignedIn}
      />
      {
        didResumeSubmit===false  ?
        <main className='careers' onClick={()=>{setIsSidebarExpanded(isSidebarExpanded===true ? false: false)}}>
          <form className='careers-content-wrapper'>
            <h2>Join Our Team!</h2>
            <p>
              Thank you for your interest in joining our team! While we currently do not have any open positions, we encourage you to share your resume with us. Should there be a match with future opportunities, we will reach out to you.
            </p>
            <div className='careers-submit-buttons'>
              <input type='file' accept='.pdf, .docx' onChange={handleFileChange} />
              {
                isLoading === true ?
                <button type='button' onClick={handleSubmitResume}>
                  <img src={spinnerImg} alt='loading' />
                </button> 
              :
                <button type='button' onClick={handleSubmitResume}>Submit</button>
              }
            </div>
          </form>
        </main>
        :
        <main className='careers'>
          <div className='careers-content-wrapper'>
            <p>
              Thank you for submitting your resume. We will contact you if you match any of our future opportunities.
            </p>
          </div>
        </main>
      }
    </>
  );
}
