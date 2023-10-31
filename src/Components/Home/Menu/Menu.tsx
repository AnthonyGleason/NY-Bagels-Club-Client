import React, { useEffect, useState } from 'react';
import { BagelItem, SpreadItem } from '../../../Interfaces/interfaces';
import { scrollToID } from '../../../Helpers/misc';
import './Menu.css';
import { getBagelMenuItems, getSpreadMenuItems, handleHideMenuElements } from '../../../Helpers/menu';

export default function Menu({storeItems}:{storeItems:(BagelItem | SpreadItem)[]}){
  //menu states
  const [isBagelsVisible, setIsBagelsVisible] = useState<boolean>(false);
  const [isSpreadsVisible,setIsSpreadsVisible] = useState<boolean>(false);
  const [isPersonalizeVisible, setIsPersonalizeVisible] = useState<boolean>(true);

  //hide other menu options when one option is expanded
  useEffect(()=>{
    
    //if any items are expanded hide the personalization menu item
    if (isBagelsVisible || isSpreadsVisible){
      setIsPersonalizeVisible(false);
    }else{
      setIsPersonalizeVisible(true);
    };

    handleHideMenuElements(isBagelsVisible,isSpreadsVisible);
  },[isBagelsVisible,isSpreadsVisible]);

  return(
    <section>
      <h3 data-aos='fade-in' id='our-menu' className='our-menu-heading our-menu-subscription-wrapper'>
        <span>Our Menu</span>
        <span className='our-menu-subscription'>(No Subscription Required For Purchase)</span>
      </h3>
        <div data-aos='fade-in' className='our-menu'>
          {
            isBagelsVisible===false ?
              <div className='menu-button-heading menu-option'>
                <button onClick={()=>setIsBagelsVisible(true)}>
                  <span className='brendels'>Brendel's</span> Gourmet Bagels
                </button>
              </div>
            :
            <div className='menu-option'>
              <div>
                <button onClick={()=>setIsBagelsVisible(false)}>
                  <span className='brendels'>Brendel's</span> Gourmet Bagels
                </button>
              </div>
              {
                getBagelMenuItems(storeItems)
              }
            </div>
          }
          {
            isSpreadsVisible === false ?
              <div className='menu-button-heading menu-option'>
                <button onClick={()=>{setIsSpreadsVisible(true)}}>
                  <span className='brendels'>Brendel's</span> Gourmet Spreads
                </button>
              </div>
            :
            <div className='menu-option'>
              <div>
                <button onClick={()=>{setIsSpreadsVisible(false)}}>
                  <span className='brendels'>Brendel's</span> Gourmet Spreads
                </button>
              </div>
              {
                getSpreadMenuItems(storeItems)
              }
            </div>
          }
          {
            isPersonalizeVisible === true ?
              <div className='menu-button-heading menu-option'>
                <button onClick={()=>(scrollToID('custom-orders-header'))}>
                  <span className='brendels'>Brendel's</span> Made Just For You
                </button>
              </div>
            :
              null
          }
        </div>
        
    </section>
  )
}