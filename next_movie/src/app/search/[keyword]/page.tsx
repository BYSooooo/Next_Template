"use client"

import React from 'react';
import { Box, Container, Typography } from "@mui/material";
import { getSearchResult } from "../../../components/fetchData";

export default  function SearchPage({params} : { params : {keyword : string}}) {
    const [resultList, setResultList] = React.useState<SearchResult>()
    
    React.useEffect(()=> {
        getSearchResult(`&query=${params.keyword}`)
            .then((result)=> {
                setResultList(result)
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

                </Box>
        </Container>
    )
    
}