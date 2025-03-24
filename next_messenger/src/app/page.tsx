"use client"

import React from 'react';
import { firebaseAuth } from "../../firebase-config";
import { useRouter } from 'next/navigation';
import Spinner from '../component/Spinner';

export default function Page() {
    const router = useRouter()
    const currentUser = firebaseAuth.currentUser

    React.useEffect(()=> {
      if(currentUser) {
        attachSnapshot()
        router.push("/main")
      } else {
        debugger;
        router.push("/login")
      } 
    },[])

    const attachSnapshot = ()=> {
      const uuid = currentUser.uid;
      debugger;
      console.log(uuid)
    };

    return (
        <div className="main-div">
          <Spinner size={16}/>
        </div>
    )
  }