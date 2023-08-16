"use client"

import React from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { getDetail } from '../components/FetchData';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { usePathname } from 'next/navigation';
import { setDetailInfo } from '@/redux/features/movieReducer';

import DetailTop from '../components/detail/DetailTop';

export default function DetailMain() {
    React.useEffect(()=> {
        fetchDetailFn(id)
    },[])

    const movieDetail : MovieDetail[] = useAppSelector((state)=> state.movieDetail)
    const dispatch = useAppDispatch()
    const pathArray = usePathname().split('/');
    const id = pathArray[pathArray.length - 1]
    console.log(id)

    const fetchDetailFn = (movieId : string)=> {
        try {
            getDetail(movieId).then((results: MovieDetail)=> {
                dispatch(setDetailInfo(results))
            })
        } catch(err) {
            console.log(err)
            throw new Error('Error in Fetch Movie Detail')
        }
    }   

    return (
        <Container maxWidth="lg" sx={{mt : "5rem", maxWidth : "80vw" }}>
            <Grid xs={12} sx={{width : "100%"}}>
                <DetailTop />
            </Grid>
                <h4>
                    Middle : hompage, company(Link), genres, vote
                </h4>
                <h4>
                    Bottom : collection (other movie link), imdb
                </h4>
        </Container>
    )
    
}