import React from 'react';
import { scrollToID } from '../../../../Helpers/misc';
import upArrowImg from '../../../../Assets/icons/arrow-up-outline.svg';

export default function CornerButtons(){
  return(
    <div className='corner-buttons'>
      <button onClick={()=>{scrollToID('nav')}} className='scroll-up-button'>
        <img decoding='async' src={upArrowImg} alt='scroll up' loading='lazy' />
      </button>
    </div>
  )
}