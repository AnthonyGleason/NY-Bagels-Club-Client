import React, { useEffect, useState } from 'react';
import { updateAdminStatus } from '../../Helpers/auth';

export default function Admin(){
  const [isAdmin,setIsAdmin] = useState<boolean>(false);

  useEffect(()=>{
    updateAdminStatus(setIsAdmin);
  },[]);

  return(
    <div>
      admin
    </div>
  );
};