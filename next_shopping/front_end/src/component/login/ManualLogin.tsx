'use client'

import React from 'react';
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Button, FieldError, Input, TextField } from "@heroui/react";

export default function ManualLogin() {
    const [ signInEmail, setSignInEmail] = React.useState("");

    const onPressSignIn = ()=> {

    }

    const emailValidYn = true

    return (
        <>
            <TextField isInvalid={emailValidYn}>
            <Input
                fullWidth
                placeholder="Input Email..." 
                value={signInEmail}
                className='border-2 border-solid border-black focus:border-none'
                />
            {signInEmail.length === 0 &&
                <FieldError>
                    Email is Required.
                </FieldError>
            }
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