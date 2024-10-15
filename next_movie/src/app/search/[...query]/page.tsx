"use client"

import React from 'react';
import { Box, Button, Container, List, ListItem, Typography } from "@mui/material";
import { getSearchResult } from "../../../components/fetchData";
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setSearchResult } from '../../../redux/features';
import { grey } from '@mui/material/colors';
import SearchItem from '../../../search/SearchItem';

export default  function SearchPage({params} : { params : {query : string[]}}) {
    const dispatch = useAppDispatch();
    const themeYn = useAppSelector((state)=> state.themeReducer).theme;
    const searchReducer  = useAppSelector((state)=> state.searchReducer);
    React.useEffect(()=> {
        getSearchResult(`&query=${params.query[0]}&page=${params.query[1]}`)
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
                    <Typography variant='h4' fontWeight='bold'>
                        Keyword : {params.query[0]}
                    </Typography>
                    <Box display="flex" flexDirection="row">
                        <Box
                            width="20%" 
                            height="20rem"
                            sx={{
                                borderRadius : 4,
                                bgcolor : themeYn ? grey[700] : grey[300],
                                p : 2
                            }}>
                            <Button>
                                
                                    Movie : {searchReducer[0]?.total_results}
                                

                            </Button>
                        </Box>
                        <Box width="80%">
                            <List>
                                {searchReducer[0]?.results.map((item : MovieOverview)=> {
                                    return (
                                        <SearchItem key={item.id} inform={item} theme={themeYn} />
                                    )
                                })}
                            </List>

                        </Box>
                    </Box>
                    {searchReducer[0]?.results.length}
                </Box>
        </Container>
    )
    
}