"use client"

import React from 'react';
import { Box, Container, List, ListItem, Pagination, Typography } from "@mui/material";
import { getSearchResult } from "../../../components/fetchData";
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setSearchResult } from '../../../redux/features';
import SearchItem from '../../../search/SearchItem';
import ResultOverview from '../../../search/ResultOverview';

export default  function SearchPage({params} : { params : {query : string[]}}) {
    const dispatch = useAppDispatch();
    const themeYn = useAppSelector((state)=> state.themeReducer).theme;
    const searchReducer  = useAppSelector((state)=> state.searchReducer);
    const [selected, setSelected] = React.useState("movie");

    React.useEffect(()=> {
        getSearchResult(`&query=${params.query[0]}&page=${params.query[1]}`)
            .then((result : {
                movie : MovieOverview, 
                collection : CollectionInfo, 
                company : CompanyInfo, 
                person : PersonOverview })=> {
                dispatch(setSearchResult(result))
            })
    },[selected])

    const onChangeSort = (selectedSort : string)=> setSelected(selectedSort);

    // const onChangePagination = (event : React.ChangeEvent<unknown>, value: number)=> {
    //     getSearchResult(`&query=${params.query[0]}&page=${value}`)
    //         .then((result : {
    //             movie : MovieOverview, 
    //             collection : CollectionInfo, 
    //             company : CompanyInfo, 
    //             person : PersonOverview })=> {
    //             dispatch(setSearchResult(result))
    //         })
    // }
    return (
        <Container fixed
            sx={{
                minWidth : 1024,
                height : '100vh',
                mt : '5rem',
                alignItems: 'center'}}>
                <Box textAlign='start'>
                    <Typography variant='h4' fontWeight='bold'>
                        Keyword : {decodeURIComponent(params.query[0])}
                    </Typography>
                    <Box display="flex" flexDirection="row">
                        <ResultOverview theme={themeYn} selectedSort={onChangeSort}/>
                        <Box width="80%">
                            <Box width="100%">
                                <List>
                                    {searchReducer[selected]?.results.map((item:any)=> {
                                        return (
                                            <SearchItem key={item.id} theme={themeYn} sort={selected} item={item}/>
                                        )
                                    })}
                                </List>
                            </Box>
                            <Box 
                                width="100%" 
                                justifyContent="center"
                                display="flex"
                                mb={2}>
                                {/* <Pagination 
                                    count={searchReducer[selected]?.total_pages} 
                                    size="large" 
                                    onChange={onChangePagination}
                                /> */}
                            </Box>
                        </Box>
                    </Box>

                </Box>
        </Container>
    )
    
}