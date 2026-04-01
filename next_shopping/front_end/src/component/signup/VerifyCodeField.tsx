"use client";

import React from 'react';
import { Button, Input, Label, TextField } from '@heroui/react';

export default function VeriftCodeField() {
    return (
        <>
            <TextField
                type="password"
                className="gap-1">
                    <div className='flex flex-row'>
                        <Label>Code</Label>
                        
                    </div>
                    <Input
                        fullWidth

                    />
            </TextField>
            <Button>

            </Button>
        </>
    )
}