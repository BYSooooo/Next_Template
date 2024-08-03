"use client"

import React from 'react';
import { Box, Button, Divider, Skeleton, Typography } from '@mui/material';
import { useAppSelector } from '../redux/hooks';
import { grey, yellow } from '@mui/material/colors';
import { Star } from '@mui/icons-material';
import { getPopular, getTopRate, getUpcoming } from '../components/fetchData';
import { useRouter } from 'next/navigation';

export default function TopRankView({sort} : {sort : "popular" | "topRate"|"upComming"}) {
    const themeYn = useAppSelector((state)=> state.themeReducer);
    const genreSlice = useAppSelector((state)=> state.genreReducer);
    const [selMovie, setSelMovie] = React.useState<movieOverview>();
    const router = useRouter();
    
    React.useEffect(()=> {
        switch(sort) {
            case "popular" : 
                getPopular().then((result)=> setSelMovie(result[0]))
                break;
            case "topRate" :
                getTopRate().then((result)=> setSelMovie(result[0])) 
                break;
            case "upComming" : 
                getUpcoming().then((result)=> setSelMovie(result[0]))
                break;
        }
    },[])

    const DetailBox = ({title,value} : {title : string, value : string})=> {
        return (
            <Box
                sx={{
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

    const getGenre = (ids: number[])=> {
        const getName = (id : number) => {
            return genreSlice.find((item)=> item.id === id).name
        }
        const result = ids.map((item)=> {
            return getName(item)
        })
        if(result.length > 4) {
            result.length = 4;
            return result.join(", ")+"...";
        } else {
            return result.join(", ")
        }
    }

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
            {selMovie 
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
                            alt={selMovie.original_title}
                            src={`https://image.tmdb.org/t/p/w500${selMovie.poster_path}`} 
                        />
                        <Box sx={{ px : 2, display : 'inline-block'}}>
                            <Typography variant='h3' fontWeight='bold'>
                                {selMovie.title}
                            </Typography>
                            <Box 
                                sx={{ 
                                    display : 'flex',
                                    py : 2, 
                                    columnGap : 3,
                                    width : '100%',
                                    flexDirection : 'row'}}>
                                <DetailBox title='Release Date' value={selMovie.release_date}/>
                                <DetailBox title='Original Language' value={selMovie.original_language} />
                                <DetailBox title='Genre' value={getGenre(selMovie.genre_ids)} />
                            </Box>
                            <Box 
                                sx={{ 
                                    background : themeYn.theme ? grey[800] : grey[200],
                                    p : 1,
                                    width : "80%",
                                    borderRadius : 3,
                                    display : 'inline-block'
                                }}>
                                <Typography 
                                    variant='subtitle2'
                                    noWrap={false}>
                                    {selMovie.overview}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                : <Skeleton 
                    animation="wave"
                    variant="rounded" 
                    sx={{ height : "35vh" }}/>
                 
            }
            <Box 
                display={'flex'}
                flexDirection={'row-reverse'}>
                <Button
                    onClick={()=>router.push(`/detail/${selMovie.id}`)}
                    variant='contained'>
                    More
                </Button>

            </Box>
            
            {/* <Typography variant='h5'>
                {detail.title}
            </Typography> */}
        </Box>    
    )
}
