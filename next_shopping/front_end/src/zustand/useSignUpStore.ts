import { create } from "zustand";


interface SignUpState {
    email : string;
    formatYn : boolean;
    OTPSendYn : boolean;
    OTPCode : string;

    setEmail : (email : string) => void
    setFormatYn : (validYn : boolean)=> void;
    setOTPSendYn : (sendYn : boolean)=> void;
    setOTPCode : (otpCode : string) => void;
    
}

export const useSignUpStore = create<SignUpState>((set)=> ({
    email : "",
    formatYn : false,
    OTPSendYn : false,
    OTPCode : "",

    setEmail : (email) => set({ email : email}),
    setFormatYn : (validYn) => set({ formatYn : validYn }),
    setOTPSendYn : (sendYn) => set({ OTPSendYn : sendYn}),
    setOTPCode : (otpCode) => set({ OTPCode : otpCode})

}))