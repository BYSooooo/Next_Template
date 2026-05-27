import { create } from "zustand";


const initialState = {
    step : <'VERIFY'|'INFO01'|'INFO02'> 'VERIFY',
    
    email : "",
    
    password : '',
    nickname : '',
    
    phone : '',
    countryCode : '',
    postCode : '',
    address1 : '',  // name
    address2 : ''
}

type SignUpState = typeof initialState & {
    setEmail : (email : string) => void
    
    setInfo : (info : Partial<SignUpState>) => void;
    
    setStep : (step : 'VERIFY' | 'INFO01' | 'INFO02' ) => void;
    initStore : ()=> void;
}


export const useSignUpStore = create<SignUpState>((set)=> ({
    ...initialState,

    setEmail : (email) => set({ email : email}),

    setInfo : (info) => set((state)=> ({ ...state, ...info})),
    
    setStep : (step) => set({ step }),

    initStore: ()=> set(initialState) 

}))