import React from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { getDetail } from '../components/FetchData';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { usePathname } from 'next/navigation';
import { setDetailInfo } from '@/redux/features/movieReducer';

import DetailTop from '../components/detail/DetailTop';
import DetailMiddle from '../components/detail/DetailMiddle';


export default function DetailMain() {
    //const movieDetail : MovieDetail[] = useAppSelector((state)=> state.movieDetail)
    const dispatch = useAppDispatch()
    const pathArray = usePathname().split('/');
    const movieId = pathArray[pathArray.length - 1]
    
    React.useEffect(()=> {
        fetchDetailFn(movieId)
    },[])

    const fetchDetailFn = async (id : string)=> {
        console.log('Fetch Movie Detail Info')
        try {
            await getDetail(id).then((results: MovieDetail)=> {
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
            <Grid xs={12} sx={{width : "100%"}}>
                <DetailMiddle />
            </Grid>
                <h4>
                    Bottom : collection (other movie link), imdb
                </h4>
        </Container>
    )
    
}