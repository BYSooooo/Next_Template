import React from "react";

import Button from "@mui/material/Button";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { search } from "./FetchData";
import { setSearchResult } from "@/redux/features/movieReducer";

export default function SearchBtn({keyword} : {keyword : string}) {
    /** Check Use FIlter */
    const searchFilter = useAppSelector((state)=> state.searchFilter);
    const dispatch = useAppDispatch();

    const onClick= ()=> {
        if(keyword.trim().length > 0) {
            const input = `&query=${keyword.trim()}`
            console.log(input)
            const { yearQuery, adultQuery } = createQuery();
            search(`${input}${yearQuery}${adultQuery}`).then((results) => {
                dispatch(setSearchResult(results));
            })
        } 
    }

    const createQuery = () => {
        let year = "";  //selected Year
        let adult = "" //true = include , false = exclude

        searchFilter.forEach(filter => {
            if(filter.useFilter === true) {
                switch (filter.name) {
                    case "year" : year = `&primary_release_year=${filter.value}`;
                        break;
                    case "adult" : adult = `&inculde_adult=${filter.value}`;
                        break;
                    default : break;
                }
            } else {
                switch(filter.name) {
                    case "year" : year = ""
                        break;
                    case "adult" : adult = "";
                        break
                    default : break;   
                }
            }
        })
        return { yearQuery : year, adultQuery : adult};
    }
    
    return (
        <Button variant="contained" 
        sx={{ width: "100%", height: "100%"}} 
        onClick={onClick}>
            Search
        </Button>
    )
}

// const genreList : MovieGenreInfo[] = useAppSelector((state) => state.selectedGenre);
// const dateList = useAppSelector((state) => state.selectedDateRange);
// const rateList = useAppSelector((state) => state.selectedRateRange);

// const createQuery = () => {
//     let genreQuery = ""
//     let dateQuery = ""
//     let rateQuery = ""
//     searchFilter.forEach(filter => {
//         if(filter.useFilter == true) {
//             switch (filter.name) {
//                 case "genre" : 
//                     genreQuery = genreFilter();
//                     console.log(`Switch Pass Genre : ${genreQuery}`)
//                     break;
//                 case "date" : 
//                     dateQuery = dateFilter();
//                     console.log(`Switch Pass Date : ${dateQuery}`)
//                     break;
//                 case "rate" : 
//                     rateQuery = rateFilter();
//                     console.log(`Switch Pass Rate : ${rateQuery}`)
//                     break;
//                 default :
//                     break;
//             }   
//         }
//     });
//     return { genre : genreQuery, date : dateQuery, rate :rateQuery};
// }

// const onClick = async ()=> {
//     // const {genre, date, rate} = createQuery();
//     // const keywordQ = (keyword.length > 0 ? `query=${keyword}&` : "");
//     // const genreQ = (searchFilter[0].useFilter === true ? `${genre}&` : "");
//     // const dateQ = (searchFilter[1].useFilter === true ? `${date}&` : "");
//     // const rateQ = (searchFilter[2].useFilter === true? `${rate}&` : "");
    
//     // const query = (`/keyword/${keywordQ}/genre/${genreQ}/date/${dateQ}/rate/${rateQ}`).slice(0,-1)
//    const searchQuery = `${keyword}`
   
//     search(searchQuery).then((results) => {
//         console.log(results);
//     })

// }

// /** Set Selected Genre to Query by Genre Id */
// const genreFilter = () => {
    
//     const pipe = "%7C"; // Pipe (|) in query mean 'OR'
//     let queryString:string = "";
//     for(var i=0; i<genreList.length; i++) {
//         if(i < genreList.length -1) {
//             queryString += genreList[i].id.toString() + pipe;
//         } else {
//             queryString += genreList[i].id.toString()
//         }
//     }
//     console.log("Return Query Genre : "+ queryString)
//     return `with_genres=${queryString}`;
// }
// /** Set Release Date to Query */
// const dateFilter = () => {
    
//     const fromQuery = dateList[dateList.findIndex(key => key.name === "fromDate")].date;
//     const toQuery = dateList[dateList.findIndex(key => key.name === "toDate")].date;
//     console.log("Return Query Date : " + fromQuery, toQuery)
//     return `primary_release_date.gte=${fromQuery}&primary_release_date.lte=${toQuery}`
// }
// /** Set TMDB User's Average Vote Point  */
// const rateFilter = () => {
    
//     const fromAvg = rateList[0].toString();
//     const toAvg = rateList[1].toString();
//     console.log("Return Query Rate : "+fromAvg, toAvg);
//     return `vote_average.gte=${fromAvg}&vote_average.lte=${toAvg}`
//}