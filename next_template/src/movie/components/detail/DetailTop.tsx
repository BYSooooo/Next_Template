import React from 'react';


import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import { useAppSelector } from '@/redux/hook';

export default function DetailTop() {
    const movieDetail : MovieDetail[] = useAppSelector((state)=> state.movieDetail)
    const [detail, setDetail] = React.useState<MovieDetail>(null)
    React.useEffect(()=> {
        setDetail(movieDetail[0])
        console.log(detail)
    },[movieDetail])
    
    return (
        <Grid container wrap='nowrap' direction='row' sx={{border : '1px solid gray', borderRadius : "0.5rem"}}>
            {detail ? (
                <Stack direction='row' sx={{ m : 1}}>
                     <img style={{ width : 106, height : 170}}
                        loading='lazy' 
                        src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
                        alt='loading...'/>
                    <Grid container direction='column' sx={{m : 1}}>
                        <Typography variant='h4' fontWeight='bold' >
                            {detail.original_title}
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
        
    )
}