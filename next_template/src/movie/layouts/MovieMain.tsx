import * as React from 'react';
import { Container, Typography } from "@mui/material";
import { getGenre, getPopular } from '../components/FetchData';
import { useAppDispatch} from '@/redux/hook';
import { setPopularList } from '@/redux/features/movieReducer';
import MainSearch from '../components/main/MainSearch';
import Grid from '@mui/material/Unstable_Grid2';
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
            console.log(genres)
            window.sessionStorage.setItem('genres',JSON.stringify(genres))
        })
    },[])


    return (
        <Container maxWidth="lg" sx={{maxWidth : "80vw", mt : 5}}>
           <Grid container direction='column' alignItems='center'>
                <div>
                    <Grid xs={12} container sx={{mb : 3, mt: 5}}>
                        <Typography variant='h5' component="h1" gutterBottom={true} sx={{fontSize : '4rem', fontWeight: 'bold'}} >
                            What&apos;s your Movie?
                        </Typography>
                    </Grid>    
                </div>
                <Grid xs={12} sx={{mb : 1}} >
                    <MainSearch />
                </Grid>
                <div>
                    <Grid xs={12} sx={{mb : '15vh'}} container direction='row' alignItems='center'>
                        
                    </Grid>
                </div>
                
                <Grid xs={12} container sx={{mb : 1}}>
                    <Typography variant='h5' fontWeight='bold'>
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