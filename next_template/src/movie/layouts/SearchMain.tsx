import React from 'react';

import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import MainSearch from '../components/main/MainSearch';
import Paper from '@mui/material/Paper';

import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { changeUseYn, changeValue, searchFilter, setSearchResult } from '@/redux/features/movieReducer';
import SearchList from '../components/search/SearchList';
import { search } from '../components/FetchData';

export default function SearchMain() {
    const searchResult:SearchMovie[]  = useAppSelector((state) => state.searchResult);
    const resultCount = React.useRef(0)
    const dispatch = useAppDispatch()

    // const [filtering, setFiltering] = React.useState<{ keyword : string, year : string, adult : string}>();
    const [loadedResult, setLoadedResult] = React.useState(0);
    React.useEffect(()=> {
        const sessionObj = JSON.parse(sessionStorage.getItem('search'))
        console.log(sessionObj)
        setReduxFilter(sessionObj)

        // setFiltering({keyword : sessionObj.keyword, year : sessionObj.year, adult : sessionObj.adult});
                
        if(searchResult && searchResult[0]) {
            resultCount.current = searchResult[0].total_results
            setLoadedResult(()=> loadedMovieCount())
        }
    },[])

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
    


    
    // const createQuery = () => {
    //     let year = "";  //selected Year
    //     let adult = "" //true = include , false = exclude

    //     searchFilter.forEach(filter => {
    //         if(filter.useFilter === true) {
    //             switch (filter.name) {
    //                 case "year" : year = `&primary_release_year=${filter.value}`;
    //                     break;
    //                 case "adult" : adult = `&inculde_adult=${filter.value}`;
    //                     break;
    //                 default : break;
    //             }
    //         } else {
    //             switch(filter.name) {
    //                 case "year" : year = ""
    //                     break;
    //                 case "adult" : adult = "";
    //                     break
    //                 default : break;   
    //             }
    //         }
    //     })
    //     return { yearQuery : year, adultQuery : adult};
    // }

        // const getSearchResult = () => {
    //     try {
    //         const input = `&query=${keyword.trim()}`
    //         search(`${input}${yearQuery}${adultQuery}`).then((results) => {
    //             dispatch(setSearchResult(results));
    //         })
    //     }
    // }

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
            <SearchList />
        </Container>
    )
}