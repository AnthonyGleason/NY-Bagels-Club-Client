import React from 'react';
import './Nav.css';
import { useNavigate } from 'react-router-dom';

export default function Nav(){
  const navigate = useNavigate();

  return(
    <nav className='nav'>
      <button onClick={()=>{navigate('/')}}>
        <h3>
          Brendel's Bagels
          <br />
          Made With Love
        </h3>
      </button>
    </nav>
  )
}