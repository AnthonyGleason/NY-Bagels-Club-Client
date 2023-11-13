import React, { useEffect, useState } from 'react';
import { User } from '../../../Interfaces/interfaces';
import UserSearchResult from '../SearchResults/UserSearchResult';
import { getServerUrlPrefix } from '../../../Config/clientSettings';
import magnifyGlassImg from '../../../Assets/icons/magnifying-glass.svg'
import Aos from 'aos';
import "aos/dist/aos.css";

export default function UserSearchPanel(){
  const [userSearchResults,setUserSearchResults] = useState<User[]>([]);
  const [userSearchInput, setUserSearchInput] = useState<string>('');
  const [isUserSearchExpanded,setIsUserSearchExpanded] = useState<boolean>(false);

  const handleGetUserSearchResults = async function(){
    const response = await fetch(`${getServerUrlPrefix()}/api/admin/users/search/${userSearchInput}`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('loginToken')}`
      },
    });
    const responseData = await response.json();
    if (responseData.results){
      setUserSearchResults(responseData.results);
    }else{
      setUserSearchResults([]);
    }
  };
  useEffect(()=>{
    Aos.init({duration: 2500});
  },[])

  //get user search results
  useEffect(()=>{
    if (userSearchInput){
      handleGetUserSearchResults();
    }else{
      setUserSearchResults([]);
    }
  },[userSearchInput]);

  if (isUserSearchExpanded){
    return(
      <section>
        <h3 onClick={()=>{setIsUserSearchExpanded(false)}}>
          <img src={magnifyGlassImg} alt='search' />
          <span>User Search</span>
        </h3>
        <div className='user-search-content-wrapper'>
          <input className='user-search-input' value={userSearchInput} onChange={(e)=>{setUserSearchInput(e.target.value)}} placeholder='Search By User ID To Find Users' />
          <ul>
            {
              userSearchResults.length === 0 && userSearchInput
              ?
                <p>No matches were found for "{userSearchInput}".</p>
              :
              null
                
            }
            {
              userSearchInput.length === 0
              ?
                <p>Enter a user ID to begin searching for a user.</p>
              :
                null
            }
            {
              userSearchResults.length>0
              ?
              <>
                <p>{userSearchResults.length} users were found matching "{userSearchInput}".</p>
                {
                  userSearchResults.map((user:User,index:number)=>{
                    return(
                      <UserSearchResult key={index} user={user} />
                    )
                  })
                }
              </>
              :
                null
            }
          </ul>
        </div>
      </section>
    );
  }else{
    return(
      <section data-aos='fade-in'>
        <h3 onClick={()=>{setIsUserSearchExpanded(true)}}>
          <img src={magnifyGlassImg} alt='search' />
          <span>User Search</span>
        </h3>
      </section>
    )
  }
};