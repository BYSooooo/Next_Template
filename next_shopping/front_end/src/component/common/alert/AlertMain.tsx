"use client";

import { useAlertStore } from '@/zustand/useAlertStore';
import { Alert } from '@heroui/react';

export default function AlertMain() {
    const { openYn, status, title, description, customIcon } = useAlertStore()

    return (
        <div className='absolute'>
            {openYn && 
                <Alert status={status}>
                    <Alert.Indicator>
                        {customIcon}
                    </Alert.Indicator>
                    <Alert.Content>
                        <Alert.Title>
                            {title}
                        </Alert.Title>
                        <Alert.Description>
                            {description}
                        </Alert.Description>
                    </Alert.Content>
                </Alert>
            
            }
        </div>
        
    )
}