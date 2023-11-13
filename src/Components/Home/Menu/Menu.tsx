import React, { useEffect, useState } from 'react';
import { BagelItem, SpreadItem } from '../../../Interfaces/interfaces';
import './Menu.css';
import { scrollToID } from '../../../Helpers/misc';
import { getBagelMenuItems, getSpreadMenuItems } from '../../../Helpers/menu';
import { motion } from 'framer-motion';

export default function Menu({storeItems}:{storeItems:(BagelItem | SpreadItem)[]}){
  const [isBagelsExpanded, setIsBagelsExpanded] = useState<boolean>(false);
  const [isSpreadsExpanded,setIsSpreadsExpanded] = useState<boolean>(false);

  return(
    <>
      <motion.h3 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{duration: 3}}
        viewport={{once: false}}
        id='our-menu' 
        className='our-menu-heading our-menu-subscription-wrapper store-items-heading'
      >
        <span>Our Menu</span>
        <span className='our-menu-subscription'>(No Subscription Required For Purchase)</span>
      </motion.h3>
      <section id='our-menu' className='our-menu-wrapper'>
        <div className='our-menu-content'>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{duration: 3}}
            viewport={{once: true}} 
            className='our-menu-cat'
          >
            <button className='our-menu-cat-nav-button' onClick={()=>{isBagelsExpanded ? setIsBagelsExpanded(false) : setIsBagelsExpanded(true)}}><span className='brendels'>Brendel's</span><span>Gourmet Bagels</span></button>
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: isBagelsExpanded? "auto" : 0}}
              transition={{ duration: 0.5 }}
              className='our-menu-cat-content'
            > 
              { getBagelMenuItems(storeItems)}
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{duration: 3}}
            viewport={{once: true}} 
            className='our-menu-cat'
          >
            <button className='our-menu-cat-nav-button' onClick={()=>{isSpreadsExpanded ? setIsSpreadsExpanded(false) : setIsSpreadsExpanded(true)}}><span className='brendels'>Brendel's</span><span>Gourmet Spreads</span></button>
            <motion.div 
              initial={{ height: 0}}
              animate={{ height: isSpreadsExpanded? "auto" : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className='our-menu-cat-content'
            >
              {getSpreadMenuItems(storeItems)}
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{duration: 3}}
            viewport={{once: true}} 
            className='our-menu-cat'>
            <button className='our-menu-cat-nav-button' onClick={()=>{scrollToID('custom-orders-header')}}><span className='brendels'>Brendel's</span><span>Made Just For You</span></button>
          </motion.div>
        </div>
      </section>
    </>
  )  
}