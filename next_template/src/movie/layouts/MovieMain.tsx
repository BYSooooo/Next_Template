"use client"

import * as React from 'react';
import { Container, Typography } from "@mui/material";
import { getGenre, getPopular } from '../components/FetchData';
import { useAppDispatch} from '@/redux/hook';
import { setGenreList, setPopularList } from '@/redux/features/movieReducer';
import MainSearch from '../components/main/MainSearch';
import Grid from '@mui/material/Unstable_Grid2';
import GenreBtn from '../components/GenreBtn';
import PopularList from '../components/main/PopularList';


export default function MovieMain() {
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


    return (
        <Container maxWidth="lg" sx={{mt : "5rem", maxWidth : "80vw" }}>
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
                        <GenreBtn />
                    </Grid>
                </div>
                
                <Grid xs={12} container sx={{mb : 1}}>
                    <Typography variant='h5'>
                        Popular Movie List in 20
                    </Typography>
                </Grid>
                <Grid xs={12}>
                    <PopularList />
                </Grid>
           </Grid>
        </Container>
    
    )
}