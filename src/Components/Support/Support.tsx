import React, { useState } from 'react';
import './Support.css';
import {motion} from 'framer-motion';
import Sidebar from '../Home/Sidebar/Sidebar';
import { Cart } from '../../Interfaces/interfaces';
import { emptyCart } from '../../Helpers/cart';

export default function Support(){
  const [isContactUsExpanded,setIsContactUsExpanded] = useState<boolean>(false);
  const [isPriorityExpanded,setIsPriorityExpanded] = useState<boolean>(false)
  const [isFaqExpanded,setIsFaqExpanded] = useState<boolean>(false)

  const [isSignedIn,setIsSignedIn] = useState<boolean>(true);
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);
  const [cart,setCart] = useState<Cart>(emptyCart);

  return(
    <>
      <Sidebar
        cart={cart}
        isExpanded={isSidebarExpanded} 
        setIsExpanded={setIsSidebarExpanded}
        isSignedIn={isSignedIn}
        setIsSignedIn={setIsSignedIn}
      />
      <main className='support'>
        <h3>How May We Assist You?</h3>
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
                <li className='faq-item'>
                  <p className='question'>Q: What Shipping Carrier Do You Use?</p>
                  <p className='answer'>A: We use USPS (United States Postal Service) for all shipments.</p>
                </li>

                <li className='faq-item'>
                  <p className='question'>Q: Why Has My Order's Tracking Number Stopped Updating?</p>
                  <p className='answer'>A: During the holiday season, USPS experiences high order volumes, leading to delays in tracking updates. If your tracking number hasn't updated in a few days, please contact us for further assistance.</p>
                </li>

                <li className='faq-item'>
                  <p className='question'>Q: When Will My Order Ship?</p>
                  <p className='answer'>A: We'll ship your order on the requested ship date. If you selected a holiday, we'll process your order on the next available business day.</p>
                </li>

                <li className='faq-item'>
                  <p className='question'>Q: Are Your Bagels Gluten-Free?</p>
                  <p className='answer'>A: Currently, our bagels are not gluten-free.</p>
                </li>

                <li className='faq-item'>
                  <p className='question'>Q: Are Your Bagels Kosher Certified?</p>
                  <p className='answer'>A: At present, our bagels are not Kosher certified.</p>
                </li>

                <li className='faq-item'>
                  <p className='question'>Q: Are Your Bagels Nut-Free?</p>
                  <p className='answer'>A: Our bagels are not nut-free.</p>
                </li>

                <li className='faq-item'>
                  <p className='question'>Q: Why can't I select more than 1 flavor in a six-pack?</p>
                  <p className='answer'>A: That perk is exclusive to club members only. Consider subscribing to one of our excellent club member tiers to gain access to this perk and more!</p>
                </li>

                <li className='faq-item'>
                  <p className='question'>Q: Will my order be fresh?</p>
                  <p className='answer'>A: Yes, we are committed to providing fresh gourmet bagels and spreads. We are the only site to vacuum seal all bagels two hours after baking to ensure freshness. If you are unsatisfied with the quality of your order, please contact us, and we will address your concerns promptly.</p>
                </li>

                <li className='faq-item'>
                  <p className='question'>Q: Are you a ghost kitchen?</p>
                  <p className='answer'>A: No, we are an established retail business. Brendel's has three retail locations across Long Island, New York, and primarily ships from their Hauppauge facility.</p>
                </li>

                <li className='faq-item'>
                  <p className='question'>Q: Who is baking the bagels?</p>
                  <p className='answer'>A: Craig Brendel, a hands-on artisan, along with his professional staff, ensure the quality of each bagel meets the highest standards.</p>
                </li>

                <li className='faq-item'>
                  <p className='question'>Q: Where do you ship and make your bagels?</p>
                  <p className='answer'>A: Your order is baked, packed, and shipped from Long Island, New York.</p>
                </li>
              </motion.ul>
              :
              null
            } 
        </section>
      </main>
    </>
  );
};