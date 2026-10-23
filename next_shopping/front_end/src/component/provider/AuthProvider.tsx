"use client";

import React from 'react';

import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/zustand/useAuthStore';
import { useToastStore } from '@/zustand/useToastStore';
import { Spinner } from '@heroui/react';

// Public Path - open to anybody
const PUBLIC_ROUTE = [
    "/",
    "/event/*",
    "/search",
    "/product/*",
    "/member/signup",
    "/login",
    "/member/info"
]

const checkisPublicRoute = (pathname : string, routes : string[]) => {
    return routes.some((route)=> {
        try {
            const pattern = new URLPattern({ pathname : route});
            return pattern.test({ pathname })
        } catch(e) {
            return pathname === route;
        }
    })
}

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
    },[])

    React.useEffect(()=> {
        if(!isInitialized) return;

        const isPublic = checkisPublicRoute(pathname, PUBLIC_ROUTE);
        const isProctedRoute = !isPublic;

        if(isProctedRoute && !isSignIn) {
            openToast({
                title : "Redirect to Main Page",
                description : "You need to sign in to access this page.",
                variant : 'warning'
            })
            router.push("/")
        }
    },[pathname, isSignIn, isInitialized, router, openToast])

    if(!isInitialized) {
        return (
            <div className='flex h-screen w-screen items-center justify-center bg-background'>
                <div className='flex flex-col items-center gap-2'>
                    <Spinner size='xl' color='warning'/>
                    <p className='text-sm font-medium text-muted-foreground animate-pulse'>
                        Loading Auth Session...
                    </p>
                </div>
            </div>
        )
    }

    return <>{children}</>
}