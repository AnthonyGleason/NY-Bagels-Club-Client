import React, { useEffect, useState } from 'react';
import { BagelItem, SpreadItem } from '../../../Interfaces/interfaces';
import { scrollToID } from '../../../Helpers/misc';
import './Menu.css';
import { getBagelMenuItems, getSpreadMenuItems, handleHideMenuElements } from '../../../Helpers/menu';

export default function Menu({storeItems}:{storeItems:(BagelItem | SpreadItem)[]}){
  //menu states
  const [isBagelsVisible, setIsBagelsVisible] = useState<boolean>(false);
  const [isSpreadsVisible,setIsSpreadsVisible] = useState<boolean>(false);

  //hide other menu options when one option is expanded
  useEffect(()=>{
    handleHideMenuElements(isBagelsVisible,isSpreadsVisible);
  },[isBagelsVisible,isSpreadsVisible]);

  return(
    <section>
      <h3 data-aos='fade-in' id='our-menu' className='our-menu-heading'>Our Menu</h3>
        <div data-aos='fade-in' className='our-menu'>
          {
            isBagelsVisible===false ?
              <div className='menu-button-heading'>
                <button onClick={()=>setIsBagelsVisible(true)}>
                  Bagels
                </button>
              </div>
            :
            <div className='menu-option'>
              <div>
                <button onClick={()=>setIsBagelsVisible(false)}>Bagels</button>
              </div>
              {
                getBagelMenuItems(storeItems)
              }
            </div>
          }
          {
            isSpreadsVisible === false ?
              <div className='menu-button-heading'>
                <button onClick={()=>{setIsSpreadsVisible(true)}}>Brendel's Gourmet Spreads</button>
              </div>
            :
            <div className='menu-option'>
              <div>
                <button onClick={()=>{setIsSpreadsVisible(false)}}>Brendel's Gourmet Spreads</button>
              </div>
              {
                getSpreadMenuItems(storeItems)
              }
            </div>
          }
        </div>
        
    </section>
  )
}