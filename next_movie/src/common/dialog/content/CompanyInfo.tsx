import React from 'react'
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { useRouter } from 'next/navigation';
import { DialogTitle } from '@mui/material';

export default function CompanyInfo({theme} : {theme : boolean}) {
    const dispatch = useAppDispatch();
    const dialogReducer = useAppSelector((state)=> state.dialogReducer.extraInfo)
    const router = useRouter();

    return (
        <>
            <DialogTitle>
                Company
            </DialogTitle>
        </>
    )
}