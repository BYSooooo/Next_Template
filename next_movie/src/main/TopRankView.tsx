"use client"

import React from 'react';
import { Box, Skeleton, Typography } from '@mui/material';
import { useAppSelector } from '../redux/hooks';
import { grey, yellow } from '@mui/material/colors';
import { Star } from '@mui/icons-material';
import { getPopular } from '../components/fetchData';

export default function TopRankView() {
    const themeYn = useAppSelector((state)=> state.themeReducer);
    const [topMovie, setTopMovie] = React.useState<movieOverview>();
    React.useEffect(()=> {
        getPopular().then((result)=> setTopMovie(result[0]))
    },[])

    return (
        <Box 
            textAlign={'start'} 
            flexDirection={'row'}
            sx={{
                p : 2,
                width : "100%",
                height : "30vw", 
                borderRadius : 3,
                bgcolor : themeYn.theme ? grey[900] : grey[200]
                }}>
            <Typography variant='h5' fontWeight={'bold'}>
                <Star sx={{color : yellow[600]}}/>
                Most Popular
            </Typography>
            {topMovie 
                ? 
                    <Box sx={{ display : 'flex', borderRadius : 4, p : 1}}>
                        <img
                            style={{
                                borderRadius : 4,
                                height : "23vw"
                            }} 
                            alt={topMovie.original_title}
                            src={`https://image.tmdb.org/t/p/w500${topMovie.poster_path}`} 
                        />
                    </Box>
                : <Skeleton 
                    animation="wave"
                    variant="rounded" 
                    sx={{ height : "23vw" }}/> 
            }
            
            {/* <Typography variant='h5'>
                {detail.title}
            </Typography> */}
        </Box>    
    )
}