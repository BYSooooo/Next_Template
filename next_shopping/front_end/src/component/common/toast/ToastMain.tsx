"use client";

import React from 'react';
import { motion } from 'motion/react'
import { 
    Toast, 
    ToastContent, 
    ToastDescription, 
    ToastIndicator, 
    ToastQueue, 
    ToastTitle } from '@heroui/react';
import { ToastContentIF, useToastStore } from '@/zustand/useToastStore';


export default function ToastMain() {
    const { queue, placement } = useToastStore()
    
    return (
        <Toast.Provider placement={placement} queue={queue}>
            {({ toast : toastItem}) => {
                const content = toastItem.content as ToastContentIF;
                const showCloseButton = content.closeButtonYn;
                const timeout = content.timeOut;
                

                return (
                    <Toast
                        className="rounded-xl border border-border" 
                        toast={toastItem} variant={content.variant}>
                        <motion.div
                            initial={{ width : "100%" }}
                            animate={{ width : "0%" }}
                            transition={{ duration : timeout / 1000, ease : "linear"}}
                            className='absolute inset-0 z-0 bg-yellow-50 pointer-events-none'
                            style={{ originX : 0}}
                            >
                        </motion.div>           
                        <ToastContent className='flex z-10 '>
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
                        { showCloseButton &&
                            <Toast.CloseButton  className="absolute top-1/2 right-2 -translate-y-1/2 border-none bg-transparent opacity-100 [&>svg]:size-4"/>
                        }
                    </Toast>
                )
            }}
        </Toast.Provider>
        
    )
}