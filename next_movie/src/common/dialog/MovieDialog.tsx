"use client"

import React from 'react';
import { Dialog, DialogProps } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Overview from './content/Overview';
import CastInfo from './content/CastInfo';
import MediaInfo from './content/MediaInfo';
import CollectionInfo from './content/CollectionInfo';
import CompanyInfo from './content/CompanyInfo';
import { controlDialog } from '../../redux/features';

export default function MovieDialog() {
    const [fullWidthYn, setFullWidthYn] = React.useState(false)
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm')
    
    const dialogControl = useAppSelector((state)=> state.dialogReducer);
    const theme = useAppSelector((state)=> state.themeReducer).theme;
    const dispatch = useAppDispatch();
    
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
            case "Collection" : 
                return <CollectionInfo theme={theme}/>
            case "Company" : 
                return <CompanyInfo theme={theme}/>
            default :
                break;
        }
    }

    const onCloseDialog = (e : object, reason : string)=> {
        if(reason === "escapeKeyDown" || reason === "backdropClick") {
            dispatch(controlDialog({openYn : false, name : ""}))
        }
    }

    return (
        <Dialog
            onClose={(e,reason)=> onCloseDialog(e,reason)}
            maxWidth={maxWidth}
            fullWidth={fullWidthYn} 
            open={dialogControl.openYn}>
            {dialogSwitcher(dialogControl.name)}
        </Dialog>
    )
}