import React, { useEffect, useState } from 'react';
import { BagelItem, SpreadItem } from '../../../Interfaces/interfaces';
import { scrollToID } from '../../../Helpers/misc';
import './Menu.css';

export default function Menu({storeItems}:{storeItems:(BagelItem | SpreadItem)[]}){
  //menu states
  const [isBagelsVisible, setIsBagelsVisible] = useState<boolean>(false);
  const [isSpreadsVisible,setIsSpreadsVisible] = useState<boolean>(false);

  //hide other menu options when one option is expanded
  useEffect(()=>{
    const buttonHeadingElements:any = document.querySelectorAll('.menu-button-heading');
    if (isBagelsVisible || isSpreadsVisible && buttonHeadingElements){
      buttonHeadingElements.forEach((buttonHeadingElement:any)=>buttonHeadingElement.style.display='none');
    }else{
      buttonHeadingElements.forEach((buttonHeadingElement:any)=>buttonHeadingElement.style.display='flex');
    }
  },[isBagelsVisible,isSpreadsVisible]);

  const getBagelMenuItems = function(){
    const bagelItems:BagelItem[] = storeItems.filter(item => item.cat === 'bagel') as BagelItem[];
    const allItems = bagelItems.map((bagelItem:BagelItem,index:number)=>{
      return(
        <div key={index}>
          <button onClick={()=>{scrollToID(`item-${bagelItem._id}`)}}>{bagelItem.name}</button>
        </div>
        )
    });
    return allItems;
  };

  const getSpreadMenuItems = function(){
    const spreadItems:SpreadItem[] = storeItems.filter(item => item.cat === 'spread') as SpreadItem[];
    const allItems = spreadItems.map((spreadItem:SpreadItem,index:number)=>{
      return(
        <div key={index}>
          <button onClick={()=>{scrollToID(`item-${spreadItem._id}`)}}>{spreadItem.name}</button>
        </div>
        )
    });
    return allItems;
  };

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
                getBagelMenuItems()
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
                getSpreadMenuItems()
              }
            </div>
          }
        </div>
        
    </section>
  )
}