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
import { Home } from '@mui/icons-material';
import { grey } from '@mui/material/colors';


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
                    {detail?.homepage ? (
                        <Link
                            href={detail && detail.homepage }
                            target='_blank'
                            rel='noreferrer'>
                            <Box 
                                display="flex"
                                flexDirection="column"
                                borderRadius={4}
                                bgcolor={themeYn.theme ? grey[800] : grey[200]}
                                alignItems="center"
                                justifyContent="center"
                                width="4rem"
                                height="4rem"                      sx={{
                                    ":hover" : {
                                        bgcolor : themeYn.theme ? grey[700] : grey[300] },
                                    my : 1,
                                    cursor : 'pointer'
                                }}>
                                <Home
                                    sx={{   width : "2rem", 
                                            height : "2rem",
                                            color : themeYn.theme ? 'white' : 'black'
                                            }}/>
                                <Typography 
                                    sx={{ fontSize : '10px', color : themeYn.theme ? 'white' : 'black'}}>
                                    HomePage
                                </Typography>
                            </Box>
                        </Link>
                    ) : (
                        <Box 
                            display="flex"
                            flexDirection="column"
                            borderRadius={4}
                            bgcolor={themeYn.theme ? grey[800] : grey[200]}
                            alignItems="center"
                            justifyContent="center"
                            width="4rem"
                            height="4rem">
                                <Typography flexWrap={'wrap'} fontSize='13px' color={themeYn.theme ? 'white' : 'black'} >
                                    No 
                                    Hompage
                                </Typography>
                        </Box>        
                    )}
                    {/* {   detail?.imdb_id ? (
                        <Link href={``}
                            target='_blank'
                            rel='noreferrer'>
                            <Box>        
                                vdisplay="flex"
                                flexDirection="column"
                                borderRadius={4}
                                bgcolor={themeYn.theme ? grey[800] : grey[200]}
                                alignItems="center"
                                justifyContent="center"
                                width="4rem"
                                height="4rem"    
                            <Box>
                        <Link>

                        ) : (
                            <></>
                        )
                    } */}
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