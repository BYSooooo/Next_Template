"use client"
import React from 'react';

import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import MainSearch from '../components/main/MainSearch';
import Grid from '@mui/material/Grid';

import { useAppSelector } from '@/redux/hook';

export default function SearchMain() {
    const searchResult:SearchMovie[]  = useAppSelector((state) => state.searchResult);
    const resultCount = React.useRef(0)
    const [pageRange, setPageRange] = React.useState<{current : number, amount : number}>({current : 1, amount : 1});

    React.useEffect(()=> {
        if(searchResult && searchResult[0]) {
            resultCount.current = searchResult[0].total_results
            setPageRange({current : searchResult[0].page, amount : searchResult[0].total_pages})
        }
    },[searchResult])

    return (
        <Container sx={{mt : "5rem", maxWidth : "80vw"}}>
            <MainSearch />
            <Grid container direction='row' sx={{ background : 'skyblue', borderRadius : "1rem", m : 1, p: 1}} columnGap={1}>
                <Box sx={{background : 'white', border : '1px solid white', borderRadius : "0.5rem", p: 0.5}}>
                    <Typography variant='body2'>
                        Result : {resultCount.current}
                    </Typography>
                </Box>
                <Box sx={{background : 'white', border : '1px solid white', borderRadius : "0.5rem", p: 0.5}}>
                    <Typography variant='body2'>
                        Page : { `${pageRange.current} - ${pageRange.amount}`}
                    </Typography>
                </Box>
            </Grid>
        </Container>
    )
}