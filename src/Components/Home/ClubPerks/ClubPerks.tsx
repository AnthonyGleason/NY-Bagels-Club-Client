import React from 'react';
import {motion} from 'framer-motion';

export default function ClubPerks(){
  return(
    <section className='club-perks'>
      <motion.h3 
        id='join-the-club'
        className='store-items-heading'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{duration: 2.5}}
        viewport={{once: false}}
      >
        <span>
          Subscriptions Coming Soon!
        </span>
        <span
          className='our-menu-subscription'
        >
          No Account or Subscription Required to Order
        </span>
      </motion.h3>
      <div className='club-tiers'>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{duration: 2.5}}
          viewport={{once: false}}
          className='gold'
        >
          <h3 >
            <span>Gold Member</span>
            <span>$39.95 / Month</span>
          </h3>
          <ul>
            <li>
              Enjoy a monthly treat of a Baker's Dozen for yourself or a friend.
            </li>
            <li>Personalize your delivery with your choice of 6 delicious flavors.</li>
            <li>A 1/2 LB spread included with the fulfillment of monthly subscription orders.</li>
            <li>Priority mail shipping included with each monthly subscription order.</li>
            <li>5% off Non-Member Pricing.</li>
            <li className='club-value'><strong>Gain an Exceptional 34% Value!</strong></li>
          </ul>
          <button className='home-subscribe-now' type='button' onClick={()=>{
            //navigate('/subscribe')
          }}>
            Coming Soon!
          </button>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{duration: 2.5}}
          viewport={{once: false}}
          className='platinum'
        >
          <h3>
            <span>Platinum Member</span>
            <span>$79.95 / Month</span>
          </h3>
          <ul>
            <li>Enjoy two monthly deliveries of a Baker's Dozen for yourself or a friend.</li>
            <li>Personalize your delivery with your choice of 6 delicious flavors.</li>
            <li>A 1/2 LB spread included with the fulfillment of monthly subscription orders.</li>
            <li>Priority mail shipping included with each monthly subscription order.</li>
            <li>10% off Non-Member Pricing.</li>
            <li className='club-value'><strong>Gain an Outstanding 40% Value!</strong></li>
          </ul>
          <button className='home-subscribe-now' type='button' onClick={()=>{
            //navigate('/subscribe')
          }}>
            Coming Soon!
          </button>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{duration: 2.5}}
          viewport={{once: false}}
          className='diamond'
        >
          <h3>
            <span>Diamond Member</span>
            <span>$159.95 / Month</span>
          </h3>
          <ul>
            <li>Enjoy four monthly deliveries of a Baker's Dozen for yourself or a friend.</li>
            <li>Personalize your delivery with your choice of 6 delicious flavors.</li>
            <li>A 1/2 LB spread included with the fulfillment of monthly subscription orders.</li>
            <li>Priority mail shipping included with each monthly subscription order.</li>
            <li>15% off Non-Member Pricing</li>
            <li>Skip the wait, receive a direct line to our priority customer service team!</li>
            <li className='club-value'><strong>Gain An Unparalleled 44% Value!</strong></li>
          </ul>
          <button className='home-subscribe-now' type='button' onClick={()=>{
            //navigate('/subscribe')
          }}>
            Coming Soon!
          </button>
        </motion.div>
      </div>
    </section>  
  )
}