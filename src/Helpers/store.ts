import { getServerUrlPrefix } from "../Config/clientSettings";
import { BagelItem, SpreadItem } from "../Interfaces/interfaces";

export const fetchAndSetStoreItems = async function(storeItemSetter:Function){
  try{
    const response = await fetch(`${getServerUrlPrefix()}/api/shop/all`,{
      method: 'GET'
    });
    const responseData = await response.json();
    const allItems: (BagelItem | SpreadItem)[] | null = responseData.allItems;
    //handle no items found
    if (!allItems) throw new Error('There was an error retrieving shop items.');
    //assuming items were retrieved successfully
    storeItemSetter(responseData.allItems);
  }catch(err){
    console.log(`There was an error ${err} when retrieving shop items.`);
  };
};