"use client";

import React from 'react';

import { Button, Input, Label, TextField } from '@heroui/react';
import { useSignUpStore } from '@/zustand/useSignUpStore';
import { sendVerificationCode } from '@/lib/supabase/authAction';

export default function EmailField() {
    const { email, formatYn, sendOTPCodeYn, 
            setEmail, setFormatYn, setOTPSendYn } = useSignUpStore();
    
    const [inputEmail, setInputEmail] = React.useState("");
    const [emailDisable, setEmailDislable] = React.useState(false)

    const onPressVerifyCode = async()=> {
        const validYn = isEmailValid
        if(validYn) {
            const { data, error } = await sendVerificationCode(email)
                if(!error) {
                    setEmail(inputEmail)
                    setOTPSendYn(true)
                    setEmailDislable(true) 
                } else {
                    console.log(error.message)
                }
        } else {

        }
    }

    const isEmailValid = React.useMemo(()=>{
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    },[inputEmail])
    

    return (
        <>
            <TextField 
                isReadOnly
                type="email"
                isDisabled={emailDisable}
                onChange={setInputEmail}>
                <Label>Email</Label>
                <Input
                    fullWidth
                    value={inputEmail}
                    placeholder='Input Email...'
                    className="border-2 border-solid border-black focus:outline-0 focus:ring-0"
                />
            </TextField>
            <Button
                onPress={onPressVerifyCode}
                className="w-full">
                {!sendOTPCodeYn ? "Send Verify Code" : "Re-Send Verify Code"}
            </Button>            
        </>

    )
}