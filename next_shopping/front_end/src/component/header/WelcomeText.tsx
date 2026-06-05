"use client";

import { useAuthStore } from "@/zustand/useAuthStore";


export default function WelcomeText() {
    const { isSignIn, user } = useAuthStore();
    
    return isSignIn 
        ? <span className="">
            Hello {user.nickname}!
        </span> 
        : <p>
            Hello Guest!
        </p>
}