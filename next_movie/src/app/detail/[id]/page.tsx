"use client"

import React from 'react';
import { Box, Container, Skeleton, Typography } from "@mui/material"
import { getDetail } from "../../../components/fetchData"
import DetailPoster from '../../../detail/DetailPoster';
import { useAppSelector } from '../../../redux/hooks';
import DetailInfo from '../../../detail/DetailInfo';
import DetailOverview from '../../../detail/DetailOverview';
import DetailCredit from '../../../detail/DetailCredit';
import DetailMedia from '../../../detail/DetailMedia';
import DetailCompany from '../../../detail/DeetailCompany';

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
                <Box 
                    display="flex" 
                    flexDirection="row"
                    sx={{ mb : 2 }}>
                    <DetailPoster 
                        theme={themeYn.theme}
                        path={detail && detail.poster_path}/>
                    <DetailInfo 
                        theme={themeYn.theme}
                        path={detail}/>
                </Box>
                <DetailOverview theme={themeYn.theme} path={detail && detail.overview}/>
                <DetailCredit theme={themeYn.theme} path={detail && detail.credits} sort="Cast"/>
                <DetailMedia theme={themeYn.theme} path={detail && detail} />
                <DetailCompany theme={themeYn.theme} path={detail && detail} />
        </Container>
    )
}