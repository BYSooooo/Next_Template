"use client"

import React from 'react';
import { Box, Container, Typography } from "@mui/material";
import { getSearchResult } from "../../../components/fetchData";
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setSearchResult } from '../../../redux/features';

export default  function SearchPage({params} : { params : {keyword : string}}) {
    const dispatch = useAppDispatch();
    const themeYn = useAppSelector((state)=> state.themeReducer);
    const searchReducer  = useAppSelector((state)=> state.searchReducer);

    React.useEffect(()=> {
        getSearchResult(`&query=${params.keyword}`)
            .then((result : SearchResult[])=> {
                dispatch(setSearchResult(result))
            })

    },[])


    return (
        <Container fixed
            sx={{
                minWidth : 1024,
                height : '100vh',
                mt : '5rem',
                alignItems: 'center'}}>
                <Box textAlign='start'>
                    <Typography variant='h5' fontWeight='bold'>
                        Keyword : {params.keyword}
                    </Typography>
                    {searchReducer.length}
                </Box>
        </Container>
    )
    
}