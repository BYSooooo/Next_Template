import React from 'react';


import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';

import { useAppSelector } from '@/redux/hook';
import Box from '@mui/material/Box';
import TopHeader from './top/TopHeader';
import TopIcon from './top/TopIcon';


export default function DetailTop() {
    const movieDetail : MovieDetail[] = useAppSelector((state)=> state.movieDetail)
    const [detail, setDetail] = React.useState<MovieDetail>(null)
    React.useEffect(()=> {
        setDetail(movieDetail[0])
        console.log(detail)
    },[movieDetail])
    
    return (
        <Paper elevation={3} sx={{borderRadius : "0.5rem", p : 1}}>
            <Grid container wrap='nowrap' direction='row' >
                {detail ? (
                    <Stack direction='row' width="100%">
                        <img style={{ width : 300, height : 450, borderRadius : '0.5rem'}}
                            loading='lazy' 
                            src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
                            alt='loading...'/>
                        <Grid container direction='column' sx={{marginInline : 2}} width="70%" rowGap={3}>
                            <TopIcon detail={detail} />
                            <TopHeader detail={detail}/>
                            <Grid>
                                <Box sx={{ backgroundColor : "ghostwhite", borderRadius : "0.5rem", p: 1}} >
                                    <Stack direction='column'>
                                        <Typography variant='subtitle1' sx={{color : "gray"}} >
                                            Overview
                                        </Typography>
                                        
                                        <Grid>
                                            <Typography variant='caption'>
                                                {detail.overview}
                                            </Typography>
                                        </Grid>

                                    </Stack>
                                </Box>
                            </Grid>
                            
                                
                            <Grid container direction='row' columnGap={2}>
                                <Grid md={3.5}>
                                    <Box sx={{ backgroundColor : "ghostwhite", borderRadius : "0.5rem", p: 1}}>
                                        <Typography variant='subtitle1' sx={{color : "gray"}}>
                                            Genre
                                        </Typography>
                                        <Grid container direction='row' columnGap={1}>
                                            {detail.genres.map((item)=> {
                                                return (
                                                    <Typography variant='caption'>
                                                        {item.name}
                                                    </Typography>
                                                )
                                            })}
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid md={3.5}>
                                    <Box sx={{ backgroundColor : "ghostwhite", borderRadius : "0.5rem", p: 1}}>
                                        <Typography fontSize='subtitle1' sx={{color : "gray"}}>
                                            Production
                                        </Typography>
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