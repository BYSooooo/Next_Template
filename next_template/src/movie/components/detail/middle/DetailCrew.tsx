import React from 'react';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import { useAppDispatch } from '@/redux/hook';
import { openDetailModal } from '@/redux/features/movieReducer';
import { Link } from '@mui/material';


export default function DetailCrew({credit, movieId} : {credit : CreditInfo, movieId : number}) {
    const dispatch = useAppDispatch()
    const [cast, setCast] = React.useState<CastInfo[]>([]);

    React.useEffect(()=> {
        setCastByPopularity()
    },[credit])

    const setCastByPopularity = () => {
        const castArray = credit.cast.slice().sort((a,b) => b.popularity - a.popularity)
        const array = castArray.slice(0,10);
        setCast(array)
    }

    const onClick = (castId : number)=> {
        dispatch(openDetailModal({name : "Cast", value : castId}))
    }
    
    return (
        <Paper elevation={3} sx={{borderRadius : "0.5rem", height : 'auto', mt : 1}}>
            <Stack direction='column' sx={{ p : 1}}>
                <Stack direction='row' spacing={2} alignItems='center'>
                    <Typography variant='h6' fontWeight='bold'>
                        Top Rate Cast 10
                    </Typography>
                    <Link variant='subtitle1' >
                        More
                    </Link>
                </Stack>
                <Stack direction='row' overflow='scroll' width="100%" spacing={2}>
                    {cast.map((item)=> {
                        return (
                            <Card key={item.id} sx={{ minWidth : 150 }}>
                                <CardActionArea onClick={()=>onClick(item.id)}>
                                    <Box sx={{position : 'relative'}}>
                                        <CardMedia component='img' alt='Cast Image' image={`https://image.tmdb.org/t/p/w185${item.profile_path}`} height="225"/>
                                        <Box overflow='-moz-hidden-unscrollable'
                                            sx={{
                                                position : 'absolute',
                                                bottom : 0,
                                                left : 0,
                                                width : '100%',
                                                bgcolor : 'rgba(0, 0, 0, 0.54)',
                                                color : 'white',
                                                padding : '3px'
                                            }}>
                                            <Typography noWrap component='div' variant='caption'> 
                                                {item.name}
                                            </Typography>
                                            <Typography noWrap component='div' variant='caption' sx={{color : 'silver' }}> 
                                                {item.character}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardActionArea>
                            </Card>
                        )
                    })}
                </Stack>
            </Stack>
        </Paper>
    )
}