import React from "react";

import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { changeValue, setSearchResult } from "@/redux/features/movieReducer";
import { useRouter } from "next/navigation";

import { search } from "../FetchData";


/**
 * Search Button in Main Page Search Bar
 * @param keyword Input Keyword
 * @returns Route to `/movie/search` | `null`
 */
export default function SearchBtn({keyword, keydown} : {keyword : string, keydown : boolean}) {
    /** Check Use FIlter */
    const searchFilter = useAppSelector((state)=> state.searchFilter);
    const dispatch = useAppDispatch();
    const router = useRouter()

    React.useEffect(()=> {
        (keydown === true && onClick())
    },[keydown])
    
    const onClick= ()=> {
        if(keyword.trim().length > 0) {
            dispatch(changeValue({name : 'keyword', value : keyword.trim()}))
            
            const input = `&query=${keyword.trim()}`
            const { yearQuery, adultQuery } = createQuery();
            try {
                search(`${input}${yearQuery}${adultQuery}`).then((results) => {
                    dispatch(setSearchResult(results));
                })
                router.push("/movie/search")
            } catch (err) {
                console.log(err)
            }
        }  else {
            // Maybe Next...
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
        <IconButton onClick={onClick}>
            <SearchIcon color="primary" />
        </IconButton>
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