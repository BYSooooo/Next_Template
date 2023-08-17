import React from 'react';

import Stack from '@mui/material/Stack';
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
        <Stack direction='row' sx={{ width : "100%", height : "10rem"}}>
            {detail ? <img
                loading='lazy' 
                src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
                alt='loading...'/>
            : <Skeleton variant='rectangular' animation='pulse' width={106} height={170} />}
            <Typography variant='h3' fontWeight='bold'>
                { detail ? detail.original_title : '...loading'}
            </Typography>
        </Stack>
        
    )
}