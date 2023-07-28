import { useAppSelector } from "@/redux/hook";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";
import Button from "@mui/material/Button";
import React from "react";

export default function SearchBtn({keyword} : {keyword : string}) {
    /** Check Use FIlter */
    const searchFilter = useAppSelector((state)=> state.searchFilter);
    
    
    const genreList = useAppSelector((state) => state.selectedGenre);
    const dateList = useAppSelector((state) => state.selectedDateRange);
    const rateList = useAppSelector((state) => state.selectedRateRange);

    const [genreQuery, setGenreQuery] = React.useState("with_genres=");
    const [dateQuery, setDateQuery] = React.useState("");
    const [voteAvg, setVoteAvg] = React.useState("");

    const [sendQuery, setSendQuery] = React.useState("");

    const onClick = () => {
        searchFilter.forEach(filter => {
            if(filter.useFilter == true) {
                switch (filter.name) {
                    case "genre" :
                        setGenreQuery((query)=> query += genreFilter());
                        break;
                    case "date" : 
                        setDateQuery(dateFilter());
                        break;
                    case "rate" : 
                        setVoteAvg(rateFilter());
                        break;
                    default :
                        break;
                }   
            }
        });
        setSendQuery(`with_keywords=${keyword}`)
    }

    const sendQueryData = () => {
        
    }

    /** Set Selected Genre to Query by Genre Id */
    const genreFilter = () => {
        const pipe = "%7C"; // Pipe (|) in query mean 'OR'
        let queryString:string = "";
        for(var i=0; i<genreList.length; i++) {
            if(i < genreList.length -1) {
                queryString += genreList[i].id.toString() + pipe;
            } else {
                queryString += genreList[i].id.toString()
            }
        }
        return queryString;
    }
    /** Set Release Date to Query */
    const dateFilter = () => {
        const fromQuery = dateList[dateList.findIndex(key => key.name === "fromDate")].date;
        const toQuery = dateList[dateList.findIndex(key => key.name === "toDate")].date;
        return `primary_release_date.gte=${fromQuery}&primary_release_date.lte=${toQuery}`
    }
    /** Set TMDB User's Average Vote Point  */
    const rateFilter = () => {
           const fromAvg = rateList[0].toString();
           const toAvg = rateList[1].toString();
           return `vote_average.gte=${fromAvg}&vote_average.lte=${toAvg}`
    }

    return (
        <Button variant="contained" 
                sx={{ width: "100%", height: "100%"}} 
                onClick={onClick}>
            Search
        </Button>
    )
}