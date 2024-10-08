"use client"

import React from 'react';
import { Container, Typography } from "@mui/material";
import { getSearchResult } from "../../../components/fetchData";

export default  function SearchPage({params} : { params : {keyword : string}}) {
    
    React.useEffect(()=> {
        getSearchResult(params.keyword)
            .then((result)=> {
                console.log(result)
            })

    },[])


    return (
        <Container fixed
            sx={{
                minWidth : 1024,
                height : '100vh',
                mt : '7rem',
                textAlign : 'center'}}>
            <Typography>
                {params.keyword}
            </Typography>
        </Container>
    )
    
}