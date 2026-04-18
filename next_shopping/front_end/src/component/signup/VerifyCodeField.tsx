"use client";

import React, { useEffect } from 'react';
import { Button, Input, Label, TextField, toast } from '@heroui/react';
import { useSignUpStore } from '@/zustand/useSignUpStore';
import { confirmOTP } from '@/lib/supabase/authAction';
import { useAlertStore } from '@/zustand/useAlertStore';
import { useToastStore } from '@/zustand/useToastStore';

export default function VeriftCodeField() {
    const { email, formatYn, OTPSendYn, 
            setEmail, setFormatYn, setOTPSendYn } = useSignUpStore();
    const { openToast } = useToastStore();
    
    const [ timer, setTimer] = React.useState(300);
    const [ inputCode, setInputCode] = React.useState("")
    
    // Timer Control
    React.useEffect(()=> {
        let interval: number;
        if(OTPSendYn && timer > 0) {
            interval = window.setInterval(()=> {
                setTimer((prev)=>  prev -1)
            }, 1000)
        }
        return ()=> {
            if(interval) window.clearInterval(interval)
        }
    },[OTPSendYn, timer])

    const onChangeVerifyCode = (value:string) => {
        setInputCode(value)
    }

    const onPressVerifyButton = async() => {
        const { data, error } = await confirmOTP(email, inputCode);
        // const error = false
        if(error) {   
            openToast({
                title : error.name,
                variant : "danger",
                placement : "bottom",
                description : error.message
            })
        } else {    
                //...        
        }
    }

    // Formatting Time String
    const formatTime = React.useCallback((seconds : number)=> {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`
    },[])
    // Check OTP Code expired
    const isExpired = OTPSendYn && timer === 0;

    return (
        <div className='flex flex-col gap-2'>
            <TextField
                isDisabled={!OTPSendYn || isExpired }
                onChange={(e)=> onChangeVerifyCode(e)}>
                    <div className='flex flex-row items-center gap-2'>
                        <Label isRequired>Code</Label>
                        {OTPSendYn && (
                            <div className='flex text-xs text-red-500'>
                                {isExpired 
                                    ? "Verification code expired" 
                                    : (
                                        <div className='flex flex-row gap-2 text-xs text-red-500'>
                                            [{formatTime(timer)}]
                                        </div>
                                    )
                                }
                            </div>
                        )
                        }
                    </div>
                    <Input
                        fullWidth
                        value={inputCode}
                        maxLength={6}
                        className="form-input"
                    />
            </TextField>
            <Button
                className='w-full bg-yellow-500 text-black'
                isDisabled={!OTPSendYn || isExpired}
                onPress={onPressVerifyButton}
                fullWidth>
                Verify
            </Button>
        </div>
    )
}