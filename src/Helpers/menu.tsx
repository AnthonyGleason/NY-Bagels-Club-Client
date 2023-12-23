import { BagelItem, PastryItem, Product, SpreadItem } from "../Interfaces/interfaces";
import { scrollToID } from "./misc";

export const getBagelMenuItems = function(storeItems:Product[]){
  const allItems = storeItems.map((bagelItem:Product,index:number)=>{
    return(
        <button key={index} onClick={()=>{scrollToID(`item-${bagelItem._id}`,true)}}>{bagelItem.name}</button>
      );
  });
  return allItems;
};

export const getSpreadMenuItems = function(storeItems:Product[]){
  const allItems = storeItems.map((spreadItem:Product,index:number)=>{
    return(
        <button key={index} onClick={()=>{scrollToID(`item-${spreadItem._id}`,true)}}>{spreadItem.name}</button>
      );
  });
  return allItems;
};

export const getPastryMenuItems = function(storeItems:Product[]){
  const allItems = storeItems.map((pastryItem:Product,index:number)=>{
    return(
        <button key={index} onClick={()=>{scrollToID(`item-${pastryItem._id}`,true)}}>{pastryItem.name}</button>
      );
  });
  return allItems;
};

export const handleHideMenuElements = function(isBagelsVisible:boolean,isSpreadsVisible:boolean){
  const buttonHeadingElements:any = document.querySelectorAll('.menu-button-heading');
  if ((isBagelsVisible || isSpreadsVisible) && buttonHeadingElements){
    buttonHeadingElements.forEach((buttonHeadingElement:any)=>buttonHeadingElement.style.display='none');
  }else{
    buttonHeadingElements.forEach((buttonHeadingElement:any)=>buttonHeadingElement.style.display='flex');
  }
};