"use client"

import React from 'react';
import { firebaseAuth } from "../../firebase-config";
import { useRouter } from 'next/navigation';
import Spinner from '../component/Spinner';

export default function Page() {
    const router = useRouter()
    const currentUser = firebaseAuth.currentUser

    React.useEffect(()=> {
      currentUser
        ? router.push("/main")
        : router.push("/login")
    },[])

    return (
        <div className="main-div">
          <Spinner size={16}/>
        </div>
    )
  }