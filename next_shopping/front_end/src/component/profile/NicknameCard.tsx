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

    const isCurrentNickname = inputNick === user?.nickname;
    const hasNickError = isNickTouched && (!isRegexNick || isNickUsed === true) && !isCurrentNickname;

    const onPressModify = async()=> {
        if(!isRegexNick || isCurrentNickname) return;

        setIsLoading(true);

        try {
            const query = new URLSearchParams({ nickname : inputNick}).toString();

            const checkRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/checkNick?${query}`, {
                method : 'GET',
                headers : { 'Content-Type' : 'application.json'},
            });

            const { isDuplicated } = await checkRes.json();

            setIsNickUsed(isDuplicated)

            if(!isDuplicated) {
                const updateRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/nickname`, {
                    method : 'PATCH',
                    headers : { 'Content-Type' : 'application/json'},
                    body : JSON.stringify({ id : user?.id, nickname : inputNick})
                });

                if(updateRes.ok) {
                    setUser({ ...user!, nickname : inputNick});
                    setIsNickTouched(false);
                    setIsNickUsed(false)
                } else {
                    throw new Error('Failed to Change nickname')
                }
            }
        } catch (error) {
            setIsNickUsed(true)
        } finally {
            setIsLoading(false)
        }
    }

    //...

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