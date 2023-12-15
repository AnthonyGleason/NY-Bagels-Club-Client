import { BagelItem, PastryItem, SpreadItem } from "../Interfaces/interfaces";
import { scrollToID } from "./misc";

export const getBagelMenuItems = function(storeItems:(BagelItem | SpreadItem)[]){
  const bagelItems:BagelItem[] = storeItems.filter(item => item.cat === 'bagel') as BagelItem[];
  const allItems = bagelItems.sort((a:BagelItem,b:BagelItem)=>{
    if (a.name<b.name) return -1
    return 1;
  }).map((bagelItem:BagelItem,index:number)=>{
    return(
        <button key={index} onClick={()=>{scrollToID(`item-${bagelItem._id}`)}}>{bagelItem.name}</button>
      )
  });
  return allItems;
};

export const getSpreadMenuItems = function(storeItems:(BagelItem | SpreadItem)[]){
  const spreadItems:SpreadItem[] = storeItems.filter(item => item.cat === 'spread') as SpreadItem[];
  const allItems = spreadItems.sort((a:SpreadItem,b:SpreadItem)=>{
    if (a.name<b.name) return -1;
    return 1;
  }).map((spreadItem:SpreadItem,index:number)=>{
    return(
        <button key={index} onClick={()=>{scrollToID(`item-${spreadItem._id}`)}}>{spreadItem.name}</button>
      )
  });
  return allItems;
};

export const getPastryMenuItems = function(storeItems:(BagelItem | SpreadItem)[]){
  const pastryItems:PastryItem[] = storeItems.filter(item => item.cat === 'pastry') as PastryItem[];
  const allItems = pastryItems.sort((a:PastryItem,b:PastryItem)=>{
    if (a.name<b.name) return -1;
    return 1;
  }).map((pastryItem:PastryItem,index:number)=>{
    return(
        <button key={index} onClick={()=>{scrollToID(`item-${pastryItem._id}`)}}>{pastryItem.name}</button>
      )
  });
  return allItems;
};

export const handleHideMenuElements = function(isBagelsVisible:boolean,isSpreadsVisible:boolean){
  const buttonHeadingElements:any = document.querySelectorAll('.menu-button-heading');
  if (isBagelsVisible || isSpreadsVisible && buttonHeadingElements){
    buttonHeadingElements.forEach((buttonHeadingElement:any)=>buttonHeadingElement.style.display='none');
  }else{
    buttonHeadingElements.forEach((buttonHeadingElement:any)=>buttonHeadingElement.style.display='flex');
  }
};