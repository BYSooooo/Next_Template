"use client";

import React from 'react';
import { Button, Description, Input, Label, TextField } from "@heroui/react";

export default function NicknameField() {
    const [inputNick, setInputNick] = React.useState("");
    // null = not yet check, boolean = check result
    const [isUsed, setisUsed] = React.useState<boolean|null>(null);
    const [isTouched, setIsTouched] = React.useState(false);

    const onPressCheckNickName = ()=> {
        if(!isRegexPwd) return;

        // TODO: Check Logic with Supabase
        // ...
        const isDuplicate = false
        setisUsed(isDuplicate);

    }

    const isRegexPwd = React.useMemo(()=> {
        const regex = /^[a-zA-Z0-9]{5,12}$/;
        return regex.test(inputNick)
    },[inputNick]);

    const hasError = isTouched && (!isRegexPwd || isUsed === true);

    return (
        <div className='flex flex-col gap-2'>
            <TextField
                isInvalid={hasError}
                onChange={(e)=> {
                    setInputNick(e);
                    setisUsed(null);
                    if(!isTouched) setIsTouched(true)
                }}>
                <Label isRequired>
                    Nickname
                </Label>
                <div className='flex flex-row gap-2'>
                    <Input className="form-input w-[75%]"/>
                    <Button
                        isDisabled={!isRegexPwd}
                        onPress={onPressCheckNickName}
                        className="bg-yellow-400 text-black w-[20%]">
                        Check
                    </Button>
                </div>
            </TextField>
            { isTouched && 
                // (  
                //     ?   <Description>
                //             This Nickname is already used.
                //         </Description>
                //     :    <Description>
                //             ✓ This NickName available.
                //         </Description>
                     
                // )
            }
            <Description>

            </Description>

        </div>
    )
}