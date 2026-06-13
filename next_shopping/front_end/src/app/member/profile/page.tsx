"use client";

import React from 'react';

import { Avatar, Card, Separator } from "@heroui/react";
import { useAuthStore } from '@/zustand/useAuthStore';
import { useRouter } from 'next/navigation';
import AvatarCard from '@/component/profile/AvatarCard';


export default function Page() {
    const router = useRouter();
    const { user } = useAuthStore();
    
    return (
        <div className="inner-container flex items-center h-screen justify-center flex-row">
            <Card className='bg-gray-100 rounded-lg w-2/3'>
                <Card.Header>
                    <p className='font-bold text-3xl'>
                        Information
                    </p>
                </Card.Header>
                <Card.Content className='flex flex-row'>
                    <AvatarCard />
                    
                </Card.Content>
                <Card.Footer>
                    
                </Card.Footer>
            </Card>
        </div>
    )
}