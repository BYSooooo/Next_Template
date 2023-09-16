import React from 'react';

import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import MainSearch from '../components/main/MainSearch';
import Grid from '@mui/material/Grid';

import { useAppSelector } from '@/redux/hook';
import SearchList from '../components/search/SearchList';
import Paper from '@mui/material/Paper';

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
            <Paper elevation={3} sx={{ p : 1, mt : 2, mb : 2, marginInline : 3}}>
                <Typography variant='body1'>
                    Result : {loadedResult} / {resultCount.current}
                </Typography>
            </Paper>
            <SearchList />
        </Container>
    )
}