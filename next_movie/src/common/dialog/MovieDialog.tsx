"use client"

import { Dialog, DialogProps } from '@mui/material'
import { useAppSelector } from '../../redux/hooks';
import Overview from './content/Overview';
import CastInfo from './content/CastInfo';
import MediaInfo from './content/MediaInfo';
import React from 'react';

export default function MovieDialog() {
    const [fullWidthYn, setFullWidthYn] = React.useState(false)
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm')
    
    const dialogControl = useAppSelector((state)=> state.dialogReducer);
    const theme = useAppSelector((state)=> state.themeReducer).theme
    React.useEffect(()=> {
        if(dialogControl.name === 'Media') {
            setFullWidthYn(true)
            setMaxWidth('md')
        } else {
            setFullWidthYn(false)
            setMaxWidth('sm')
        }
    },[dialogControl.name])
    
    const dialogSwitcher = (name: string)=> {
        switch(name) {
            case "Overview" : 
                return <Overview />
            case "Cast" : 
                return <CastInfo theme={theme} />
            case "Media" : 
                return <MediaInfo theme={theme} />
            default :
                break;
        }
    }
    return (
        <Dialog
            maxWidth={maxWidth}
            fullWidth={fullWidthYn} 
            open={dialogControl.openYn}>
            {dialogSwitcher(dialogControl.name)}
        </Dialog>
    )
}