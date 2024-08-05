"use client"

import React from 'react';
import { Box, Container, Typography } from "@mui/material"
import { getDetail } from "../../../components/fetchData"

export default function DetailPage({params} : {params : {id : string}}) {
    const [detail, setDetail] = React.useState<MovieDetail>()
    React.useEffect(()=> {
        getDetail(params.id).then((result)=> setDetail(result))
        console.log(detail)
    },[])
    
    return (
        <Container 
            fixed
            sx={{
                minWidth : 1024,
                height : '100vh',
                mt : '7rem',
                textAlign : 'center'}}>
            <Box 
                width="50%"
                height="10rem"
                sx={{
                    background : 'red',
                    
                }}
                >
                    <Typography>
                        {detail && detail.imdb_id}
                        {detail && detail.popularity}
                    </Typography>
            </Box>
        </Container>
    )
}