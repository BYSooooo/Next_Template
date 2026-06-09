"use client";

import React from 'react';

import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/zustand/useAuthStore';
import { useToastStore } from '@/zustand/useToastStore';

// Public Path - open to anybody
const PUBLIC_ROUTE = [
    "/",
    "/member/signup",
    "/login"
]

export default function AuthProvider({ children } : {children : React.ReactNode}) {
    const pathname = usePathname();
    const router = useRouter();
    const { isSignIn, user } = useAuthStore();
    const { openToast } = useToastStore();
    const [ isInitialized, setIsInitialized ] = React.useState(false)

    React.useEffect(()=> {

        // Check Zustand persist middleware 
        if(useAuthStore.persist.hasHydrated()) {
            setIsInitialized(true)
        } else {
            const unSub = useAuthStore.persist.onFinishHydration(()=> {
                setIsInitialized(true);
            })
            return ()=> unSub()
        }

        const verifySessionWithServer = async()=> {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
                    method : 'GET',
                    credentials : 'include'
                });

                if(!res.ok) {
                    useAuthStore.getState().signOut()
                }  else {
                    console.log(res.statusText)
                }
            } catch(error) {
                //...
            } finally {
                setIsInitialized(true)
            }
        }
        verifySessionWithServer()
    },[])

    // Turn on Flag of initialized.
    // Role of waiting for Client Side Rendering
    React.useEffect(()=> {
        setIsInitialized(true)
    },[])

    React.useEffect(()=> {
        if(!isInitialized) return;

        // Check Public route or not
        const isProtectedRoute = !PUBLIC_ROUTE.includes(pathname);
        if(isProtectedRoute && !isSignIn) {
            openToast({
                title : "Redirect to Main Page",
                description : "You need to log in to access this page.",
                variant : 'warning'
            })
            router.push("/")
        }
    },[pathname, isSignIn, isInitialized, router])

    if(!isInitialized) {

    }



    return <>{children}</>
}