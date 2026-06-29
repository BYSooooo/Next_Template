"use client";

import { Button, Card, Input, Label, TextField } from '@heroui/react';
import React from 'react';

export default function NicknameCard() {

    const [inputNick, setInputNick] = React.useState("");

    return (
        <Card className="bg-yellow-400 rounded-xl h-full min-w-60">
            <Card.Header className='font-bold'>
                NickName
            </Card.Header>
            <Card.Content>
                <TextField>
                    <Input 
                        fullWidth
                        value={inputNick}
                        className='form-input'
                    />
                    <Button className='bg-black w-full'>
                        Modify
                    </Button>
                </TextField>
            </Card.Content>
        </Card>

    )
}