import React from 'react'
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { useRouter } from 'next/navigation';
import { Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { getCompany } from '../../../components/fetchData';

export default function CompanyInfo({theme} : {theme : boolean}) {
    const dialogReducer = useAppSelector((state)=> state.dialogReducer.extraInfo)
    const dispatch = useAppDispatch();
    const router = useRouter();

    return (
        <>
            <DialogTitle>
                Company
            </DialogTitle>
            <DialogContent>

            </DialogContent>
            <DialogActions>
                <Button>
                    Close
                </Button>
            </DialogActions>
        </>
    )
}