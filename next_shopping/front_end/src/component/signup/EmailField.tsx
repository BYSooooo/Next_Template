"use client";

import React from 'react';

import { Button, Input, Label, TextField } from '@heroui/react';
import { useSignUpStore } from '@/zustand/useSignUpStore';
import { sendVerificationCode } from '@/lib/supabase/authAction';
import { useToastStore } from '@/zustand/useToastStore';

export default function EmailField() {
    const { email, formatYn, OTPSendYn, OTPCode,
            setEmail, setFormatYn, setOTPSendYn, setOTPCode, setStep } = useSignUpStore();
    const { openToast } = useToastStore()
            
    const [inputEmail, setInputEmail] = React.useState("");
    const [emailDisable, setEmailDislable] = React.useState(false)
    const [emailValid, setEmailValid] = React.useState(true)

    const onPressVerifyCode = async()=> {
        const validYn = isEmailValid
        console.log(validYn)
        if(validYn) {
            const { data, error } = await sendVerificationCode(inputEmail)
                if(!error) {
                    setEmail(inputEmail)
                    setOTPSendYn(true)
                    setEmailDislable(true) 
                } else {
                    setEmailValid(false)
                    openToast({
                        title : error.name,
                        description : error.message,
                        placement : "bottom",
                        variant : "danger"
                    })
                    
                }
        } else {
            setEmailValid(false)
            openToast({
                title : "Email Invalid",
                description : "Check Email Address",
                placement : "bottom",
                variant : "danger"
            })
        }
    }

    const onPressTest = ()=>{
        setEmail(inputEmail)
        setStep('INFO')
    }

    const onPressRetryVerify =()=> {
        setEmail("");
        setInputEmail("")
        setOTPSendYn(false)
        setEmailDislable(false)
    }

    const isEmailValid = React.useMemo(()=>{
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(inputEmail);
    },[inputEmail])

    
    return (
        <>
            <TextField 
                type="email"
                isDisabled={emailDisable}
                onChange={(e)=> {
                    setInputEmail(e)
                    if(!emailValid) setEmailValid(true)
                }}
                isInvalid={!emailValid}
                className="flex flex-col gap-2">
                <Label>Email</Label>
                <Input
                    fullWidth
                    value={inputEmail}
                    placeholder='Input Email...'
                    className={`border-2 border-solid transition-colors
                        ${emailValid ? "border-black" : "border-red-500"}
                        outline-none ring-0 ring-offset-0 focus:outlin-none`}
                    
                />
            </TextField>
            { !OTPSendYn 
                ?   <Button
                        onPress={onPressTest}
                        className="w-full bg-yellow-400 text-black">
                        Send Verify Code
                    </Button>            
                :   <Button
                        onPress={onPressRetryVerify}
                        className="w-full bg-yellow-400 text-black">
                        Retry Verify Email
                    </Button>
            }
        </>

    )
}