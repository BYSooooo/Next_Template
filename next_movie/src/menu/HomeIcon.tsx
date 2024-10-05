"use client"

import React from 'react';
import { Home }from '@mui/icons-material'
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';

export default function HomeIcon() {
    const router = useRouter();

    return (
        <Box
            display='flex'
            height='100$' 
            onClick={()=>router.push('/')}
            sx={{
                ':hover' : {
                    cursor : 'pointer'
                }
            }}>
            <Home sx={{
                width : '2rem',
                height : '2rem'
            }} />
        </Box>
    
    )
}