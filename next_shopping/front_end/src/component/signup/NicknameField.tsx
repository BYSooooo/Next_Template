"use client";

import React from 'react';
import { Button, Description, Input, Label, TextField } from "@heroui/react";

export default function NicknameField() {
    const [inputNick, setInputNick] = React.useState("");

    const onPressCheckNickName = ()=> {
        //....
    }

    return (
        <div className='flex flex-col gap-2'>
            <TextField
                onChange={(e)=> {
                    setInputNick(e)
                }}>
                <Label 
                    isRequired>Nickname</Label>
                <Input className="form-input"/>
            </TextField>
            <Description>

            </Description>
            <Button
                onPress={onPressCheckNickName}
                className="w-full bg-yellow-400 text-black">
                Check Nickname
            </Button>

        </div>
    )
}