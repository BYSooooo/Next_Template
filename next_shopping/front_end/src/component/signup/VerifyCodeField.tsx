"use client";

import React from 'react';
import { Button, Input, Label, TextField } from '@heroui/react';
import { useSignUpStore } from '@/zustand/useSignUpStore';
import { confirmOTP } from '@/lib/supabase/authAction';
import { useAlertStore } from '@/zustand/useAlertStore';

export default function VeriftCodeField() {
    const { email, formatYn, OTPSendYn, 
            setEmail, setFormatYn, setOTPSendYn } = useSignUpStore();
    const { openAlert, closeAlert } = useAlertStore()
    
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
        // const { data, error } = await confirmOTP(email, inputCode);
        const error = false
        if(!error) {   
            openAlert("danger","Test","Description");
        } else {
                        
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
        <>
            <TextField
                className="gap-1"
                onChange={(e)=> onChangeVerifyCode(e)}>
                    <div className='flex flex-row items-center gap-2'>
                        <Label>Code</Label>
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
                        disabled={!OTPSendYn || isExpired }
                        value={inputCode}
                        maxLength={6}
                        className={`border-2 border-solid border-black
                            outline-none ring-0 ring-offset-0 focus:outlin-none`}
                    />
                    <Button
                        isDisabled={!OTPSendYn || isExpired}
                        onPress={onPressVerifyButton}
                        fullWidth>
                        Verify
                    </Button>
            </TextField>
        </>
    )
}