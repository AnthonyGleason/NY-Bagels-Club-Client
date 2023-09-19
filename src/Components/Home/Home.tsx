import React, {useEffect, useState} from 'react';
import Sidebar from './Sidebar/Sidebar';
import './Home.css';
import StoreItems from './StoreItems/StoreItems';
import InitLoad from './InitLoad/InitLoad';
import About from './About/About';

export default function Home(){
  const [totalCartItems,setTotalCartItems] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);

  if (isLoaded){
    return(
      <main className='home'>
        <Sidebar 
          totalCartItems={totalCartItems} 
          isExpanded={isSidebarExpanded} 
          setIsExpanded={setIsSidebarExpanded}
        />
        <div className='home-content-wrapper' onClick={()=>{setIsSidebarExpanded(isSidebarExpanded===true ? false: false)}}>
          <About />
          <h3>New York to Your Doorstep</h3>
          <StoreItems totalCartItems={totalCartItems} setTotalCartItems={setTotalCartItems} />
        </div>
      </main>
    );
  }else{
    return(
      <InitLoad setIsLoaded={setIsLoaded} />
    );
  };
}