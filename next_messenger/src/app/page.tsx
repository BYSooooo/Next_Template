"use client"

import React from 'react';
import { firebaseAuth, firebaseStore } from "../../firebase-config";
import { useRouter } from 'next/navigation';
import Spinner from '../component/Spinner';
import { useAppDispatch } from '../redux/hooks';
import { doc, onSnapshot } from 'firebase/firestore';
import { getCurrentUser } from '../controller/FirebaseController';
import { controlMessageToast, setUserInfo } from '../redux/features';

export default function Page() {
    const router = useRouter()
    const currentUser = firebaseAuth.currentUser
    const dispatch = useAppDispatch();
    

    React.useEffect(()=> {
      if(currentUser) {
        getCurUserInfo()
        router.push("/main")
      } else {
        router.push("/login")
      }
    },[])

    const getCurUserInfo = ()=> {
      console.log("getCurUserInfo Called in root page useEffect")
      const uuid = firebaseAuth.currentUser.uid;
              // set Snapshot for Listen when Update
              const docRef = doc(firebaseStore,'userInfo',uuid);
              onSnapshot(docRef,()=> {
                  console.log("Refresh UserInfo")
                  getCurrentUser().then((response)=> {
                      const { result, value } = response;
                      result 
                          ? dispatch(setUserInfo(value))
                          : dispatch(controlMessageToast({ 
                              openYn : true, 
                              title : "Error Occured", 
                              type: 'error', 
                              content : 'Error during update'}))
                  })
              })
              const docRef2 = doc(firebaseStore,'avatarImg', uuid)
              onSnapshot(docRef2, ()=> {
                  console.log("Refresh avatarImg")
                  getCurrentUser().then((response)=> {
                      const { result, value } = response;
                      result 
                          ? dispatch(setUserInfo(value))
                          : dispatch(controlMessageToast({ 
                              openYn : true, 
                              title : "Error Occured", 
                              type: 'error', 
                              content : 'Error during update'}))
                  })
              })
    }
    

    return (
        <div className="main-div">
          <Spinner size={16}/>
        </div>
    )
  }