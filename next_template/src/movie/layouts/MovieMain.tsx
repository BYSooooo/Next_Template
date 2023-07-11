"use client"

import * as React from 'react';
import { Button, Container, Stack, Typography } from "@mui/material";
import { getGenre, getPopular } from '../components/FetchData';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import MovieCard from './MovieCard';
import { setGenreList, setPopularList } from '@/redux/features/movieReducer';
import MainSearch from './MainSearch';
import Grid from '@mui/material/Unstable_Grid2';


export default function MovieMain() {
    const popular : Array<any> = useAppSelector((state) => state.moviePopular);
    const dispatch = useAppDispatch();

    React.useEffect(()=> {
        //get Popular Movie List 20
        getPopular().then((lists) => {
            dispatch(setPopularList(lists))
        })

        // get Movie Genres List
        getGenre().then((genres) => {
            dispatch(setGenreList(genres))
        })
    },[])

    //console.log("popular : ",popular)
    //console.log("genre : ", genreList)

    return (
        <Container maxWidth="lg" sx={{mt : "5rem", maxWidth : "80vw"}}>
           <Grid container direction='column' alignItems='center'>
                <div>
                    <Grid xs={12} container sx={{mb : 3, mt: 5}}>
                        <Typography variant='h5' component="h1" gutterBottom={true} sx={{fontSize : '4rem', fontWeight: 'bold'}} >
                            What's your Movie?
                        </Typography>
                    </Grid>    
                </div>
                <Grid xs={12} sx={{mb : 1}} >
                    <MainSearch />
                </Grid>
                <div>
                    <Grid xs={12} sx={{mb : '15vh'}} container direction='row' alignItems='center'>
                        <Typography sx={{color : 'blueviolet'}}>
                            Selected : 
                        </Typography>
                        <Button>
                            Hello
                        </Button>
                    </Grid>
                </div>
                
                <Grid xs={12} container sx={{mb : 1}}>
                    <Typography variant='h5'>
                        Popular Movie List in 20
                    </Typography>
                </Grid>
                <Grid xs={12}>
                    <Stack spacing={{ xs : 1}} direction="row" sx={{ overflow : "auto"}}>
                        {popular.map((item:movieInfo) => {
                            return (
                                <MovieCard key={item.id} id={item.id} movie={item} genre={item.genre_ids}/>
                            )
                        })}
                    </Stack>
                </Grid>
           </Grid>
        </Container>
    
    )
}