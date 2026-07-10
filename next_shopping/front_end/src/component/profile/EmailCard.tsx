'use client';

import React from 'react';

import { Button, Card, Input, Label, TextField } from "@heroui/react";
import { useAuthStore } from '@/zustand/useAuthStore';

export default function EmailCard() {

    const { user, setUser } = useAuthStore();

    const [inputEmail, setInputEmail] = React.useState("");
    const [isModify, setIsModify] = React.useState(false)
    const [isOTPSend, setIsOTPSend] = React.useState(false)
    const [inputCode, setInputCode] = React.useState("")

    React.useEffect(()=> {
        if(user) {
            setInputEmail(user.email)
        }
    },[])

    const onPressVerifyCode = ()=> {
        setIsOTPSend(true)
    }

    const onPressRetryVerify = ()=> {
        
    }

    const onPressModify = ()=> {
        setIsModify(true)
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
                            : (!isOTPSend) 
                                ? 
                                    <Button 
                                        onPress={onPressVerifyCode}
                                        className='bg-black w-fit'>
                                        Send Code
                                    </Button>
                                : 
                                    <Button 
                                        className="bg-black w-fit"
                                        onPress={onPressRetryVerify}>
                                        Retry
                                    </Button>
                        }
                    </div>
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
                <Button className='bg-black w-full'>
                    Verify
                </Button>
            </Card.Content>
        </Card>
    )
}