"use client";

import React from 'react';

import { Card } from "@heroui/react";
import { useAuthStore } from '@/zustand/useAuthStore';
import { useRouter } from 'next/navigation';


export default function Page() {
    const router = useRouter();
    
    return (
        <div className="inner-container flex items-center h-screen justify-center flex-row">
            <Card>
                <Card.Header>
                    This is Info Page
                </Card.Header>
            </Card>
        </div>
    )
}