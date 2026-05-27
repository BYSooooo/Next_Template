import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserInfo {
    email : string,
    nickname : string,
    phone : '',
    countryCode : '',
    postCode : '',
    address1 : '', 
    address2 : ''
}

interface AuthState {
    user : UserInfo | null;
    isSignIn : boolean;
    setUser : (user: UserInfo) => void;
    signOut : ()=> void;
}

export const useAuthStore = create<AuthState>()(
    persist((set)=> ({
        user: null,
        isSignIn : false,
        setUser : (user)=> set({ user, isSignIn : true}),
        signOut : ()=> set({ user : null, isSignIn : false})
    }),{
        name : 'auth-sessing-storage',
        storage : createJSONStorage(()=> sessionStorage)
    })
    
)