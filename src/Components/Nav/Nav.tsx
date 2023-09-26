import React from 'react';
import './Nav.css';
import { useNavigate } from 'react-router-dom';

export default function Nav(){
  const navigate = useNavigate();

  return(
    <nav className='nav'>
      <button onClick={()=>{navigate('/')}}>
        <h3>
          <span>New York Bagel's Club</span>
          <span>Always Fresh</span>
        </h3>
      </button>
    </nav>
  )
}