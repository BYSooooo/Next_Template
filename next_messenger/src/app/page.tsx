"use client"

import React from 'react';
import { firebaseAuth } from "../../firebase-config";
import { useRouter } from 'next/navigation';
import Spinner from '../component/Spinner';
import { useAppDispatch } from '../redux/hooks';

export default function Page() {
    const router = useRouter()
    const currentUser = firebaseAuth.currentUser

    React.useEffect(()=> {
      if(currentUser) {
        router.push("/main")
      } else {
        router.push("/login")
      }
    },[])

    

    return (
        <div className="main-div">
          <Spinner size={16}/>
        </div>
    )
  }