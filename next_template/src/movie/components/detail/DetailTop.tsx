import React from 'react';


import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';

import { useAppSelector } from '@/redux/hook';
import Homepage from './top/Hompage';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';


export default function DetailTop() {
    const movieDetail : MovieDetail[] = useAppSelector((state)=> state.movieDetail)
    const [detail, setDetail] = React.useState<MovieDetail>(null)
    React.useEffect(()=> {
        setDetail(movieDetail[0])
        console.log(detail)
    },[movieDetail])
    

    return (
        <Paper elevation={3} sx={{borderRadius : "0.5rem"}}>
            <Grid container wrap='nowrap' direction='row' >
                {detail ? (
                    <Stack direction='row' sx={{ m : 1}} width="100%">
                        <img style={{ width : "30%", height : "auto", borderRadius : '0.5rem', minWidth : 250}}
                            loading='lazy' 
                            src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
                            alt='loading...'/>
                        <Grid container direction='column' sx={{m : 1}} width="70%" rowGap={3}>
                            <Homepage url={detail.homepage} />
                                <Grid>
                                    <Typography variant='h4' fontWeight='bold' >
                                        {`${detail.original_title} (${detail.release_date.slice(0,4)})`} 
                                    </Typography>        
                                    <Typography variant='subtitle1' color='gray'>
                                        {detail.tagline}
                                    </Typography>        
                                </Grid>
                                <Grid>
                                    <Box sx={{ backgroundColor : "ghostwhite", borderRadius : "0.5rem", p: 1}}>
                                        <Stack direction='column'>
                                            <Typography fontSize='subtitme1' sx={{color : "gray"}} >
                                                Overview
                                            </Typography>
                                            <Divider sx={{ width : "20%"}}/>
                                            <Typography>
                                                {detail.overview}
                                            </Typography>

                                        </Stack>
                                    </Box>
                                </Grid>
                            
                                
                                <Grid container direction='row' columnGap={2}>
                                    <Grid md={3.5}>
                                        <Box sx={{ backgroundColor : "ghostwhite", borderRadius : "0.5rem", p: 1}}>
                                            <Typography fontSize='subtitle1' sx={{color : "gray"}}>
                                                Genre
                                            </Typography>
                                            <Divider sx={{width : '60%'}}/>
                                            
                                        </Box>
                                    </Grid>
                                    <Grid md={3.5}>
                                        <Box sx={{ backgroundColor : "ghostwhite", borderRadius : "0.5rem", p: 1}}>
                                            <Typography fontSize='subtitle1' sx={{color : "gray"}}>
                                                Production
                                            </Typography>
                                            <Divider sx={{ width : '60%'}}/>
                                            <Typography>
                                                Production name
                                            </Typography>
                                        </Box>
                    
                                    </Grid>   
                                </Grid>
                                
                            
                        </Grid>
                    </Stack>              
                ) : (
                    <Stack direction='row' width='100%'>
                        <Skeleton variant='rectangular' width="30%" height="auto" />
                        <Grid direction='column' sx={{m : 1}}>
                            <Typography variant='h4' width='15rem'>
                                <Skeleton />
                            </Typography>
                            <Typography variant='subtitle1'>
                                <Skeleton />
                            </Typography>
                        </Grid>
                    </Stack>
                )}
                
            </Grid>
        </Paper>
        
        
    )
}