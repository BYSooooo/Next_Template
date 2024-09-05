"use client";

import React from 'react';
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { getPerson } from '../../../components/fetchData';
import { Box, Button, Chip, DialogActions, DialogContent, DialogTitle, ImageList, ImageListItem, Skeleton, Tab, Tabs, Typography } from '@mui/material';
import { controlDialog } from '../../../redux/features';
import { CalendarMonth, Groups3, Movie, Public } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

export default function CastInfo({theme} : {theme : boolean}) {
    const [person, setPerson] = React.useState<PersonInfo>()
    const [index, setIndex] = React.useState(0);
    const staffId = useAppSelector((state)=> state.dialogReducer.extraInfo)
    const dispatch = useAppDispatch();
    React.useEffect(()=> {
        getPerson(staffId).then((result)=> setPerson(result))
    },[])
    

    const onClickClose =()=> {
        dispatch(controlDialog({ openYn : false, name : ""}))
    };

    const TabPanel =(props : {children? : React.ReactNode, index: number, value : number})=> {
        const { children, value, index, ...other} = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-panel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}>
                { value === index && <Box>{children}</Box>}
            </div>
        )
    }

    const handleChange = (event : React.SyntheticEvent, newValue : number)=> {
        setIndex(newValue)
    }

    const tabStyle: React.CSSProperties = {
        borderRadius : 5,
        fontSize : '0.8rem',
        width : '50%'        
    }

    const castList = ()=> {
        return (
            <Box width="100%" display="flex" flexDirection="row">
                <Box width="100%" overflow="scroll" display="flex">
                    <ImageList cols={10} >
                        {person.combined_credits.cast.map((item,idx)=> {
                            return (
                                idx < 10 && 
                                <ImageListItem
                                    sx={{
                                        width : 60,
                                        borderRadius : 4,
                                        overflow : 'hidden',
                                        display : 'inline-flex',
                                        mx : 0.5,
                                        ":hover" : {
                                            cursor : 'pointer'
                                        }
                                    }}>
                                    {item.poster_path 
                                    ? (
                                        <img
                                            aria-haspopup="true"
                                            src={`https://image.tmdb.org/t/p/w780${item.poster_path}`} 
                                        />

                                    ):(
                                        <Box 
                                            height="100%"
                                            display="flex" 
                                            flexDirection='column'
                                            justifyContent="center" 
                                            alignItems='center'>
                                            <Movie />
                                            <Typography variant='caption'>
                                                {item.title}
                                            </Typography>
                                        </Box>
                                    )}
                                </ImageListItem>
                            )
                        })}
                    </ImageList>
                </Box>
            </Box>
        )
    }

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
                                    style={{ borderRadius : 5, width : "8rem"}}
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
                            <Box
                                borderRadius={3}
                                width="100%"
                                height="6rem"
                                overflow={"scroll"}
                                bgcolor={theme ? grey[700] : grey[300]}
                                p={2}>
                                {person.biography.length > 0 ? person.biography : 'No Data'}
                            </Box>
                            <Tabs value={index} onChange={handleChange}>
                                <Tab style={tabStyle} label="Cast (Recent 10)" value={0} />
                                <Tab style={tabStyle} label="Crew (Recent 10)" value={1} />
                            </Tabs>
                            <Box>
                                <TabPanel value={index} index={0}>
                                    <Box display="flex" flexDirection="row">
                                        {castList()}
                                    </Box>  
                                </TabPanel>
                                <TabPanel value={index} index={1}>
                                    <Box display="flex" flexDirection="row">

                                    </Box>
                                </TabPanel>
                                
                            </Box>
                        </>

                    ):(
                        <>
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
                            <Skeleton variant='rounded' width="100%" height="6rem" sx={{ mt : 2}}/>
                        </>
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