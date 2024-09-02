"use client";

import React from 'react';
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { getPerson } from '../../../components/fetchData';
import { Box, Button, Chip, DialogActions, DialogContent, DialogTitle, Skeleton, Typography } from '@mui/material';
import { controlDialog } from '../../../redux/features';
import { CalendarMonth, Groups3, Public } from '@mui/icons-material';

export default function CastInfo() {
    const [person, setPerson] = React.useState<PersonInfo>()
    const staffId = useAppSelector((state)=> state.dialogReducer.extraInfo)
    const dispatch = useAppDispatch();
    React.useEffect(()=> {
        getPerson(staffId).then((result)=> setPerson(result))
    },[])
    

    const onClickClose =()=> {
        dispatch(controlDialog({ openYn : false, name : ""}))
    };

    return (
        <>  
            <DialogTitle>
                Person
            </DialogTitle>
            <DialogContent>
                    {person 
                    ?(
                        <>
                            <Box display="flex" flexDirection="row" mb={1}>
                                <img 
                                    style={{ borderRadius : 5, width : "10rem"}}
                                    src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                                />
                                <Box display="flex" flexDirection="column" rowGap={1}
                                    sx={{ mx : 2}}>
                                    <Typography variant='h5' fontWeight="bold">
                                        {person.name}
                                    </Typography>
                                    <Chip 
                                        component="span"
                                        sx={{ width : 'fit-content', borderRadius : 3}}
                                        icon={<CalendarMonth />} 
                                        label={person.birthday || 'Unknown'} 
                                    />
                                    <Chip
                                        component="span"
                                        sx={{ width : 'fit-content', borderRadius : 3}}
                                        icon={<Public />} 
                                        label={person.place_of_birth || 'Unknown'}
                                    />
                                    <Chip 
                                        component="span"
                                        sx={{ width : 'fit-content', borderRadius : 3}}
                                        icon={<Groups3 />}
                                        label={person.known_for_department || 'Unknown'}
                                    />
                                    
                                </Box>
                            </Box>
                            <Typography variant='subtitle1' fontWeight='bold'>
                                Biography
                            </Typography>
                            <Box>

                            </Box>
                        </>

                    ):(
                        <Box display="flex" flexDirection="row" >
                            <Skeleton variant='rounded' width="10rem" height="15rem"/>
                            <Box display="flex" flexDirection="column" minWidth="15rem" rowGap={1}
                                sx={{ mx : 2}}>
                                <Skeleton variant='text' width="100%" height="3rem" />
                                <Skeleton variant='rounded' width="70%" height="1rem" />
                                <Skeleton variant='rounded' width="70%" height="1rem" />
                                <Skeleton variant='rounded' width="70%" height="1rem" />
                            </Box>
                        </Box>
                    )}
                        

            </DialogContent>
            <DialogActions>
                <Button onClick={()=>onClickClose()}>
                    Close
                </Button>
            </DialogActions>
        </>
    )
}