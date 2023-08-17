import React from 'react';

import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import MainSearch from '../components/main/MainSearch';
import Grid from '@mui/material/Grid';

import { useAppSelector } from '@/redux/hook';
import SearchList from '../components/search/SearchList';

export default function SearchMain() {
    const searchResult:SearchMovie[]  = useAppSelector((state) => state.searchResult);
    const resultCount = React.useRef(0)
    const [loadedResult, setLoadedResult] = React.useState(0);
    React.useEffect(()=> {
        if(searchResult && searchResult[0]) {
            resultCount.current = searchResult[0].total_results
            setLoadedResult(()=> loadedMovieCount())
        }
    },[searchResult])
    
    const loadedMovieCount = () => {
        let count = 0;
        searchResult.map((page)=> {
            count += page.results.length
        })
        return count;
    }

    return (
        <Container sx={{mt : "5rem", maxWidth : "80vw"}}>
            <MainSearch />
            <Grid container direction='row' sx={{ background : 'skyblue', borderRadius : "1rem", mt :1, mb : 1, p: 1}} columnGap={1}>
                <Box sx={{background : 'white', border : '1px solid white', borderRadius : "0.5rem", p: 0.5}}>
                    <Typography variant='body2'>
                        Result : {loadedResult} / {resultCount.current}
                    </Typography>
                </Box>
            </Grid>
            <SearchList />
        </Container>
    )
}