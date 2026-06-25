'use client';

import React from 'react';

import { Button, Card, Input, Label, TextField } from "@heroui/react";

export default function PasswordCard() {

    const [curPassword, setCurPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState('');
    const [rePassword, setRePassword] = React.useState("");

    return (
        <Card className="bg-yellow-400 rounded-xl h-full min-w-60">
            <Card.Header className="font-bold">
                Password
            </Card.Header>
            <Card.Content>
                <TextField>
                    <Label>Current Password</Label>
                    <Input 
                        fullWidth
                        value={curPassword}
                        className="form-input"
                    />
                </TextField>
                <TextField>
                    <Label>New Password</Label>
                    <Input
                        fullWidth
                        className='form-input'
                        value={newPassword}>
                    </Input>
                </TextField>
                <TextField>
                    <Label>Retry New Password</Label>
                    <Input
                        fullWidth
                        className='form-input'
                        value={rePassword}
                    />
                </TextField>
            </Card.Content>
            <Card.Footer className='justify-end'>
                <Button className='bg-black'>
                    Confirm
                </Button>
            </Card.Footer>
        </Card> 
    )
}