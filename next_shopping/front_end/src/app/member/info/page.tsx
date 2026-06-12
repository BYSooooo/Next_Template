"use client";

import React from 'react';

import { Avatar, Card, Separator } from "@heroui/react";
import { useAuthStore } from '@/zustand/useAuthStore';
import { useRouter } from 'next/navigation';


export default function Page() {
    const router = useRouter();
    const { user } = useAuthStore();
    
    return (
        <div className="inner-container flex items-center h-screen justify-center flex-row">
            <Card className='bg-yellow-400 rounded-lg w-2/3'>
                <Card.Header>
                    <p className='font-bold text-3xl'>
                        Information
                    </p>
                </Card.Header>
                <Card.Content>
                    <div className='flex flex-row'>
                        <Separator orientation='vertical' className='text-black' />
                    </div>
                    <Avatar size='lg'>
                        <Avatar.Image />
                    </Avatar>

                </Card.Content>
                <Card.Footer>
                    
                </Card.Footer>
            </Card>
        </div>
    )
}