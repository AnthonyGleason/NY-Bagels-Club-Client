import React from 'react';
import './Nav.css';
import { useNavigate } from 'react-router-dom';

export default function Nav(){
  const navigate = useNavigate();

  return(
    <nav id='nav' className='nav'>
      <button onClick={()=>{navigate('/')}}>
        New York Bagels Club
        <br />
        "Always Fresh"
      </button>
    </nav>
  )
}