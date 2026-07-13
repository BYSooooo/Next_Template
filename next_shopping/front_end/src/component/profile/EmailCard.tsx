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

    React.useEffect(()=> {
        if(user) {
            setInputEmail(user.email)
        }
    },[user])
    
    const onPressModify = ()=> {
        setIsModify(true)
    }

    const onPressSendVerifyCode = ()=> {
        if(!inputEmail || inputEmail === user?.email) {
            
        }
        
        setIsOTPSend(true)
    }

    const onPressRetryVerify = ()=> {
        
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
                                        onPress={onPressSendVerifyCode}
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