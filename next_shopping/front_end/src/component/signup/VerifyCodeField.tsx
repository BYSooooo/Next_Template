"use client";

import React from 'react';
import { Button, Input, Label, TextField } from '@heroui/react';
import { useSignUpStore } from '@/zustand/useSignUpStore';

export default function VeriftCodeField() {
    const { email, formatYn, sendOTPCodeYn, 
            setEmail, setFormatYn, setOTPSendYn } = useSignUpStore();
    
    const [timer, setTimer] = React.useState(300);


    // Timer Control
    React.useEffect(()=> {
        let interval: number;
        if(sendOTPCodeYn && timer > 0) {
            interval = window.setInterval(()=> {
                setTimer((prev)=>  prev -1)
            }, 1000)
        }
    },[sendOTPCodeYn, timer])

    // Formatting Time String
    const formatTime = React.useCallback((seconds : number)=> {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`
    },[])

    return (
        <>
            <TextField
                type="password"
                className="gap-1">
                    <div className='flex flex-row'>
                        <Label>Code</Label>
                        {sendOTPCodeYn &&
                            <div className='flex flex-row gap-2 text-xs text-red-500'>
                                [{formatTime(timer)}]
                            </div>
                        }
                    </div>
                    <Input
                        fullWidth

                    />
                    <Button
                        fullWidth>
                        Verify
                    </Button>
            </TextField>
        </>
    )
}