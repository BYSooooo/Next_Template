"use client";

import { useSignUpStore } from '@/zustand/useSignUpStore';
import { Button, Description, Input, Label, Link, TextField } from '@heroui/react';
import React from 'react';

export default function AccountStep() {
    const {email, setInfo, setStep, initStore } = useSignUpStore();

    /* Password Part */
    const [inputPwd, setInputPwd] = React.useState("");
    const [inputConfirm, setInputConfirm] = React.useState("");
    
    // Check Counting modify password at least once
    const [isPwdTouched, setIsPwdTouched] = React.useState(false);
    const [isConfirmTouched, setIsComfirmTouched] = React.useState(false);

    const isRegexPwd = React.useMemo(()=> {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
        return regex.test(inputPwd);
    },[inputPwd])

    const isMatched = inputPwd.length > 0 && inputPwd === inputConfirm;

    const passwordErr = isPwdTouched && (!isRegexPwd || inputPwd.length === 0);
    const confirmError = isConfirmTouched && (!isMatched || inputConfirm.length === 0);

    
    /* Nickname Part */
    const [inputNick, setInputNick] = React.useState("");
    // null = not yet check, boolean = check result
    const [isNickUsed, setIsNickUsed] = React.useState<boolean|null>(null);
    const [isNickTouched, setIsNickTouched] = React.useState(false);
        
    const onPressCheckNickName = ()=> {
        if(!isRegexPwd) return;

        // TODO: Check Logic with Supabase
        // ...
        const isDuplicate = true
        setIsNickUsed(isDuplicate);
    }

    const isRegexNick = React.useMemo(()=> {
        const regex = /^[a-zA-Z0-9]{5,12}$/;
        return regex.test(inputNick)
    },[inputNick]);

    const hasNickError = isNickTouched && (!isRegexNick || isNickUsed === true);

    const onPressNext = () => {
        const isPasswordValid = isRegexPwd && isMatched;
        const isNicknameValid = isRegexNick && isNickUsed === false;

        if(!isPasswordValid || !isNicknameValid) {
            setIsPwdTouched(true);
            setIsComfirmTouched(true);
            setIsNickTouched(true)
            return;
        } 

        setInfo({
            password : inputPwd,
            nickname : inputNick
        })
        setStep('INFO02')
        
    }


    return (
        <div className='flex flex-col gap-2'>
            {/* Email Part (Read Only)*/}
            <TextField>
                <Label isRequired>Email</Label>
                <Input
                    disabled={true}   
                    className="form-input"
                    value={email}
                />
                <Description>
                    If you want to change Email, please verify email again.
                    <Link 
                        className="text-xs"
                        onPress={initStore}>
                        Verify again
                    </Link>
                </Description>
            </TextField>

            {/* Password Part */}
            <TextField
                type="password"
                onChange={(e)=> {
                    setInputPwd(e);
                    setIsPwdTouched(true)
                }}
                isInvalid={passwordErr}>
                <Label isRequired>Password</Label>
                <Input className="form-input"/>
            </TextField>    
            <Description className={`${passwordErr ? 'text-red-500' : isRegexPwd ? 'text-green-600' : 'text-gray-500'}`}>
                {passwordErr
                    ? (inputPwd.length === 0 ? "Password is required" : "Require: 12 chars, Upper/Lower, Special char")
                    : (isRegexPwd ? "✓ Strong password" : "Min 12 chars, Upper/Lower, Special char")
                }
            </Description>

            {/* Password Confirm Part */}
            <TextField
                type="password"
                onChange={(e)=> {
                    setInputConfirm(e)
                    setIsComfirmTouched(true)
                }}
                isInvalid={confirmError}>
                <Label isRequired>Password Confirm</Label>
                <Input className="form-input"/>
            </TextField>
            <Description className={`${confirmError ? 'text-red-500' : isMatched ? 'text-green-600' : 'text-gray-500'}`}>
                {confirmError 
                    ? (inputConfirm.length === 0 ? "Confirm your password" : "Passwords do not match")
                    : (isMatched ? "✓ Passwords matched" : "Check input password again")
                }
            </Description>

            {/* Nickname Part */}
            <TextField
                isInvalid={hasNickError}
                onChange={(e)=> {
                    setInputNick(e);
                    setIsNickUsed(null);
                    if(!isNickTouched) setIsNickTouched(true)
                }}
                className="flex flex-col gap-2">
                <Label isRequired>
                    Nickname
                </Label>
                <div className='flex flex-row gap-2'>
                    <Input className="form-input w-[75%]"/>
                    <Button
                        isDisabled={!isRegexNick}
                        onPress={onPressCheckNickName}
                        className="bg-yellow-400 text-black w-[20%]">
                        Check
                    </Button>
                </div>
            </TextField>
            {!isRegexPwd 
                ? ( // Step 1. Check pass regex test 
                    <Description className='text-gray-600'>
                        5-12 Characters. letters and numbers only.
                    </Description>
                ) : isNickUsed === null 
                    ? ( // Stpe 2. 'Check' Button press or not yet.
                        <Description className='text-yellow-500'>
                            Please check availablity.
                        </Description>
                        ) :  isNickUsed // Step 3. Check nickname duplicated
                            ? (
                                <Description className='text-red-500'>
                                    This Nickname already used.
                                </Description>
                            ):( 
                                <Description className='text-green-600'>
                                    ✓ This nickname is available.
                                </Description>
                            ) 
            }
            <Button 
                onPress={onPressNext}
                className="w-full bg-yellow-500 text-black">
                Next
            </Button>
        </div>

    )
}