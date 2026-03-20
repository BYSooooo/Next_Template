"use client";

import React, { useEffect } from 'react';
import { Button, Card, Form, Input, Label, Popover, Separator, TextField } from "@heroui/react";
import { confirmOTP, sendVerificationCode } from '@/lib/supabase/authAction';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function Page() {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [condition, setCondition] = React.useState({
        length : false,
        hasUpperCase : false,
        hasLowerCase : false,
        hasNumber : false,
        hasSpecial : false
    })
    const [popOpen, setPopOpen] = React.useState(false);

    const [sendYn, setSendYn] = React.useState(false);
    const [verifyCode, setVerifyCode] = React.useState("");
    const [timer, setTimer] = React.useState(300) // 5 Minute
    const [loading, setLoading] = React.useState(false)

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

    
    const formatTime = React.useCallback((seconds : number)=> {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`
    },[])

    const onChangePassword = (value: string)=> {
        setCondition({
            length : value.length >= 12 ? true : false,
            hasUpperCase : /[A-Z]/.test(value) ? true : false,
            hasLowerCase : /[a-z]/.test(value) ? true : false,
            hasNumber : /[0-9]/.test(value) ? true : false,
            hasSpecial : /[!@#$%^&*]/.test(value) ? true : false      
        })
        setPassword(value)
    };

    const onPressVerifyCode = async()=> {
        setLoading(true);
        try {
            await sendVerificationCode(email)
            
            setSendYn(true);
            setTimer(300);
            setVerifyCode("");
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
  
    const onPressConfimVerifyCode = async()=> {
        setLoading(true);
        try {
            const { data, error } = await confirmOTP(email, verifyCode);
            if(!error) {

            } else {
                throw new Error(error.message);
            }
            // data.user.em
        } catch(error) {
            console.log(error)
        } finally{
            setLoading(false)
        }
    }

    return (
        <div className="inner-container flex items-center h-screen justify-center flex-row">
            <div className="grid grid-cols-12 gap-10 items-center">
                <div className="flex flex-col col-span-6">
                    <p className="text-5xl">
                        Wellcome to 
                    </p>
                    <div className="flex flex-row">
                        <p className="text-5xl font-extrabold text-yellow-400">
                            Next
                        </p>
                        <p className="text-5xl font-extrabold">
                            Shopping!
                        </p>
                    </div>
                </div>
                <div className="col-span-6">
                    <Card>
                        <Card.Header className="text-lg font-bold">
                            Information
                        </Card.Header>
                        <Card.Content>
                            <TextField className="gap-2">
                                <Label>Email</Label>
                                <Input
                                    fullWidth
                                    onChange={(e)=>setEmail(e.target.value)}
                                    value={email}
                                    type='email'
                                    placeholder='Input Email...'
                                    className="border-2 border-solid border-black focus:outline-0 focus:ring-0"
                                />
                                <Label>Password</Label>
                                <div className='relative'>
                                    <Input
                                        fullWidth
                                        onChange={(e)=>onChangePassword(e.target.value)}
                                        value={password}
                                        onFocus={()=> setPopOpen(true)}
                                        onBlur={(e)=> {
                                            if(e.relatedTarget?.closest('[data-popover]')) return;
                                            setPopOpen(false)
                                        }}
                                        type='password'
                                        className="border-2 border-solid border-black focus:outline-0 focus:ring-0"
                                    />

                                    <Popover isOpen={popOpen}>
                                        <Popover.Content>
                                            <div data-popover tabIndex={-1}>
                                                <Popover.Dialog>
                                                    <Popover.Heading className='flex flex-col gap-2'>
                                                        <p className='font-semibold'>
                                                            The Password must meet the following condition.
                                                        </p>
                                                        <div className='flex flex-row gap-2'>
                                                            { condition.length 
                                                                ? <CheckCircleIcon className='text-green-500 w-5 h-5'/> 
                                                                : <XCircleIcon className='text-red-500 w-5 h-5'/> 
                                                            }
                                                            <p>
                                                                12 characters or more
                                                            </p>
                                                        </div>
                                                        <div className='flex flex-row gap-2'>
                                                            { condition.hasLowerCase 
                                                                ? <CheckCircleIcon className='text-green-500 w-5 h-5'/> 
                                                                : <XCircleIcon className='text-red-500 w-5 h-5'/>
                                                            }
                                                            <p>
                                                                Contain at least one English upper case     
                                                            </p>
                                                        </div>
                                                        <div className='flex flex-row gap-2'>
                                                            {condition.hasLowerCase
                                                                ? <CheckCircleIcon className='text-green-500 w-5 h-5'/> 
                                                                : <XCircleIcon className='text-red-500 w-5 h-5'/>    
                                                            }
                                                            <p>
                                                                Contain at least one English lower case
                                                            </p>
                                                        </div>
                                                        <div className='flex flex-row gap-2'>
                                                            { condition.hasSpecial
                                                                ? <CheckCircleIcon className='text-green-500 w-5 h-5'/> 
                                                                : <XCircleIcon className='text-red-500 w-5 h-5'/>    
                                                            }
                                                            <p>
                                                                One or more special character 
                                                            </p>
                                                        </div>
                                                    </Popover.Heading>
                                                </Popover.Dialog>
                                            </div>
                                        </Popover.Content>
                                    </Popover>
                                </div>
                                <Button 
                                    onPress={onPressVerifyCode}
                                    className="w-full">
                                    {!sendYn ? "Send Verify Code" : "Re-Send Verify Code" }
                                </Button>
                                <Label>Code</Label>
                                <Input
                                    fullWidth
                                    disabled={!sendYn}
                                    onChange={(e)=> setVerifyCode(e.target.value)}
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