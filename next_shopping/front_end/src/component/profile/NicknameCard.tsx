"use client";

import { useAuthStore } from '@/zustand/useAuthStore';
import { Button, Card, Description, Input, Label, TextField } from '@heroui/react';
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
            <Card.Content className='flex flex-col gap-4 p-4'>
                <TextField isInvalid={hasNickError}>
                    <Label className='text-black font-semibold mb-1'>Nickname</Label>
                    <div className='flex flex-row gap-2'>
                        <Input 
                            fullWidth
                            value={inputNick}
                            onChange={(e)=> {
                                setInputNick(e.target.value)
                                setIsNickTouched(null)
                                if(!isNickTouched) setIsNickTouched(true)
                            }}
                            className='form-input'
                            disabled={isLoading}
                        />
                    </div>
                    {!isRegexNick && isNickTouched 
                    ? (
                        <Description className='mt-1 text-xs text-red-600 font-medium'>
                            Available Character betwteen 5 to 12
                        </Description>
                    ) : isCurrentNickname ? (
                        <Description>

                        </Description>
                    ) : isNickUsed === null ? (
                        <Description>

                        </Description>
                    ) : isNickUsed ? (
                        <Description>
                            
                        </Description>
                    ) : (
                        <Description>
                        </Description>
                    )}
                </TextField>
            </Card.Content>
        </Card>

    )
}