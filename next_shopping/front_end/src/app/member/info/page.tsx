"use client";

import React from 'react';

import { Card } from "@heroui/react";
import { useAuthStore } from '@/zustand/useAuthStore';
import { useRouter } from 'next/navigation';


export default function Page() {
    const router = useRouter();
    const { user } = useAuthStore();
    
    return (
        <div className="inner-container flex items-center h-screen justify-center flex-row">
            <Card>
                <Card.Header>
                    {user.nickname}
                </Card.Header>
            </Card>
        </div>
    )
}