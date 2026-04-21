"use client";

import React from 'react';

import { Description, Input, Label, TextField } from "@heroui/react";

export default function PasswordField() {
    const [inputPwd, setInputPwd] = React.useState("");
    const [inputConfirm, setInputConfirm] = React.useState("");

    const isRegexPwd = React.useMemo(()=> {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
        return regex.test(inputPwd);
    },[inputPwd])

    const isMatched = inputPwd.length > 0 && inputPwd === inputConfirm;
    

    return (
        <div>
            <TextField
                type="password"
                onChange={setInputPwd}
                isInvalid={inputPwd.length > 0 && !isRegexPwd}>
                <Label isRequired>Password</Label>
                <Input 
                    className="form-input"/>
                <Description className='text-xs text-red-500'>
                    { isRegexPwd 
                        ? 'Meet password requirement'
                        : 'require : 12 characters, upper/lowercase, special character'
                    }
                </Description>
            </TextField>
            <TextField
                onChange={setInputConfirm}>
                <Label isRequired>Password Confirm</Label>
                <Input className="form-input"/>
            </TextField>
        </div>

    )
}