'use client';

import React from 'react';

import { Button, Card, Description, Input, Label, TextField } from "@heroui/react";
import { useAuthStore } from '@/zustand/useAuthStore';

export default function PasswordCard() {

    const { user } = useAuthStore();

    const [curPassword, setCurPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState('');
    const [rePassword, setRePassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const [errorMsg, setErrorMsg] = React.useState<string|null>(null);
    const [successMsg, setSuccessMsg] = React.useState<string|null>(null);

    const isRegexPassword = React.useMemo(()=> {
        const regex = /^(?=.*[A-Za-z])(?=.*[@$!%*#?$])[A-Za-z\d@$!%*#?&]{8,20}$/;
        return regex.test(newPassword);
    },[newPassword])

    const isPasswordMatch = newPassword === rePassword && rePassword.length > 0;

    const canSubmit = curPassword.length > 0 && isRegexPassword && isPasswordMatch && !isLoading;

    const onPressConfirm = async()=> {
        if(!canSubmit || !user?.email) return;

        setIsLoading(true);
        setErrorMsg(null);
        setSuccessMsg(null);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/password`, {
                method : 'PATCH',
                headers : { 'Content-Type' : 'application/json'},
                body : JSON.stringify({
                    email : user.email,
                    curPassword,
                    newPassword
                })  
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || 'Failed to change password.');
            }

            setSuccessMsg('Password Changed Successfully.');
            setCurPassword('')
            setNewPassword('');
            setRePassword('');
        } catch(error) {
            setErrorMsg(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="bg-yellow-400 rounded-xl h-full min-w-60">
            <Card.Header className="font-bold">
                Password
            </Card.Header>
            <Card.Content>
                <TextField>
                    <Label>Current Password</Label>
                    <Input 
                        type='password'
                        fullWidth
                        value={curPassword}
                        onChange={(e)=> {
                            setCurPassword(e.target.value)
                            setErrorMsg(null)
                            setSuccessMsg(null)
                        }}
                        className="form-input"
                        disabled={isLoading}
                    />
                </TextField>
                
                <TextField >
                    <Label>New Password</Label>
                    <Input
                        type="password"
                        fullWidth
                        className='form-input'
                        value={newPassword}
                        onChange={(e)=> {
                            setNewPassword(e.target.value)
                            setErrorMsg(null)
                            setSuccessMsg(null)
                        }}
                        disabled={isLoading}
                        >
                    </Input>
                </TextField>
                <TextField>
                    <Label>Retry New Password</Label>
                    <Input
                        type="password"
                        fullWidth
                        className='form-input'
                        value={rePassword}
                        onChange={(e)=> {
                          setRePassword(e.target.value)
                          setErrorMsg(null);
                          setSuccessMsg(null)  
                        }}
                        disabled={isLoading}
                    />
                </TextField>
            </Card.Content>
            <div className='h-5 mb-5 flex items-start'>
                { errorMsg ? (
                    <Description className='text-xs text-red-600 font-medium leading-tight'>
                        {errorMsg}
                    </Description>
                ) : successMsg ? (
                    <Description className='text-xs text-green-700 font-medium leading-tight'>
                        {successMsg}
                    </Description>
                ) : newPassword.length > 0 && !isRegexPassword ? (
                    <Description className='text-xs text-red-600 font-medium leading-tight'>
                        The password must include 8~20 characters in English, numbers, or special characters.
                    </Description>
                ) : rePassword.length > 0 && !isPasswordMatch ? (
                    <Description className='text-xs text-red-600 font-medium leading-tight'>
                        The new password does not match.
                    </Description>
                ) : (
                    <Description className='text-xs text-gray-700 font-medium leading-tight'>
                        Please enter in combinations of 8~20 characters in English, numbers, or special characters.
                    </Description>
                )
                }
            </div>
            <Card.Footer className='justify-end p-4 pt-0'>
                <Button 
                    onPress={onPressConfirm}
                    className='bg-black'>
                    Confirm
                </Button>
            </Card.Footer>
        </Card> 
    )
}