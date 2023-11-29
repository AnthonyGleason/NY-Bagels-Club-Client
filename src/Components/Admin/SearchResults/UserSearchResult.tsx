import React, { useEffect, useState } from 'react';
import { Membership, User } from '../../../Interfaces/interfaces';
import { toggleExpandMenu } from '../../../Helpers/sidebar';
import { getServerUrlPrefix } from '../../../Config/clientSettings';

export default function UserSearchResult({user}:{user:User}){
  const [isUserExpanded,setIsUserExpanded] = useState<boolean>(false);
  const [membershipInfo,setMembershipInfo] = useState<Membership | null>(null);

  const toggleMenu = function(currentState:boolean,stateSetter:Function){
    if (currentState){
      stateSetter(false);
    }else{
      stateSetter(true);
    };
  };

  const handleRequestMembershipInfo = async function(){
    const response = await fetch(`${getServerUrlPrefix()}/api/admin/users/memberships/${user._id}`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('loginToken')}`
      }
    })
    const responseData = await response.json();
    if (responseData.membershipDoc){
      setMembershipInfo(responseData.membershipDoc);
    }else{
      setMembershipInfo(null);
    };
  };

  //fetch membership doc info for user when menu is expanded
  useEffect(()=>{
    handleRequestMembershipInfo()
  },[isUserExpanded])

  return(
    <li>
      <h3 onClick={()=>{toggleMenu(isUserExpanded,setIsUserExpanded)}}><strong>#{user._id}</strong></h3>
      <div className='user-content-wrapper'>
        {
          isUserExpanded && membershipInfo
          ?
          <>
            <p>First Name: <strong>{user.firstName}</strong></p>
            <p>Last Name: <strong>{user.lastName}</strong></p>
            <p>Email: <strong>{user.email}</strong></p>
            <p>Access-Control Group: <strong>{user.group || 'N/A'}</strong></p>
            <p>Date Created: <strong>{new Date(user.dateCreated).toLocaleDateString()}</strong></p>
            <p>Is Banned: <strong>{user.frozen.toString()}</strong></p>
            <p>Membership ID: <strong>#{membershipInfo._id}</strong></p>
            <p>Membership Tier: <strong>{membershipInfo.tier}</strong></p>
            <p>Membership Renewal Date: <strong>
              {
               membershipInfo.renewalDate ? new Date(membershipInfo.renewalDate).toLocaleDateString() : 'N/A'
              }</strong>
            </p>
          </>
        :
          null
        }
      </div>
    </li>
  );
};