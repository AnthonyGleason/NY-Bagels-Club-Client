import React, { useEffect, useRef, useState } from 'react';
import './Support.css';
import {motion} from 'framer-motion';
import Sidebar from '../Sidebar/Sidebar';
import { Cart } from '../../Interfaces/interfaces';
import { emptyCart, fetchAndHandleCart } from '../../Helpers/cart';

export default function Support(){
  const [isContactUsExpanded,setIsContactUsExpanded] = useState<boolean>(true);
  const [isFaqExpanded,setIsFaqExpanded] = useState<boolean>(true)

  const [isSignedIn,setIsSignedIn] = useState<boolean>(true);
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);
  const [cart,setCart] = useState<Cart>(emptyCart);

  const isInitialLoad = useRef(true);
  
  useEffect(()=>{
    if (isInitialLoad.current){
      isInitialLoad.current=false;
      fetchAndHandleCart(setCart);
    };
  },[]);

  let counter:number = 0;

  function createFaqItem(question:string, answer:string) {
    return (
      <li key={counter} className='faq-item'>
        <p className='question'>Q: {question}</p>
        <p className='answer'>A: {answer}</p>
      </li>
    )
  }

  const faqItems = [
    createFaqItem("What Shipping Carrier Do You Use?", "We use USPS (United States Postal Service) for all shipments."),
    createFaqItem("Why Has My Order's Tracking Number Stopped Updating?", "During the holiday season, USPS experiences high order volumes, leading to delays in tracking updates. If your tracking number hasn't updated in a few days, please contact us for further assistance."),
    createFaqItem("When Will My Order Ship?", "We'll ship your order on the requested ship date. If you selected a holiday, we'll process your order on the next available business day."),
    createFaqItem("Are Your Bagels Gluten-Free?", "Currently, our bagels are NOT gluten-free."),
    createFaqItem("Are Your Bagels Kosher Certified?", "Currently, our bagels are NOT Kosher certified."),
    createFaqItem("Are Your Bagels Nut-Free?", "Our bagels are NOT nut-free."),
    createFaqItem("Why can't I select more than 1 flavor in a six-pack?", "That perk is exclusive to club members only. Consider subscribing to one of our excellent club member tiers to gain access to this perk and more!"),
    createFaqItem("Will my order be fresh?", "Yes, we are committed to providing fresh gourmet bagels and spreads. We are the only site to vacuum seal all bagels two hours after baking to ensure freshness. If you are unsatisfied with the quality of your order, please contact us, and we will address your concerns promptly."),
    createFaqItem("Are you a ghost kitchen?", "No, we are an established retail business. Brendel's has three retail locations across Long Island, New York, and primarily ships from their Hauppauge facility."),
    createFaqItem("Who is baking the bagels?", "Craig Brendel, a hands-on artisan, along with his professional staff, ensure the quality of each bagel meets the highest standards."),
    createFaqItem("Where do you ship and make your bagels?", "Your order is baked, packed, and shipped from Long Island, New York."),
  ];

  return(
    <>
      <Sidebar
        cart={cart}
        isExpanded={isSidebarExpanded} 
        setIsExpanded={setIsSidebarExpanded}
        isSignedIn={isSignedIn}
        setIsSignedIn={setIsSignedIn}
      />
      <main 
        className='support'
        onClick={()=>{setIsSidebarExpanded(isSidebarExpanded===true ? false: false)}}
      >
        <h3>How May We Assist You?</h3>
        <section className='faq-section'>
          <button onClick={()=>{setIsFaqExpanded(!isFaqExpanded)}} className='faq-dropdown-button'>Frequently Asked Questions</button>
            {
              isFaqExpanded ?
              <motion.ul
                className='faq-wrapper'
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: isFaqExpanded ? "auto" : 0, opacity: isFaqExpanded ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut"  }}
              >
                {
                  faqItems
                }
              </motion.ul>
              :
              null
            } 
        </section>
        <section className='contact-section'>
          <button onClick={() => setIsContactUsExpanded(!isContactUsExpanded)}>
            Contact Us
          </button>
          {
            isContactUsExpanded ?
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: isContactUsExpanded ? "auto" : 0, opacity: isContactUsExpanded ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut"  }}
              >
                <li>support@nybagelsclub.com</li>
              </motion.ul>
            :
              null
          }
        </section>
      </main>
    </>
  );
};