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
import TopBody from './top/TopBody';
import CircularProgress from '@mui/material/CircularProgress';


export default function DetailTop() {
    const movieDetail : MovieDetail[] = useAppSelector((state)=> state.movieDetail)
    const [detail, setDetail] = React.useState<MovieDetail>(null)
    const [themeMode, setThemeMode] = React.useState('')
    React.useEffect(()=> {
        setDetail(movieDetail[0])
    },[movieDetail])

    window.addEventListener('stroage',()=> {
        setThemeMode(window.localStorage.getItem('mode'))
    })
    
    return (
        <Paper elevation={3} sx={{borderRadius : "0.5rem", p : 1}}>
            { detail 
            ? 
                <Grid container wrap='nowrap' direction='row' >
                    <Stack direction='row' width="100%">
                        <img style={{ width : 300, height : 450, borderRadius : '0.5rem'}}
                            loading='lazy' 
                            src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
                            alt='loading...'/>
                        <Grid container direction='column' sx={{marginInline : 2}} width="70%" rowGap={3}>
                            <TopIcon detail={detail} mode={themeMode}/>
                            <TopHeader detail={detail} />
                            <TopBody detail={detail} mode={themeMode}/>
                        </Grid>
                    </Stack> 
                </Grid>
            :
                <Grid container wrap='nowrap' direction='row' >
                    <Stack direction='row' width="100%">
                        <Skeleton variant='rectangular' animation='wave' sx={{ width : 300, height : 450}} />
                        <Grid container direction='column' sx={{marginInline : 2}} width="70%" rowGap={3}>
                            <Skeleton variant='text' animation='wave' sx={{ fontSize : 'h3'}}/>
                            <Skeleton variant='text' animation='wave' sx={{ fontSize : 'body1'}}/>
                            <Skeleton variant='rectangular' animation='wave' sx={{ width : 'auto', height : '20rem'}}/>
                        </Grid>
                    </Stack>
                </Grid>
            }
            
        </Paper>
        
        
    )
}