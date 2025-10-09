"use client"

import React, { useEffect } from 'react';
import { Box, Container, List, Pagination, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setSearchResult } from '../../../redux/features';
import SearchItem from '../../../search/SearchItem';
import ResultOverview from '../../../search/ResultOverview';
import { useParams } from 'next/navigation';

export default function SearchPage() {
    const { query } = useParams();

    const initKeyword = query[0];
    const initPage = parseInt(query[1]) || 1;

    const themeYn = useAppSelector((state)=> state.themeReducer).theme;
    const searchReducer  = useAppSelector((state)=> state.searchReducer);
    const dispatch = useAppDispatch();
    const [page, setPage] = React.useState(initPage);
    const [selected, setSelected] = React.useState<string>();

    const searchFetch = React.useCallback(async (keyword : string, pageNum : number)=> {
        const queryParams = { query: [keyword, String(pageNum)] };

        try {
            const response = await fetch(`/api/search/${queryParams.query.join('/')}`);

            if(!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            const data = await response.json();
            dispatch(setSearchResult(data))
            
        } catch(error) {
            console.error(error)
        }
    },[dispatch])

    React.useEffect(()=> {
        searchFetch(initKeyword, page)
    },[initKeyword, initPage])

    const onChangeSort = (selectedSort : string)=> {
        setSelected(selectedSort);
    }

    // const onChangePagination = (event : React.ChangeEvent<unknown>, value: number)=> {
    //     setPage(value)
    //     searchFetch(initKeyword,value);
        
    //     // getSearchResult(`&query=${params.query[0]}&page=${value}`)
    //     //     .then((result : {
    //     //         movie : MovieOverview, 
    //     //         collection : CollectionInfo, 
    //     //         company : CompanyInfo, 
    //     //         person : PersonOverview })=> {
    //     //         dispatch(setSearchResult(result))
    //     //     })
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
                        Keyword : {decodeURIComponent(initKeyword)}
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
                                <Pagination 
                                    page={page}
                                    count={searchReducer[selected]?.total_pages} 
                                    size="large" 
                                    onChange={onChangePagination}
                                />
                            </Box>
                        </Box>
                    </Box>

                </Box>
        </Container>
    )
    
}