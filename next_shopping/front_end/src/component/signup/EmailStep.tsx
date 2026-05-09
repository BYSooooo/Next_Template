"use client";

import { confirmOTP, sendVerificationCode } from '@/lib/supabase/authAction';
import { useSignUpStore } from '@/zustand/useSignUpStore';
import { useToastStore } from '@/zustand/useToastStore';
import { Button, Input, Label, TextField } from '@heroui/react';
import React from 'react';

export default function EmailStep() {
    
    const { setEmail, setStep } = useSignUpStore();
    const { openToast } = useToastStore();

    // Email Address State
    const [inputEmail, setInputEmail] = React.useState("");
    const [emailDisable, setEmailDislable] = React.useState(false)
    const [emailValid, setEmailValid] = React.useState(true);
    const [isOTPSend, setIsOTPSend] = React.useState(false);

    const onPressVerifyCode = async()=> {
        const validYn = isEmailValid
        console.log(validYn)
        if(validYn) {
            const { data, error } = await sendVerificationCode(inputEmail)
                if(!error) {
                    setIsOTPSend(true)
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

    const onPressRetryVerify =()=> {
        setInputEmail("")
        setIsOTPSend(false)
        setEmailDislable(false)
    }

    const isEmailValid = React.useMemo(()=>{
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(inputEmail);
    },[inputEmail])


    // Verify Code State
    const [timer, setTimer] = React.useState(300);
    const [inputCode, setInputCode] = React.useState("")
    const [isCodeConfirm, setIsCodeConfirm] = React.useState(false);
    
    // Timer Control
    React.useEffect(()=> {
        let interval: number;
        if(isOTPSend && timer > 0) {
            interval = window.setInterval(()=> {
                setTimer((prev)=>  prev -1)
            }, 1000)
        }
        return ()=> {
            if(interval) window.clearInterval(interval)
        }
    },[isOTPSend, timer])

    const onPressVerifyButton = async() => {
        const { data, error } = await confirmOTP(inputEmail, inputCode);
        // const error = false
        if(error) {   
            openToast({
                title : error.name,
                variant : "danger",
                placement : "bottom",
                description : error.message
            })
        } else {    
            setIsCodeConfirm(true)        
        }
    }

    // Formatting Time String
    const formatTime = React.useCallback((seconds : number)=> {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`
    },[])

    // Check OTP Code expired
    const isExpired = isOTPSend && timer === 0;

    const onPressNext = ()=> {
        setEmail(inputEmail)
        setStep('INFO01')
    }
    

    return (
        <div className='flex flex-col gap-2'>
            { /* Email Part */}
            <TextField 
                type="email"
                isDisabled={emailDisable}
                onChange={(e)=> {
                    setInputEmail(e)
                    if(!emailValid) setEmailValid(true)
                }}
                isInvalid={!emailValid}>
                <Label isRequired>Email</Label>
                <div className='flex flex-row gap-2'>
                    <Input
                        fullWidth
                        value={inputEmail}
                        placeholder='Input Email...'
                        className={`border-2 border-solid transition-colors w-[75%]
                            ${emailValid ? "border-black" : "border-red-500"}
                            outline-none ring-0 ring-offset-0 focus:outlin-none`}  
                    />
                    { !isOTPSend 
                        ?   <Button
                                onPress={onPressVerifyCode}
                                className="w-[20%] bg-yellow-400 text-black rounded-xl">
                                Send Code
                            </Button>            
                        :   <Button
                                onPress={onPressRetryVerify}
                                className="w-[20%] bg-yellow-400 text-black rounded-xl">
                                Retry
                            </Button>
                    }
                </div>
            </TextField>

            { /* Verify Part */}
            <TextField
                isDisabled={!isOTPSend || isExpired }
                onChange={setInputCode}>
                    <div className='flex flex-row items-center gap-2'>
                        <Label isRequired>Code</Label>
                        {isOTPSend && (
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
                    <div className='flex flex-row gap-2'>
                        <Input
                            fullWidth
                            value={inputCode}
                            maxLength={6}
                            className="form-input w-[75%]"
                        />
                        <Button
                            className='w-[20%] bg-yellow-500 text-black rounded-2xl'
                            isDisabled={!isOTPSend || isExpired}
                            onPress={onPressVerifyButton}
                            fullWidth>
                            Verify
                        </Button>
                    </div>
            </TextField>
            <Button 
                className='w-full bg-yellow-500 text-black mt-2'
                isDisabled={!isOTPSend || !isCodeConfirm}
                onPress={onPressNext}>
                Next
            </Button>
        </div>
    )
}