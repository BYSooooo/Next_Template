"use client"

import React from 'react';
import { Box, Container, Link, Skeleton, Typography } from "@mui/material"
import { getDetail } from "../../../components/fetchData"
import DetailPoster from '../../../detail/DetailPoster';
import { useAppSelector } from '../../../redux/hooks';
import DetailInfo from '../../../detail/DetailInfo';
import DetailOverview from '../../../detail/DetailOverview';
import DetailCredit from '../../../detail/DetailCredit';
import DetailMedia from '../../../detail/DetailMedia';
import DetailCollection from '../../../detail/DetailCollection';
import DetailCompany from '../../../detail/DetailCompany';
import DetailExternalLink from '../../../detail/DetailExternalLink';
import { useParams } from 'next/navigation';



export default function DetailPage() {
    const [detail, setDetail] = React.useState<MovieDetail>()
    const param = useParams<{id: string}>();

    const themeYn = useAppSelector((state)=> state.themeReducer);
    
    React.useEffect(()=> {
        getDetail(param.id).then((result)=> setDetail(result))
    },[])


    return (
        <Container fixed
            sx={{
                minWidth : 1024,
                height : '100vh',
                mt : '7rem',
                textAlign : 'center'}}>
                <Box 
                    display="flex" 
                    flexDirection="row"
                    alignItems="center">
                    <Box 
                        textAlign={'start'}
                        width={"85%"}>
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
                    <DetailExternalLink theme={themeYn.theme} detail={detail && detail} />
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
                <Box display='flex' flexDirection='row' justifyContent={'space-between'} sx={{ px : 2, mb : 10}}>
                    <DetailCompany theme={themeYn.theme} path={detail && detail} />
                    <DetailCollection theme={themeYn.theme} path={detail && detail} />
                </Box>
        </Container>
    )
}