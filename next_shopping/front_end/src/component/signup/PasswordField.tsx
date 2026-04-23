"use client";

import React from 'react';

import { Description, Input, Label, TextField } from "@heroui/react";

export default function PasswordField() {
    const [inputPwd, setInputPwd] = React.useState("");
    const [inputConfirm, setInputConfirm] = React.useState("");
    // Check Counting modify password at least one time
    const [ isTouched, setIsTouched ] = React.useState(false); 
    const [ isConfirmTouched, setIsComfirmTouched] = React.useState(false);

    const isRegexPwd = React.useMemo(()=> {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
        return regex.test(inputPwd);
    },[inputPwd])

    const isMatched = inputPwd.length > 0 && inputPwd === inputConfirm;

    const passwordErr = isTouched && (!isRegexPwd || inputPwd.length === 0);
    const confirmError = isConfirmTouched && (!isMatched || inputConfirm.length === 0);
    

    return (
        <div>
            <TextField
                type="password"
                onChange={(e)=> {
                    setInputPwd(e);
                    setIsTouched(true)
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
        </div>

    )
}