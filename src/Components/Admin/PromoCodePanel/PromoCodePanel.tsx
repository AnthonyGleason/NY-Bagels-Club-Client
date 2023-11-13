import React, { useEffect, useState } from 'react';
import { PromoCode } from '../../../Interfaces/interfaces';
import { getServerUrlPrefix } from '../../../Config/clientSettings';
import PromoCodeItem from '../PromoCodeItem/PromoCodeItem';
import couponImg from '../../../Assets/icons/coupon.svg';
import Aos from 'aos';
import "aos/dist/aos.css";

export default function PromoCodePanel(){
  const [isPromoCodePanelExpanded,setIsPromoCodePanelExpanded] = useState<boolean>(false);
  const [promoCodeData,setPromoCodeData] = useState<PromoCode[]>([]);
  const fetchPromoCodeData = async function(){
    const response = await fetch(`${getServerUrlPrefix()}/api/admin/promoCode`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('loginToken')}`
      }
    });
    const responseData = await response.json();
    if (responseData.promoCodeData){
      setPromoCodeData(responseData.promoCodeData);
    }else{
      setPromoCodeData([]);
    }
  };

  useEffect(()=>{
    //setup fade animation length
    Aos.init({duration: 2500});
  },[])

  useEffect(()=>{
    if (isPromoCodePanelExpanded) fetchPromoCodeData()
  },[isPromoCodePanelExpanded]);

  if (isPromoCodePanelExpanded){
    return(
      <section className='promo-code-panel'>
        <h3 onClick={()=>{setIsPromoCodePanelExpanded(false)}}>
          <img src={couponImg} alt='promo' />
          <span>View Promo Code Data</span>
        </h3>
        <ul className='promo-code-panel-content'>
          {
            promoCodeData.map((promoCode:PromoCode,index:number)=>{
              return(
                <PromoCodeItem promoCode={promoCode} key={index} />
              )
            })
          }
        </ul>
      </section>
    );
  }else{
    return(
      <section data-aos='fade-in' className='promo-code-panel'>
        <h3 onClick={()=>{setIsPromoCodePanelExpanded(true)}}>
          <img src={couponImg} alt='promo' />
          <span>View Promo Code Data</span>
        </h3>
      </section>
    );
  }
}