import React from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { useAppDispatch, useAppSelector } from '@/redux/hook';
import MovieCard from './MovieCard';
import { search } from '../FetchData';
import createQuery from '../createQuery';
import { addSearchResult } from '@/redux/features/movieReducer';


export default function SearchList() {
    const searchResult : SearchMovie[] = useAppSelector((state)=> state.searchResult);
    const searchFilter = useAppSelector((state)=> state.searchFilter);
    const dispatch = useAppDispatch()
    

    const list = (listed : SearchMovie[]) => {

        return (
            listed.map((page) => {
                return (
                    page.results.map((item)=> {
                        return (
                            <Grid key={item.id} >
                                <MovieCard key={item.id} movie={item} genre={item.genre_ids} />
                            </Grid>
                        )
                    })
                )
            })
        )
    }

    const handleScroll =(e:any) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        const totalPage = searchResult[0].total_pages; 
        const loadedPage = Math.max(...searchResult.map(i=> i.page))
        
        if(bottom && totalPage > loadedPage) {
            const pageQuery = `&page=${loadedPage+1}`
            const { yearQuery, adultQuery, keywordQuery} = createQuery(searchFilter);
            try {
                search(`${keywordQuery}${yearQuery}${adultQuery}${pageQuery}`).then((results)=> {
                    dispatch(addSearchResult(results))
                })           
            } catch(err) {
                console.log(err)
            }
        }
    }
    
    return (
            <Grid
                onScroll={handleScroll}
                container
                justifyContent='center' 
                direction='row' 
                spacing={1}
                sx={{height : "70vh", overflowY : "scroll" }}>
                    {list && list(searchResult)}
            </Grid>
        
    )
}