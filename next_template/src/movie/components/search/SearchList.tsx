import React from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { useAppSelector } from '@/redux/hook';
import MovieCard from './MovieCard';


export default function SearchList() {
    const searchResult : SearchMovie[] = useAppSelector((state)=> state.searchResult);
    
    const list = (listed : SearchMovie) => {
        const temp = listed.results
        return (
            temp.map((item)=> {
                return (
                    <Grid key={item.id} >
                        <MovieCard key={item.id} movie={item} genre={item.genre_ids} />
                    </Grid>
                )
            })
        )
    }
    return (
            <Grid 
                container
                justifyContent='center' 
                direction='row' 
                spacing={1}
                sx={{height : "70vh", overflowY : "scroll" }}>
                {list(searchResult[0])}
            </Grid>
        
    )
}