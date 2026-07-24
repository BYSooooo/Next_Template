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

            const checkRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/nickname/check?${query}`, {
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
                        <Description className='mt-1 text-xs text-red-600 font-medium'>
                            This is a nickname you are already using.
                        </Description>
                    ) : isNickUsed === null ? (
                        <Description className='mt-1 text-xs text-red-600 font-medium'>
                            To make changes, duplicate checks and savings are required.
                        </Description>
                    ) : isNickUsed ? (
                        <Description className='mt-1 text-xs text-red-600 font-medium'>
                            This is a nickname you are already using.
                        </Description>
                    ) : (
                        <Description className='mt-1 text-xs text-green-700 font-medium'>
                            ✓ 사용 가능한 닉네임으로 변경되었습니다.
                        </Description>
                    )}
                </TextField>

                <Button
                    className='bg-black text-white w-full font-bold shadow-md disabled:bg-gray-300'
                    isDisabled={!isRegexNick || isCurrentNickname || isLoading}
                    onPress={onPressModify}>
                        { isLoading 
                            ? "Checking..." 
                            : 'Modify'
                        }
                </Button>

            </Card.Content>
        </Card>

    )
}