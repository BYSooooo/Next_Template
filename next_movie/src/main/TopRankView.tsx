"use client"

import React from 'react';
import { Box, Divider, Skeleton, Typography } from '@mui/material';
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

    const DetailBox = ({title,value} : {title : string, value : string})=> {
        return (
            <Box sx={{
                width : 'fit-content'
            }}>
                <Typography 
                    variant='subtitle2'
                    sx={{ color : themeYn.theme ? grey[500]: grey [700] }}>
                    {title}
                </Typography>
                <Divider />
                <Typography
                    fontWeight='bold'>
                    {value}
                </Typography>
            </Box>   
        )
    };

    return (
        <Box 
            textAlign={'start'} 
            flexDirection={'row'}
            sx={{
                my : 5,
                p : 2,
                width : "100%",
                height : "fit-content", 
                borderRadius : 3,
                bgcolor : themeYn.theme ? grey[900] : grey[100]
                }}>
            <Typography variant='h5' fontWeight={'bold'}>
                <Star sx={{color : yellow[600]}}/>
                Most Popular
            </Typography>
            {topMovie 
                ? 
                    <Box 
                        sx={{ 
                            display : 'inline-flex', 
                            borderRadius : 4, 
                            p : 1,
                            flexDirection : 'row'}}>
                        <img
                            style={{
                                borderRadius : 4,
                                height : "35vh"
                            }} 
                            alt={topMovie.original_title}
                            src={`https://image.tmdb.org/t/p/w500${topMovie.poster_path}`} 
                        />
                        <Box sx={{ px : 2, display : 'inline-block'}}>
                            <Typography variant='h3' fontWeight='bold'>
                                {topMovie.title}
                            </Typography>
                            <Box 
                                flexDirection={'row'}
                                sx={{ py : 2, width : '100%'}}>
                                <DetailBox title='Release Date' value={topMovie.release_date}/>
                                <DetailBox title='Original Language' value={topMovie.original_language} />
                                <DetailBox title='Genre' value={topMovie.genre /></DetailBox>
                            </Box>
                            <Box 
                                sx={{ 
                                    background : themeYn.theme ? grey[800] : grey[200],
                                    p : 1,
                                    borderRadius : 3,
                                    display : 'inline-block'

                                }}>
                                <Typography 
                                    variant='subtitle2'
                                    noWrap={false}>
                                    {topMovie.overview}
                                </Typography>
                            </Box>
                        </Box>
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
