import React,{useState} from 'react';
import menuImg from '../../../Assets/menu.svg';
import './Sidebar.css';
import cartImg from '../../../Assets/cart.svg';
import pianoNotes from '../../../Assets/audio/pianoNotes.mp3';
import { useNavigate } from 'react-router-dom';
export default function Sidebar(
  {
    totalCartItems,
    isExpanded,
    setIsExpanded
  }:{
    totalCartItems:number,
    isExpanded:boolean,
    setIsExpanded:Function
  }
){
  const navigate = useNavigate();
  const [hasAudioPlayed,setHasAudioPlayed] = useState<boolean>(false);
  const toggleExpandMenu = function(){
    //menu audio has not played yet in the current session
    if (!hasAudioPlayed) {
      //play the audio
      const audio = new Audio(pianoNotes);
      audio.play();
      //update the state so the audio doesn't play twice in a single user browsing session
      setHasAudioPlayed(true);
    };
    //expand the menu
    setIsExpanded(isExpanded===true ? false : true);
  };

  //sidebar is expanded
  if (isExpanded){
    return(
      <section className='sidebar-expanded'>
        <button className='sidebar-expand-toggle' onClick={()=>{toggleExpandMenu()}}>
          <img src={menuImg} alt='expand sidebar menu' /> 
        </button>
        <ol className='sidebar-nav'>
          <li>
            <button onClick={()=>{navigate('/login')}}>Login</button>
          </li>
          <li>
            <button onClick={()=>{navigate('/register')}}>Register</button>
          </li>
          <li className='cart'>
            <button onClick={()=>{navigate('/cart')}}>
              <img src={cartImg} alt='cart' />
              <span>{totalCartItems} items</span>
            </button>
          </li>
          <li className='checkout'>
            <button onClick={()=>{navigate('/cart/checkout')}}>Checkout</button>
          </li>
        </ol>
      </section>
    );
  }else{
    return(
      <section className='sidebar-closed'>
        <button className='sidebar-expand-toggle' onClick={()=>{toggleExpandMenu()}}>
          <img src={menuImg} alt='expand sidebar menu' /> 
        </button>
      </section>
    );
  }
}