"use client"

import React from 'react';
import { Box, Container, Skeleton, Typography } from "@mui/material"
import { getDetail } from "../../../components/fetchData"
import DetailPoster from '../../../detail/DetailPoster';
import { useAppSelector } from '../../../redux/hooks';

export default function DetailPage({params} : {params : {id : string}}) {
    const [detail, setDetail] = React.useState<MovieDetail>()
    const themeYn = useAppSelector((state)=> state.themeReducer);

    React.useEffect(()=> {
        getDetail(params.id).then((result)=> setDetail(result))
        console.log(detail)
    },[])
    
    return (
        <Container fixed
            sx={{
                minWidth : 1024,
                height : '100vh',
                mt : '7rem',
                textAlign : 'center'}}>
                <Box 
                    textAlign={'start'}
                    width={"100%"}>
                    <Typography
                        fontWeight='bold' 
                        variant='h2'>
                        {detail ? detail.title : <Skeleton variant='text' width={'50%'}/>}
                    </Typography>
                    <Typography
                        variant='h6'
                        sx={{ fontStyle : 'italic' }}>
                        {detail ? detail.tagline : <Skeleton variant='text' width={'50%'}/>}
                    </Typography>
                </Box>
                <DetailPoster 
                    theme={themeYn.theme}
                    path={detail && detail.poster_path}/>
        </Container>
    )
}