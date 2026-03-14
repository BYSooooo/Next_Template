"use client";

import React, { useEffect } from 'react';
import { Button, Card, Form, Input, Label, Separator, TextField } from "@heroui/react";
import { confirmOTP, sendVerificationCode } from '@/lib/supabase/authAction';

export default function Page() {

    const [email, setEmail] = React.useState("");
    const [sendYn, setSendYn] = React.useState(true);
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

    // Change Time Format such as '05:00'
    const formatTime = React.useCallback((seconds : number)=> {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`
    },[])

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
            await confirmOTP(email, verifyCode);
            
        } catch(error) {

        }
    }

    return (
        <div className="inner-container flex items-center h-screen justify-center flex-row">
            <div className="grid grid-cols-12 gap-10">
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
                            <TextField>
                                <Label>Email</Label>
                                <Input
                                    fullWidth
                                    onChange={(e)=>setEmail(e.target.value)}
                                    value={email}
                                    type='email'
                                    placeholder='Input Email...'
                                    className="border-2 border-solid border-black focus:outline-0 focus:ring-0"
                                />
                                <Button 
                                    onPress={onPressVerifyCode}
                                    className="w-full">
                                    {sendYn ? "Send Verify Code" : "Re-Send Verify Code" }
                                </Button>
                                <Label>Code</Label>
                                <Input
                                    fullWidth
                                    disabled={!sendYn}
                                    onChange={(e)=> setVerifyCode(e.target.validationMessage)}
                                    value={verifyCode}
                                    placeholder='Input Verify Code...'
                                    className="border-2 border-solid border-black focus:outline-0 focus:ring-0"
                                />
                                <Button 
                                    fullWidth
                                    isDisabled={sendYn}
                                    variant={sendYn ? 'ghost' : 'secondary' }
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