"use client";

import React from 'react';
import type { ToastContentValue } from '@heroui/react';
import { 
    Toast, 
    ToastContent, 
    ToastDescription, 
    ToastIndicator, 
    ToastQueue, 
    ToastTitle } from '@heroui/react';
import { useToastStore } from '@/zustand/useToastStore';

export default function ToastMain() {
    const { queue, placement } = useToastStore()
    
    return (
        <Toast.Provider placement={placement} queue={queue}>
            {({ toast : toastItem}) => {
                const content = toastItem.content as ToastContentValue;

                return (
                    <Toast
                        className="rounded-xl border border-border" 
                        toast={toastItem} variant={content.variant}>
                        <ToastContent>
                            <div className='flex items-center gap-2'>
                                <ToastIndicator className='text-accent' variant={content.variant} />
                                <div className='flex flex-col pr-6'>
                                    {
                                        content.title 
                                            ? <ToastTitle className='text-accent'>{content.title}</ToastTitle>
                                            : null 
                                    }
                                    {
                                        content.description
                                            ? <ToastDescription>{content.description}</ToastDescription>
                                            : null
                                    }
                                </div>
                            </div>
                        </ToastContent>
                    </Toast>
                )
            }}
        </Toast.Provider>
        
    )
}