"use client"

import { Dialog } from '@mui/material'
import { useAppSelector } from '../../redux/hooks';
import Overview from './content/Overview';
import CastInfo from './content/CastInfo';

export default function MovieDialog() {
    const dialogControl = useAppSelector((state)=> state.dialogReducer);
    const theme = useAppSelector((state)=> state.themeReducer).theme

    const dialogSwitcher = (name: string)=> {
        switch(name) {
            case "Overview" : 
                return <Overview />
            case "Cast" : 
                return <CastInfo theme={theme}/>
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