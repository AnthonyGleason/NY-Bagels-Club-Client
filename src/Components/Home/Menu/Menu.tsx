import React, {  useState } from 'react';
import {   Product } from '../../../Interfaces/interfaces';
import './Menu.css';
import { scrollToID } from '../../../Helpers/misc';
import { getBagelMenuItems, getPastryMenuItems, getSpreadMenuItems } from '../../../Helpers/menu';
import { motion } from 'framer-motion';
import menuDesktopImg from '../../../Assets/backgrounds/menu.webp';
import menuMobileImg from '../../../Assets/backgrounds/menu-mobile.webp';
export default function Menu({
  bagelItems,
  pastryItems
}:{
  bagelItems:Product[],
  pastryItems:Product[]
}){
  const [isBagelsExpanded, setIsBagelsExpanded] = useState<boolean>(true);
  const [isPastriesExpanded,setIsPastriesExpanded] = useState<boolean>(true);
  
  return(
    <section id='our-menu' className='our-menu-wrapper'>
      <h3 
        id='our-menu' 
        className='our-menu-heading our-menu-subscription-wrapper store-items-heading'
      >
        <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{duration: 2.5}}
        viewport={{once: false}}>
          Our Menu
        </motion.span>
      </h3>
      <img loading='lazy' className='menu-background-img' src={window.innerWidth<450 ? menuMobileImg : menuDesktopImg} alt='new york bagels club menu' />
      <div className='our-menu-content'>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{duration: 3}}
          viewport={{once: true}} 
          className='our-menu-cat'
        >
          <button className='our-menu-cat-nav-button' onClick={()=>{setIsBagelsExpanded(!isBagelsExpanded)}}><span className='brendels'>Brendel's</span><span>Gourmet Bagels</span></button>
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: isBagelsExpanded? "auto" : 0}}
            transition={{ duration: 0.5 }}
            className='our-menu-cat-content'
          > 
            { getBagelMenuItems(bagelItems)}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{duration: 3}}
          viewport={{once: true}} 
          className='our-menu-cat'
        >
          <button className='our-menu-cat-nav-button' onClick={()=>{setIsPastriesExpanded(!isPastriesExpanded)}}>
            <span className='brendels'>Brendel's</span><span>Gourmet Pastries</span>
          </button>
          <motion.div 
            initial={{ height: 0}}
            animate={{ height: isPastriesExpanded? "auto" : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className='our-menu-cat-content'
          >
            {getPastryMenuItems(pastryItems)}
          </motion.div>
        </motion.div>

        {/* <motion.div
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
        </motion.div> */}

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{duration: 3}}
          viewport={{once: true}} 
          className='our-menu-cat'>
          <button className='our-menu-cat-nav-button' onClick={()=>{scrollToID('custom-orders-header',true)}}><span className='brendels'>Brendel's</span><span>Made Just For You</span></button>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{duration: 3}}
          viewport={{once: true}} 
          className='our-menu-cat'>
          <button className='our-menu-cat-nav-button exit-our-menu' onClick={()=>{scrollToID('store',false,true)}}>Exit Menu</button>
        </motion.div>
      </div>
    </section>
  )  
}