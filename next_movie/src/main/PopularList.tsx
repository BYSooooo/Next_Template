"use client"

import { 
    Box, 
    ImageList, 
    ImageListItem, 
    Typography 
} from '@mui/material';
import React from 'react';
import { getPopular } from '../components/fetchData';

export default function PopularList() {
    const [list, setList] = React.useState<moviePopular[]>([]);
    React.useEffect(()=> {
        getPopular().then((result)=> setList(result))
    },[])
    
    return (
        <Box textAlign={'start'} >
            <Typography 
                variant='h6'
                fontWeight='bold' 
                sx={{ textDecoration : 'underline'}}
                display={'inline'}>
                Popular List
            </Typography>
            <Box 
                width="100%"
                overflow={'scroll'}>
                <Box width={'300%'}>
                    <ImageList cols={20} gap={10}>
                        {list.length > 0 && list.map((movie)=> {
                            return (
                                <ImageListItem 
                                    sx={{
                                        borderRadius : 4,
                                        display : 'inline-block',
                                        overflow : 'hidden',
                                        ":hover" : {
                                            cursor : 'pointer',
                                        }}}
                                    key={movie.id}
                                    >
                                    <img 
                                        onClick={(e)=> alert(`Clicked : ${movie.id}`)}
                                        aria-haspopup="true"
                                        alt={movie.original_title}
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                    />
                                </ImageListItem>
                            ) 
                        })}
                    </ImageList>
                </Box>
            </Box>
        </Box>
        
            
            
        

        
    )
}