import React, { useEffect, useState } from 'react';
import { PromoCode } from '../../../Interfaces/interfaces';
import { getServerUrlPrefix } from '../../../Config/clientSettings';

export default function PromoCodeItem(
  {promoCode}:{promoCode:PromoCode}
){
  const [isPromoCodeExpanded,setIsPromoCodeExpanded] = useState<boolean>(false);
  const [promoTotalSales,setPromoTotalSales] = useState<number>(0);
  const [promoDescInput,setPromoDescInput] = useState<string>(promoCode.description);
  const [promoTotalAllowedUsesInput,setPromoTotalAllowedUsesInput] = useState<number | null>(promoCode.totalAllowedUses || null);
  const [promoIsDisabledInput,setPromoIsDisabledInput] = useState<boolean>(promoCode.disabled || false);

  const updatePromoCodeData = async function(){
    const response = await fetch(`${getServerUrlPrefix()}/api/admin/promoCode/${promoCode._id}`,{
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('loginToken')}`
      },
      body: JSON.stringify({
        totalAllowedUses: promoTotalAllowedUsesInput,
        isDisabled: promoIsDisabledInput,
        description: promoDescInput
      })
    });
    const responseData = await response.json();
  };

  const fetchPromoSalesData = async function(){
    const response = await fetch(`${getServerUrlPrefix()}/api/admin/promoCode/${promoCode._id}/calc`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('loginToken')}`
      }
    });

    const responseData = await response.json();

    if (responseData.promoTotalSales){
      setPromoTotalSales(responseData.promoTotalSales);
    }else{
      setPromoTotalSales(0);
    };
  };

  const toggleDisablePromoCode = function(){
    promoIsDisabledInput===true ? setPromoIsDisabledInput(false) : setPromoIsDisabledInput(true);
  };

  // update promo code data on input change
  useEffect(()=>{
    updatePromoCodeData();
  },[promoDescInput,promoTotalAllowedUsesInput,promoIsDisabledInput]);

  //request sales data when the promo code is expanded
  useEffect(()=>{
    if (isPromoCodeExpanded) fetchPromoSalesData();
  },[isPromoCodeExpanded]);

  if (isPromoCodeExpanded){
    return(
      <li className='promo-code-item'>
        <h3 onClick={()=>{setIsPromoCodeExpanded(false)}}>{promoCode.code}</h3>
        <div className='promo-code-item-content'>
          <p>Code: <strong>{promoCode.code}</strong></p>
          <p>Perk: <strong>{promoCode.perk}</strong></p>
          <p>Description: <input type='text' value={promoDescInput} onChange={(e)=>{setPromoDescInput(e.target.value)}}/></p>
          <p>Times Used: <strong>{promoCode.totalTimesUsed}</strong></p>
          <p>Allowed Uses: <input type='number' value={promoTotalAllowedUsesInput || 'Unlimited'} onChange={(e)=>{setPromoTotalAllowedUsesInput(parseInt(e.target.value))}} /></p>
          {
            promoCode.dateOfExpiry ?
            <p>Expires On: <strong>{new Date(promoCode.dateOfExpiry).toLocaleDateString()}</strong></p>
            :
            null
            
          }
          <p>Is Disabled: <input type='checkbox' checked={promoIsDisabledInput} onChange={()=>{toggleDisablePromoCode()}} /></p>
          <p>Created By User: <strong>#{promoCode.createdByUserID}</strong></p>
          <p>Total Sales: <strong>${promoTotalSales}</strong></p>
        </div>
      </li>
    )
  }else{
    return(
      <li>
        <h3 onClick={()=>{setIsPromoCodeExpanded(true)}}>{promoCode.code}</h3>
      </li>
    )
  }
}