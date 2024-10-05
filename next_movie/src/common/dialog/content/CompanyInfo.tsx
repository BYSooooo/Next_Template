import React from 'react'
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { useRouter } from 'next/navigation';
import { Avatar, Box, Button, Chip, DialogActions, DialogContent, DialogTitle, Link, Skeleton, Typography } from '@mui/material';
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
                        <Box display="flex" flexDirection="column" rowGap={1}>
                            <Typography variant='h5' fontWeight='bold'>
                                {dialogReducer.name}
                            </Typography>
                            <Chip
                                component="span"
                                sx={{ width : 'fit-content', borderRadius : 3}}
                                icon={<Public />}
                                label={dialogReducer.origin_country}
                            />
                            <Chip
                                component="span"
                                sx={{ width : 'fit-content', borderRadius : 3}} 
                                icon={<Business />} 
                                label={dialogReducer.headquarters || "No Headquater Information"}
                            />
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="column">
                        <Typography variant='subtitle1' fontWeight='bold'>
                            Description
                        </Typography>
                        <Box 
                            borderRadius={3}
                            width="100%"
                            height="6rem"
                            overflow={"scroll"}
                            bgcolor={theme ? grey[700] : grey[300]}
                            p={2}>
                            {dialogReducer.description.length === 0 ? (
                                <Typography>
                                    No Description
                                </Typography>
                            ) : (
                                <Typography>
                                    {dialogReducer.description}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                    <Typography variant='subtitle1' fontWeight='bold'>
                        Homepage
                    </Typography>
                    <Box 
                        borderRadius={3}
                        width="100%"
                        overflow={"scroll"}
                        bgcolor={theme ? grey[700] : grey[300]}
                        p={2}>
                        {dialogReducer.homepage ? (
                            <Link
                                href={dialogReducer.homepage}
                                target='_blank' 
                                rel='noreferrer'>
                                <Typography>
                                    {dialogReducer.homepage}
                                </Typography>
                            </Link>
                        ) : (
                            <Typography>
                                No Hompage Information
                            </Typography>

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