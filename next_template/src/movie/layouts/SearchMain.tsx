import React from 'react';

import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import MainSearch from '../components/main/MainSearch';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Error } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { changeUseYn, changeValue, setSearchResult } from '@/redux/features/movieReducer';
import SearchList from '../components/search/SearchList';
import { search } from '../components/FetchData';

export default function SearchMain() {
    const searchResult : SearchMovie[]  = useAppSelector((state) => state.searchResult);
    const genreList = JSON.parse(sessionStorage.getItem('genres'))

    const searchFilter = useAppSelector((state)=> state.searchFilter)
    const [loadedResult, setLoadedResult] = React.useState(0);
    const dispatch = useAppDispatch()    
    const resultCount = React.useRef(0)
    const sessionObj = JSON.parse(sessionStorage.getItem('search'))
    
    React.useEffect(()=> {
        getSearchResult()
        setReduxFilter(sessionObj)
    },[sessionObj.time])

    React.useEffect(()=> {
        resultCount.current = searchResult[0]?.total_results
        setLoadedResult(()=> loadedMovieCount())
    },[searchResult])

    const setReduxFilter = (filtering : {keyword : string, year : string, adult : string}) => {
        /* set Keyword Filter in Redux State */
        dispatch(changeValue({name : 'keyword', value : filtering.keyword}))
        /* set Year Filter in Redux State  */
        dispatch(changeUseYn({name : 'year', useFilter : filtering.year === 'all' ? false : true}))
        dispatch(changeValue({name : 'year', value : filtering.year === 'all' ? '' : filtering.year}))
        /* set Adult Filter in Redux State */
        dispatch(changeUseYn({name : 'adult', useFilter : filtering.adult === 'all' ? false : true}));
        dispatch(changeValue({name : 'adult', value : filtering.adult === 'all' ? '' : filtering.adult}))
    }
    
    const createQuery = (filtering : {keyword : string, year : string, adult : string}) => {
        // Ipnuted Keyword in SessionStroage
        const keyword = filtering.keyword.length > 0 ? `&query=${filtering.keyword}` : ``
        // Selected Year in SessionStroage
        const year = filtering.year === 'all' ? '' : `&primary_release_year=${filtering.year}`
        // Selected Adult Movie FIlter in SessionStroage
        const adult = filtering.adult === 'all' ? '' : `&inculde_adult=${filtering.adult}`

        return { keywordQuery : keyword, yearQuery : year, adultQuery : adult };
    }

    const getSearchResult = () => {
        const {keywordQuery, yearQuery, adultQuery } = createQuery(sessionObj);
        try {
            search(`${keywordQuery}${yearQuery}${adultQuery}`).then((results) => {
                dispatch(setSearchResult(results));
            })
        } catch(err) {
            console.log(err)
        }
    }

    const loadedMovieCount = () => {
        let count = 0;
        searchResult.map((page)=> {
            count += page.results.length
        })
        return count;
    }

    return (
        <Container sx={{mt : "5rem", maxWidth : "80vw"}}>
            <MainSearch />
            <Paper elevation={3} sx={{ p : 1, mt : 2, mb : 2, marginInline : 3}}>
                <Typography variant='body1'>
                    Result : {loadedResult} / {resultCount.current}
                </Typography>
            </Paper>
            {
                resultCount.current === 0 || resultCount === undefined
                ? <Stack direction='column' sx={{ justifyContent : 'center', alignItems : 'center'}} rowGap={1}>
                    <Error sx={{ width : 40, height : 40}}/>
                    <Typography variant='h5'>
                        Not Found Result
                    </Typography>

                    </Stack>
                
                : <SearchList />
            }
        </Container>
    )
}
