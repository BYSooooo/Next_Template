"use client"

import { Button, Dialog, DialogActions } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Overview from './content/Overview';
import CastInfo from './content/CastInfo';
import { controlDialog } from '../../redux/features';
import { useRouter } from 'next/navigation';

export default function MovieDialog() {
    const [showMoreButton, setShowMoreButton ]= React.useState(false)
    const dialogControl = useAppSelector((state)=> state.dialogReducer);
    const movieSlice = useAppSelector((state)=> state.dialogReducer.extraInfo);
    const router = useRouter()
    const dispatch = useAppDispatch()

    React.useEffect(()=> {
        switch(dialogControl.name) {
            case "Overview" :
                setShowMoreButton(true)
                break;
            case "Cast" :
                setShowMoreButton(false)
                break;
            default : break;
        }
    },[])

    const dialogSwitcher = (name: string)=> {
        switch(name) {
            case "Overview" : 
                return <Overview />
            case "Cast" : 
                return <CastInfo />
            default :
            break;
        }
    }

    const onClickClose =()=> {
        dispatch(controlDialog({ openYn : false, name : ""}))
    };

    const onClickMore =()=> {
        dispatch(controlDialog({ openYn : false, name : ""}))
        router.push(`/detail/${movieSlice.id}`)
    }

    return (
        <Dialog 
            open={dialogControl.openYn}
            sx={{ 
                borderRadius : '20rem' }}>
            {dialogSwitcher(dialogControl.name)}       
            <DialogActions>
                {showMoreButton && <Button onClick={()=> onClickMore()}>More</Button>}
                <Button onClick={()=> onClickClose()}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}