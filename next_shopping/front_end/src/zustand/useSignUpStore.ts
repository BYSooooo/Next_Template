import { create } from "zustand";


interface SignUpState {
    step : 'VERIFY' | 'INFO';
    // Required Field for Verify
    email : string;
    formatYn : boolean;
    OTPSendYn : boolean;
    OTPCode : string;
    // Required Field for Info
    password : string;
    address1 : string;  // Main Address
    address2 : string;  // Detail Address
    phone : string;
    nickname : string

    setEmail : (email : string) => void
    setFormatYn : (validYn : boolean)=> void;
    setOTPSendYn : (sendYn : boolean)=> void;
    setOTPCode : (otpCode : string) => void;
    
    setStep : (step : 'VERIFY' | 'INFO') => void;
    setInfo : (info : Partial<SignUpState>) => void;
}

export const useSignUpStore = create<SignUpState>((set)=> ({
    step : 'VERIFY',
    email : "",
    formatYn : false,
    OTPSendYn : false,
    OTPCode : "",

    password : '',
    address1 : '',
    address2 : '',
    phone : '',
    nickname : '',

    setEmail : (email) => set({ email : email}),
    setFormatYn : (validYn) => set({ formatYn : validYn }),
    setOTPSendYn : (sendYn) => set({ OTPSendYn : sendYn}),
    setOTPCode : (otpCode) => set({ OTPCode : otpCode}),

    setStep : (step) => set({ step }),
    setInfo : (info) => set((state)=> ({ ...state, info}))

}))