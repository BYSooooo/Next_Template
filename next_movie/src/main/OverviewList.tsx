"use client"

import { 
    Box, 
    ImageList, 
    ImageListItem, 
    Skeleton, 
    Typography 
} from '@mui/material';
import React from 'react';
import { getPopular, getTopRate, getUpcoming } from '../components/fetchData';
import { useAppDispatch } from '../redux/hooks';
import { controlDialog } from '../redux/features';

export default function OverviewList({sort}:{sort : "popular"|"topRate"|"upcomming"}) {
    const [list, setList] = React.useState<MovieOverview[]>([]);
    const dispatch = useAppDispatch()

    React.useEffect(()=> {
        switch(sort) {
            case "popular" : 
                getPopular().then((result)=> setList(result) )
                break;
            case "topRate" : 
                getTopRate().then((result)=> setList(result) )
                break;
            case "upcomming" : 
                getUpcoming().then((result)=> setList(result) )
                break;
        }
    },[])

    const onClick = (overviewInfo : MovieOverview)=> {
        dispatch(controlDialog({
            openYn : true, 
            name : "Overview",
            extraInfo : overviewInfo
        }))
    }

    const titleText = ()=> {
        switch(sort) {
            case "popular" :
                return 'Popular List'
            case "topRate" : 
                return 'Top Rate List'
            case "upcomming" :
                return 'Upcoming List'
        }        
    }
    return (
        <Box textAlign={'start'} >
            <Typography 
                variant='h6'
                fontWeight='bold' 
                sx={{ textDecoration : 'underline'}}
                display={'inline'}>
                {titleText()}
            </Typography>
            <Box 
                width="100%"
                overflow={'scroll'}>
                <Box width={'300%'}>
                    <ImageList cols={20}>
                        {list.length > 0 && list.map((movie)=> {
                            return (movie 
                                    ? <ImageListItem 
                                        sx={{
                                            width : 130,
                                            borderRadius : 4,
                                            display : 'inline-flex',
                                            overflow : 'hidden',
                                            ":hover" : {
                                                cursor : 'pointer',
                                                opacity : "0.8"
                                            }}}
                                        key={movie.id}
                                        >
                                        <img 
                                            onClick={()=> onClick(movie)}
                                            aria-haspopup="true"
                                            alt={movie.original_title}
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                        />
                                    </ImageListItem>
                                    : <Skeleton variant='rectangular'/>
                                ) 
                        })}
                    </ImageList>
                </Box>
            </Box>
        </Box>
    )
}