import { useAuth } from '@/hooks/useAuth';
import { Container, Loading } from '@nextui-org/react';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const Index = () => {
    const { login } = useAuth();
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const auth = getAuth();

    useEffect(()=>{
        if(auth.currentUser?.emailVerified==false){
            router.push("/email-verification-send");
        }
        const timerId = setTimeout(()=>{
            if(auth.currentUser){
                login(auth.currentUser);
                setLoading(false);
            }
        },[2000]);
        
        return ()=>clearTimeout(timerId);
    },[])

    if(loading){
        return <Container display='flex' justify='center' alignItems='center' css={{w:"100%", h:"100vh"}}>
            <Loading color="secondary"/>
        </Container>
    }else{
        router.push("/songs")
    }
}

export default Index