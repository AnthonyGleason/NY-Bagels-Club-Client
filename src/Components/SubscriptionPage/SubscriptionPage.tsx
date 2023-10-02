import React, { useEffect } from 'react';
import './SubscriptionPage.css';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
};

export default function SubscriptionPage(){
  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');

    // Set the source attribute to the URL of the external script
    script.src = 'https://js.stripe.com/v3/pricing-table.js';

    // Add an event listener to know when the script has loaded
    script.onload = () => {
      console.log('External script has loaded.');
      // You can now use functions or variables defined in the external script
    };

    // Append the script element to the document's head
    document.head.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return(
    <section className='pricing-table'>
      <stripe-pricing-table
        pricing-table-id="prctbl_1NwrH1J42zMuNqyLurtliui8"
        publishable-key="pk_test_51MkbRQJ42zMuNqyLhOP6Aluvz4TVAxVFFeofdem3PAvRDUoRzwYxfm0tBeOKYhdCNhbIzSSKeVFdrp7IvVku60Yz001xBUoHhk" 
      />
    </section>
  )
};