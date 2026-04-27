"use client";

import { TextField } from '@heroui/react';
import React from 'react';

export default function ContactStep() {

    const [inputTel, setInputTel] = React.useState("");
    [2]

    return (
        <div className='flex flex-col gap-2'>
            <TextField
                type='tel'>

            </TextField>
        </div>
    )
}