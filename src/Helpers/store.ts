import { getServerUrlPrefix } from "../Config/clientSettings";

export const fetchAndSetStoreItems = async function(setBagelItems?:Function,setPastryItems?:Function){  
  try{
    //make request for all store items
    const response = await fetch(`${getServerUrlPrefix()}/api/shop/all`,{
      method: 'GET'
    });
    const responseData = await response.json();
    const { bagelItems,pastryItems } = responseData;
    //handle no items found
    if (!bagelItems || !pastryItems) throw new Error('There was an error retrieving shop items.');

    if (setBagelItems && bagelItems) setBagelItems(bagelItems);
    if (setPastryItems && pastryItems) setPastryItems(pastryItems);
  }catch(err){
    console.log(`There was an error ${err} when retrieving shop items.`);
  };
};