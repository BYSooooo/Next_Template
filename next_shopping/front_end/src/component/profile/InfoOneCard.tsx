"use client";

import React from 'react';

import { Card, Input, Label, TextField } from '@heroui/react';

export default function InfoOneCard() {

    return (
        <Card className='bg-yellow-400 rounded-xl w-full'>
            <Card.Header className='font-bold'>
                Account
            </Card.Header>
            <Card.Content className='flex flex-row gap-6'>
                <div className='flex flex-col gap-2'>
                    <TextField>
                        <Label>Email</Label>
                        <Input
                            className="form-input" />
                    </TextField>
                    <TextField>
                        <Label>Nickname</Label>
                        <Input className="form-input" />
                    </TextField>
                </div>
                <div className='flex flex-col gap-2'>
                    <TextField>
                        <Label>Password</Label>
                        <Input className="form-input">
                        </Input>
                        <Label>Password Again</Label>
                        <Input className="form-input"/>
                    </TextField>

                </div>
                
            </Card.Content>
        </Card>
    )
}