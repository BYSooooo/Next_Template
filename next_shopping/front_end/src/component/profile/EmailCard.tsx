'use client';

import React from 'react';

import { Button, Card, Description, Input, Label, TextField } from "@heroui/react";
import { useAuthStore } from '@/zustand/useAuthStore';
import { useToastStore } from '@/zustand/useToastStore';

export default function EmailCard() {

    const { user, setUser } = useAuthStore();
    const { openToast } = useToastStore();

    const [inputEmail, setInputEmail] = React.useState("");
    const [isModify, setIsModify] = React.useState(false)
    const [isOTPSend, setIsOTPSend] = React.useState(false)
    const [inputCode, setInputCode] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false);

    const [emailStatus, setEmailStatus] = React.useState<{type : 'none'| 'success' | 'error'; message : string}>({ type : 'none', message : ''});
    const [codeStatus, setCodeStatus] = React.useState<{type : 'none' | 'success' | 'error'; message : string }>({ type : 'none', message : ""});

    const [timeLeft, setTimeLeft] = React.useState(0);

    React.useEffect(()=> {
        if(user) {
            setInputEmail(user.email)
        }
    },[user])

    React.useEffect(()=> {
        if(timeLeft <= 0) return;
        const timer = setInterval(()=> {
            setTimeLeft((prev) => prev -1);
        }, 1000);

        return () => clearInterval(timer)
    },[timeLeft])

    React.useEffect(()=> {
        if(!isOTPSend && timeLeft === 0) {
            setCodeStatus({ type : 'error', message : 'Verify code is expired.'})
        }
    },[timeLeft, isOTPSend]);

    const formatterTime = React.useMemo(()=> {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`
    }, [timeLeft])

    const isEmailValid = React.useMemo(()=> {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(inputEmail);
    },[inputEmail])
    
    const onPressModify = ()=> {
        setIsModify(true)
        setEmailStatus({ type : 'none', message : ''});
    }

    const onPressSendVerifyCode = async()=> {
        if (!isEmailValid) {
            setEmailStatus({ type : 'error', message : 'Invalid Email Format'});
            return;
        }

        if(inputEmail  === user?.email) {
            setEmailStatus({
                type : 'error',
                message : 'Please input new email address.'
            })
            return;
        }

        setIsLoading(true);
        setEmailStatus({ type : 'none', message : ''});
        setCodeStatus({ type : 'none', message : ''});

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/email/sendcode`, {
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({
                    id : user?.id,
                    newEmail : inputEmail
                })
            });
            const result = await res.json();

            if(res.ok) {
                setIsOTPSend(true)
                setTimeLeft(300);
                setEmailStatus({ type : 'success', message : 'Verify code sended' })
            } else {
                throw new Error(result.message || 'Error Occured')
            }
            
            
        } catch (error) {
            setEmailStatus({ type : 'error', message : 'Fail to send verify code'})
        } finally {
            setIsLoading(false);
        }
        
    }

    const onPressVerifyCode = async()=> {
        if(timeLeft <= 0){
            setCodeStatus({ type : 'error', message : 'Verify code is expired. Please try again'});
            return;
        }

        if(!inputCode || inputCode.length !== 6) {
            setCodeStatus({ type : 'error', message : 'please check input code'});
            return;
        }

        setIsLoading(true);
        setCodeStatus({ type : 'none', message : ''})

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/email/verify`, {
                method : 'POST',
                headers : { 'Content-Type' : 'application/json'},
                body : JSON.stringify({
                    id : user?.id,
                    newEmail : inputEmail,
                    code : inputCode
                })
            });

            const result = await res.json();

            if(res.ok) {
                setUser({ ...user!, email : result.email});
                setIsModify(false);
                setIsOTPSend(false);
                setInputCode("");
                setTimeLeft(0);
                setEmailStatus({ type : 'success', message : 'Email Address change successfully.'})
            } else {
                throw new Error(result.message || 'Verify code not matched.');
            }
        } catch (error) {
            setCodeStatus({ type : 'error', message : error.message});
        } finally {
            setIsLoading(false)
        }
    }

    const onPressRetryVerify = ()=> {
        //...
    }


    return (
        <Card className='bg-yellow-400 rounded-xl h-full min-w-60'>
            <Card.Header className='font-bold'>
                Email
            </Card.Header>
            <Card.Content>
                <TextField type="email">
                    <Label isRequired>Email</Label>
                    <div className="flex flex-row gap-2">
                        <Input
                            disabled={!isModify}
                            fullWidth
                            onChange={(e)=> setInputEmail(e.target.value)}
                            value={inputEmail}
                            className='form-input'
                        />
                        { !isModify 
                            ?
                                <Button
                                    className="bg-black w-fit" 
                                    onPress={onPressModify}>
                                    Modify
                                </Button>
                            :   <Button 
                                    isDisabled={isLoading || !isEmailValid}
                                    onPress={onPressSendVerifyCode}
                                    className='bg-black w-fit'>
                                        { isLoading 
                                            ? 'Sending...' 
                                            : isOTPSend 
                                                ? 'Retry' 
                                                : 'Send Code'
                                        }
                                </Button>
                                
                        }
                    </div>
                    {emailStatus.type !== 'none' && 
                        (
                            <Description className={`mt-1 text-xs font-medium ${emailStatus.type === 'error' ? 'text-red-600' : 'text-green-700' }`}>
                                {emailStatus.message}
                            </Description>
                        )
                    
                    }
                </TextField>
                <TextField>
                    <Label>Code</Label>
                    <Input
                        disabled={!isModify}
                        fullWidth
                        value={inputCode}
                        maxLength={6}
                        className='form-input'
                    
                    />
                </TextField>
                <Button 
                    onPress={onPressVerifyCode}
                    className='bg-black w-full'>
                    Verify
                </Button>
            </Card.Content>
        </Card>
    )
}