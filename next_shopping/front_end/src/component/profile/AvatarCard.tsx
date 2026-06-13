"use client";

import React from 'react';
import { Avatar, Button, Card } from '@heroui/react';

export default function AvatarCard() {

    return (
        <Card className='bg-yellow-400 rounded-xl'>
            <Card.Header className='font-bold'>
                Avatar
            </Card.Header>
            <Card.Content className='flex flex-col gap-6'>
                <Avatar className='w-28 h-28'/>
                <Button className="w-full bg-black">
                    Change
                </Button>
                <Button variant='danger' className='w-full'>
                    Reset
                </Button>
            </Card.Content>

        </Card>
    )
}