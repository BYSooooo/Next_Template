"use client";

import { useAuthStore } from '@/zustand/useAuthStore';
import { Button, Card, Input, Label, TextField } from '@heroui/react';
import React from 'react';

export default function NicknameCard() {
    const { user, setUser } = useAuthStore();

    const [inputNick, setInputNick] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const [isNickUsed, setIsNickUsed] = React.useState<boolean | null>(null);
    const [isNickTouched, setIsNickTouched] = React.useState(false);

    React.useEffect(()=> {
        if(user?.nickname) {
            setInputNick(user.nickname)
        }
    },[user])

    //...

    const isRegexNick = React.useMemo(()=> {
        const regex = /^[a-zA-Z0-9]{5,12}$/;
        return regex.test(inputNick)
    },[inputNick])

    return (
        <Card className="bg-yellow-400 rounded-xl h-full min-w-60">
            <Card.Header className='font-bold'>
                NickName
            </Card.Header>
            <Card.Content>
                <TextField>
                    <Input 
                        fullWidth
                        value={inputNick}
                        className='form-input'
                    />
                    <Button className='bg-black w-full'>
                        Modify
                    </Button>
                </TextField>
            </Card.Content>
        </Card>

    )
}