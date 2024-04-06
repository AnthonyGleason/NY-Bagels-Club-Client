import React, { useEffect, useRef, useState } from 'react';
import './Support.css';
import {motion} from 'framer-motion';
import Sidebar from '../Sidebar/Sidebar';
import { Cart } from '../../Interfaces/interfaces';
import { emptyCart, fetchAndVerifyCart } from '../../Helpers/cart';

export default function Support(){
  const [isContactUsExpanded,setIsContactUsExpanded] = useState<boolean>(true);
  const [isFaqExpanded,setIsFaqExpanded] = useState<boolean>(true)

  const [isSignedIn,setIsSignedIn] = useState<boolean>(true);
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);
  const [cart,setCart] = useState<Cart>(emptyCart);

  const isInitialLoad = useRef(true);
  let faqItemsCounter = -1;

  useEffect(()=>{
    if (isInitialLoad.current){
      isInitialLoad.current=false;
      fetchAndVerifyCart(setCart);
    };
  },[]);

  function createFaqItem(question:string, answer:string) {
    faqItemsCounter+=1;
    return (
      <li key={faqItemsCounter} className='faq-item'>
        <p className='question'>Q: {question}</p>
        <p className='answer'>A: {answer}</p>
      </li>
    )
  }

  const faqItems = [
    createFaqItem("What Shipping Carrier Do You Use?", "We use USPS (United States Postal Service) for all shipments. Our commitment to reliable and timely delivery ensures that your order reaches you securely. If you have any specific shipping-related concerns, please contact our customer support for personalized assistance."),
    createFaqItem("Why Has My Order's Tracking Number Stopped Updating?", "During peak holiday seasons, USPS experiences heightened order volumes, leading to occasional delays in tracking updates. If your tracking number hasn't been updated in the past few days, please don't hesitate to contact our support team for further assistance."),
    createFaqItem("When Will My Order Ship?", "Your order will be shipped on the selected ship date. If you've chosen a holiday, rest assured that we'll process your order on the next available business day. For any urgent shipping requests or queries, feel free to contact our customer support."),
    createFaqItem("Are Your Bagels Gluten-Free?", "Currently, our bagels are NOT gluten-free."),
    createFaqItem("Are Your Bagels Kosher Certified?", "Currently, our bagels are NOT Kosher certified."),
    createFaqItem("Are Your Bagels Nut-Free?", "Our bagels are NOT nut-free. If you have specific dietary requirements or allergen concerns, feel free to reach out to our support team for guidance on alternative options."),
    createFaqItem("Will my order be fresh?", "Absolutely! We are dedicated to delivering fresh gourmet bagels, pastries (coming soon) and spreads (coming soon). Uniquely, we vacuum-seal all bagels just two hours after baking to ensure maximum freshness. If you ever have concerns about the quality of your order, please contact our support team, and we'll promptly address your needs."),
    createFaqItem("Are you a ghost kitchen?", "No, we are an established retail business. Brendel's proudly operates three retail locations across Long Island, New York, and primarily ships from our Hauppauge facility."),
    createFaqItem("Who is baking the bagels?", " Craig Brendel, a hands-on artisan, leads our professional baking staff in ensuring that each bagel meets the highest quality standards. Experience the dedication to craftsmanship that sets our bagels apart."),
    createFaqItem("Where do you ship and make your bagels?", "Your order is baked, packed, and shipped from physical location in Long Island, New York."),
    createFaqItem("Do you offer international shipping?","Presently, we do NOT offer international shipping but we would love to bring the delicious taste of our bagels to customers around the world. We are planning on shipping internationally to Mexico and Canada but do not have any specific launch date to announce at this time."),
    createFaqItem("What payment methods do you accept?","We accept a variety of payment methods, including major credit cards, debit cards, and other secure online payment options such as Klarna, Cashapp Pay, Apple Pay, Google Pay and Afterpay."),
    createFaqItem("How can I modify or cancel my order?"," If you need to make changes to your order or cancel it, please contact our customer support as soon as possible at support@nybagelsclub.com, we'll do our best to accommodate your request, depending on the order processing stage."),
    createFaqItem("Can I track my order in real-time?","Yes, you can track your order in real-time using the provided tracking number. If you encounter any issues or if the tracking information is not updating, feel free to reach out to our support team for assistance."),
    createFaqItem("Are there any promotions or discounts available?"," Stay tuned for our latest promotions and discounts. We regularly offer special deals and exclusive discounts to our valued customers like you. As a sign of our gratitude for having read this far, you can use code 'FAQ10' for 10% off your entire order!  Don't miss out on the chance to enjoy savings on your favorite bagels!"),
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