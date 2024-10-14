"use client"

import React from 'react';
import { Box, Container, List, ListItem, Typography } from "@mui/material";
import { getSearchResult } from "../../../components/fetchData";
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setSearchResult } from '../../../redux/features';

export default  function SearchPage({params} : { params : {query : string[]}}) {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state)=> state.themeReducer).theme;
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
                    <Typography variant='h5' fontWeight='bold'>
                        Keyword : {params.query[0]}
                    </Typography>
                    <Box display="flex" flexDirection="row">
                        <Box>
                            <Typography>
                                All Result : {searchReducer[0]?.total_results}
                            </Typography>
                        </Box>
                        <List>
                            {searchReducer[0]?.results.map((item : MovieOverview)=> {
                                return (
                                    <ListItem>
                                        {item.id}
                                    </ListItem>   
                                )
                            })}
                        </List>
                    </Box>
                    {searchReducer[0]?.results.length}
                </Box>
        </Container>
    )
    
}