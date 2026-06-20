"use client";

import React from 'react';
import { Avatar, Button, Card } from '@heroui/react';

export default function AvatarCard() {

    return (
        <Card className='bg-yellow-400 rounded-xl h-full'>
            <Card.Header className='font-bold'>
                Avatar
            </Card.Header>
            <Card.Content className='flex flex-row gap-6 justify-between'>
                <Avatar className='w-36 h-36'/>
                <div className='flex flex-col gap-2 w-[2/3] justify-end'>
                    <Button className="w-full bg-black hover:bg-gray-800">
                        Change
                    </Button>
                    <Button className='w-full bg-white hover:bg-gray-100 text-black'>
                        Reset
                    </Button>
                </div>
            </Card.Content>
        </Card>
    )
}