import  Router  from 'next/router';
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth';

const publicRoute = (Component = null, options = {}) => {
    const PublicRoute = (props)=>{
        const { user } = useAuth();
        let [loading, setLoading] = useState(true);
    
        useEffect(()=>{
          if(!user){
            setLoading(false);
          }else{
            Router.push(options.pathAfterFailure || "/songs");
          }
    
        },[user]);
    
        if(loading) return <div></div>;
        return <Component {...props} />
      }
    
      return PublicRoute;
}

export default publicRoute