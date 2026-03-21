'use client'

import React from 'react';
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Button, FieldError, Input, Label, TextField } from "@heroui/react";

export default function ManualLogin() {
    const [ signInEmail, setSignInEmail] = React.useState("");
    const [ signInPassword, setSignInPassword] = React.useState("");
    const [ validYn, setValidYn] = React.useState(false);

    const onPressSignIn = ()=> {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const checkYn = emailRegex.test(signInEmail);
        return checkYn 
            ? onSignIn()
            : setValidYn(true)
    }

    const onSignIn = ()=> {

    }


    return (
        <>
            <TextField isInvalid={validYn} type='email'>
                <Label>Email</Label>
                <Input
                    fullWidth
                    placeholder="Input Email..." 
                    value={signInEmail}
                    onChange={(e)=> setSignInEmail(e.target.value)}
                    className='border-2 border-solid border-black focus:outline-0 focus:ring-0'
                    />
                {validYn &&
                    <FieldError >
                        Email is Required.
                    </FieldError>
                }
            </TextField>
            <TextField type='password'>
                <Label>Password</Label>
                <Input 
                    fullWidth
                    placeholder='Input Password...'
                    value={signInPassword}
                    onChange={(e)=> setSignInPassword(e.target.value)}
                    className="border-2 border-solid border-black focus:outline-0 focus:ring-0"
                />
            </TextField>
            <Button
                onPress={onPressSignIn}
                className="w-full flex flex-row">
                <EnvelopeIcon />
                Sign in with Email
            </Button>
        </>
    )
}