import React from 'react'
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { useRouter } from 'next/navigation';
import { Avatar, Box, Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { getCompany } from '../../../components/fetchData';
import { controlDialog } from '../../../redux/features';

export default function CompanyInfo({theme} : {theme : boolean}) {
    const dialogReducer : CompanyDetail = useAppSelector((state)=> state.dialogReducer.extraInfo)
    const dispatch = useAppDispatch();
    const router = useRouter();

    const onClickClose = ()=> {
        dispatch(controlDialog({ openYn : false, name : ""}));
    }

    return (
        <>
            <DialogTitle>
                Company
            </DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" width="100%">
                    <Box flexDirection="row">
                        {dialogReducer.logo_path ? (
                            <Avatar
                                sx={{ 
                                    backgroundColor : theme ? "white" : "none2", 
                                    mb : 1 ,
                                    width : "8rem", height : "8rem"}}
                                src={`https://image.tmdb.org/t/p/original${dialogReducer.logo_path}`}>
                            </Avatar>

                        ) : (
                            <>
                            </>
                        )}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClickClose}>
                    Close
                </Button>
            </DialogActions>
        </>
    )
}