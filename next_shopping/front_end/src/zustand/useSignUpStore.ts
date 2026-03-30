import { create } from "zustand";


interface SignUpState {
    email : string;
    formatYn : boolean;
    sendOTPCodeYn : boolean;

    setEmail : (email : string) => void
    setFormatYn : (validYn : boolean)=> void;
    setOTPSendYn : (sendYn : boolean)=> void;
    
}

export const useSignUpStore = create<SignUpState>((set)=> ({
    email : "",
    formatYn : false,
    sendOTPCodeYn : false,

    setEmail : (email) => set({ email : email}),
    setFormatYn : (validYn) => set({ formatYn : validYn }),
    setOTPSendYn : (sendYn) => set({ sendOTPCodeYn : sendYn})

}))