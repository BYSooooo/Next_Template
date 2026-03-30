"use client";

import React from 'react';

import { Button, Input, Label, TextField } from '@heroui/react';
import { useSignUpStore } from '@/zustand/useSignUpStore';

export default function EmailField() {
    const { email, formatYn, sendOTPCodeYn, 
            setEmail, setFormatYn, setOTPSendYn } = useSignUpStore();
    
    const [inputEmail, setInputEmail] = React.useState("");

    const onPressVerifyCode = ()=> {

    }
    

    return (
        <>
            <TextField 
                isReadOnly
                type="email"
                isDisabled={sendOTPCodeYn}
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