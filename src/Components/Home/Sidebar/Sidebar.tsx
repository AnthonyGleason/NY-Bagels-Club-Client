import React,{useState} from 'react';
import menuImg from '../../../Assets/menu.svg';
import './Sidebar.css';
import cartImg from '../../../Assets/cart.svg';
export default function Sidebar(
  {
    totalCartItems,
    setTotalCartItems
  }:{
    totalCartItems:number,
    setTotalCartItems:Function
  }
){
  const [isExpanded,setIsExpanded] = useState<boolean>(false);

  const toggleExpandMenu = function(){
    isExpanded===true ? setIsExpanded(false) : setIsExpanded(true);
  };
  if (isExpanded){
    return(
      <section className='sidebar-expanded'>
        <button className='sidebar-expand-toggle' onClick={()=>{toggleExpandMenu()}}>
          <img src={menuImg} alt='expand sidebar menu' /> 
        </button>
        <ol className='sidebar-nav'>
          <li>Login</li>
          <li>Register</li>
          <li className='cart'>
            <img src={cartImg} alt='cart' />
            <p>{totalCartItems} items</p>
          </li>
          <li className='checkout'>
            <button>Checkout</button>
          </li>
        </ol>
      </section>
    )
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