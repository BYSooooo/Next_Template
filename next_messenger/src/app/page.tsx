"use client"

import React from 'react';
import { firebaseAuth, firebaseStore } from "../../firebase-config";
import { useRouter } from 'next/navigation';
import Spinner from '../component/Spinner';
import { doc, onSnapshot } from 'firebase/firestore';
import { getCurrentUser } from '../controller/FirebaseController';

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