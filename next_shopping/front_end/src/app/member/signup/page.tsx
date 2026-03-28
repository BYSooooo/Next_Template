"use client";

import React, { useEffect } from 'react';
import { Button, Card, Description, FieldError, Form, Input, Label, Popover, Separator, TextField } from "@heroui/react";
import { confirmOTP, sendVerificationCode } from '@/lib/supabase/authAction';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [email, setEmail] = React.useState("");
    const [submitYn, setSubmitYn] = React.useState(false);
    
    const [sendYn, setSendYn] = React.useState(false);
    const [verifyCode, setVerifyCode] = React.useState("");
    const [timer, setTimer] = React.useState(300) // 5 Minute
    const [loading, setLoading] = React.useState(false)

    const [otpError, setOtpError] = React.useState(""); 

    const router = useRouter();


    // Test for Email Format Validation
    const isEmailValid = React.useMemo(()=> {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    },[email])

    // Error Message for Email Input
    const emailErrorMessage = React.useMemo(()=> {
        if(!submitYn) return "";
        if(email.length === 0) return "Please Input Email";
        if(!isEmailValid) return "Invalid Email Address";
        return ""
    },[submitYn, email, isEmailValid])

    const formatTime = React.useCallback((seconds : number)=> {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`
    },[])
    
    // Timer 
    useEffect(()=> {
        let interval: number;
        if(sendYn && timer > 0) {
            interval = window.setInterval(()=> {
                setTimer((prev)=>  prev -1)
            }, 1000)
        }
        return () => window.clearInterval(interval)
    },[sendYn, timer])


    // Send Verify Code 
    const onPressVerifyCode = async()=> {
        setSubmitYn(true)
        if(!isEmailValid) {
            return;
        } else {
            setLoading(true);
            try {
                // await sendVerificationCode(email)
                setSendYn(true);
                setTimer(300);
                setVerifyCode("");
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false);
            }
        }
    }
    
    // Confirm For Email send Verified Code
    const onPressConfimVerifyCode = async()=> {
        if(verifyCode.length < 6) return;

        setLoading(true);
        setOtpError("") // 
        try {
            //const { data, error } = await confirmOTP(email, verifyCode);
            const error = false
            if(!error) {
                router.push('/member/userinfo')
            } else {
                setOtpError("Not Matched Verify Code")
            }
            
        } catch(error) {
            setOtpError("Network Error")
        } finally{
            setLoading(false)
        }
    }

    return (
        <div className="inner-container flex items-center h-screen justify-center flex-row">
            <div className="grid grid-cols-12 gap-10 items-center">
                {/* Left Part : Message */}
                <div className="flex flex-col col-span-6">
                    <p className="text-6xl font-light">Wellcome to </p>
                    <div className="flex flex-row gap-2">
                        <span className='text-6xl font-extrabold text-yellow-400'>Next</span>
                        <span className='text-6xl font-extrabold'>Shopping!</span>
                    </div>
                </div>
                {/* Right Part : Sign up Form */}
                <div className="col-span-6">
                    <Card>
                        <Card.Header className="text-lg font-bold">
                            Verify Email Address
                        </Card.Header>
                        <Card.Content>
                            <TextField 
                                isRequired 
                                type='email'
                                isDisabled={sendYn}
                                onChange={(e)=>{
                                    setEmail(e)
                                    if(!submitYn) setSubmitYn(false)    // Init Input Validation
                                }}
                                isInvalid={!(submitYn && isEmailValid)}>
                                <Label>Email</Label>
                                <Input
                                    fullWidth
                                    value={email}
                                    placeholder='Input Email...'
                                    className="border-2 border-solid border-black focus:outline-0 focus:ring-0"
                                />
                                { isEmailValid 
                                    ? <FieldError>{emailErrorMessage}</FieldError>
                                    : <Description>{emailErrorMessage}</Description>
                                }
                                
                            </TextField>
                            <Button 
                                onPress={onPressVerifyCode}
                                className="w-full">
                                {!sendYn ? "Send Verify Code" : "Re-Send Verify Code" }
                            </Button>
                            <TextField 
                                type='password'
                                className='gap-1'
                                onChange={(e)=> setVerifyCode(e)}>
                                <div className='flex flex-row'>
                                    <Label>Code</Label>
                                    { sendYn && 
                                        <div className='flex flex-row gap-2 text-sm text-red-500'>
                                            [{formatTime(timer)}]
                                        </div>
                                    }
                                </div>
                                <Input
                                    fullWidth
                                    disabled={!sendYn}
                                    value={verifyCode}
                                    placeholder='Input Verify Code...'
                                    maxLength={6}
                                    className="border-2 border-solid border-black focus:outline-0 focus:ring-0"
                                />
                                <Button 
                                    fullWidth
                                    isDisabled={!sendYn}
                                    variant={!sendYn ? 'ghost' : 'secondary' }
                                    onPress={onPressConfimVerifyCode}>
                                    Verify
                                </Button>
                            </TextField>
                        </Card.Content>
                    </Card>

                </div>

            </div>

        </div>
    )
}