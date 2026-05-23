import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserInfo {

}

interface AuthState {
    user : UserInfo | null;
    isSignIn : boolean;
    setUser : (user: UserInfo) => void;
    signOut : ()=> void;
}

export const useAuthStore = create()//...