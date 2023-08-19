import React from 'react';


import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import { useAppSelector } from '@/redux/hook';


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
                    <Stack direction='row' sx={{ m : 1}}>
                        <img style={{ width : 106, height : 170}}
                            loading='lazy' 
                            src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
                            alt='loading...'/>
                        <Grid container direction='column' sx={{m : 1}}>
                            <Typography variant='h4' fontWeight='bold' >
                                {`${detail.original_title} (${detail.release_date.slice(0,4)})`} 
                            </Typography>
                            <Typography variant='subtitle1' color='gray'>
                                {detail.tagline}
                            </Typography>    
                        </Grid>
                    </Stack>              
                ) : (
                    <Stack direction='row' width='100%'>
                        <Skeleton variant='rectangular' width={106} height={170} />
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