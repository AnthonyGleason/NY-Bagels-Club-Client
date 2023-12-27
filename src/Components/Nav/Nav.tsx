import React from 'react';
import './Nav.css';
import { useNavigate } from 'react-router-dom';
import navImg from '../../Assets/backgrounds/bricks.webp';
import {motion} from 'framer-motion';

export default function Nav(){
  const navigate = useNavigate();

  return(
    <motion.nav 
      style={{backgroundImage: `url('${window.innerWidth<=450 ? './Assets/bricks-mobile.webp' : navImg}')`}}
      id='nav' 
      className='nav'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{duration: 1.5}}
      viewport={{once: false}}
    >
      <div className='nav-content'>
        <a href='https://www.nybagelsclub.com'>
          <h1>New York Bagels Club</h1>
          <h2>"Always Fresh"</h2>
        </a>
      </div>
    </motion.nav>
  )
}