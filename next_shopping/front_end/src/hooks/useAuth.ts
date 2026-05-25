import { useState } from 'react';
import { useAuthStore } from "@/zustand/useAuthStore"

export const useAuth = ()=> {
    const setUser = useAuthStore((state)=> state.setUser);
    const signOutStore = useAuthStore((state)=> state.signOut);
    const [ isLoading, setIsLoading] = useState(false);

    const signInwithEmail = async(email: string, password: string) => {
        setIsLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signInWithEmail`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({ email, password}),
                credentials : 'include'
            });

            const result = await res.json();

            if(res.ok) {
                setUser(result.user)
                return { result : true, user : result.user }
            } else {
                return { result : false, message : result.message || 'fail to sign in'}
            }
        } catch (error) {
            console.error(error)
            return { result : false, message : error}
        } finally {
            setIsLoading(false)
        }
    }

    // clear Zustand Store when Sign Out
    const signout = ()=> {
        signOutStore()
    }

    return { signInwithEmail, signout };
}