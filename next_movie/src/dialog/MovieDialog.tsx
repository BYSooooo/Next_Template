"use client"

import { Dialog } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../redux/hooks'
import Overview from './content/Overview';

export default function MovieDialog() {
    const dialogControl = useAppSelector((state)=> state.dialogReducer);

    const dialogSwitcher = (name: string)=> {
        switch(name) {
            case "Overview" : 
                return <Overview />
            default :
            break;
        }
    }
    return (
        <Dialog 
            open={dialogControl.openYn}
            sx={{ 
                borderRadius : '20rem' }}>
            {dialogSwitcher(dialogControl.name)}
            
        </Dialog>
    )
}