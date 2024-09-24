import React from 'react'
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { useRouter } from 'next/navigation';
import { Avatar, Box, Button, Chip, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { getCompany } from '../../../components/fetchData';
import { controlDialog } from '../../../redux/features';
import { grey } from '@mui/material/colors';
import { Business, Public } from '@mui/icons-material';

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
                    <Box display="flex" flexDirection="row">
                        <Box 
                            display="flex"
                            overflow="hidden" 
                            minWidth="8rem" 
                            height="10rem" 
                            borderRadius={4}
                            alignItems='center'
                            justifyContent="center"
                            bgcolor={theme ? grey[700] : grey[200]} 
                            mr={2}>
                            {dialogReducer.logo_path ? (
                                <Box>
                                    <img
                                        style={{borderRadius : 5, maxWidth : '8rem', backgroundColor : "white"}} 
                                        src={`https://image.tmdb.org/t/p/original${dialogReducer.logo_path}`}
                                    />
                                </Box>
                            ) : (
                                <Box display="flex" flexDirection="column">
                                    <Business sx={{ width : "4rem", height : "4rem"}}/>
                                    <Typography>
                                        No Image
                                    </Typography>
                                </Box>
                            )}
                        </Box>  
                        <Box display="flex" flexDirection="column">
                            <Typography variant='h5' fontWeight='bold'>
                                {dialogReducer.name}
                            </Typography>
                            <Chip
                                component="span"
                                sx={{ width : 'fit-content', borderRadius : 3}} 
                                icon={<Public />} 
                                label={dialogReducer.headquarters || "No Headquater Information"}
                            />
                            
                        </Box>
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