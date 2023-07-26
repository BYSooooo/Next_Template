import { useAppSelector } from "@/redux/hook";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";
import Button from "@mui/material/Button";
import React from "react";

export default function SearchBtn() {
    /** Check Use FIlter */
    const searchFilter = useAppSelector((state)=> state.searchFilter);
    
    const genreList = useAppSelector((state) => state.selectedGenre);
    const dateList = useAppSelector((state) => state.selectedDateRange);
    const rateList = useAppSelector((state) => state.selectedRateRange);

    const [genreQuery, setGenreQuery] = React.useState("with_genres=");

    const onClick = () => {
        searchFilter.forEach(filter => {
            console.log(filter)
            if(filter.useFilter == true) {
                switch (filter.name) {
                    case "genre" :
                        genreFilter();
                    case "date" : 
                        dateFIlter();
                    case "rate" : 
                        rateFilter();
                    default :
                        break;
                }   
            }
        });
    }

    const genreFilter = () => {
        const pipe = "%7C"; // Pipe (|) in query mean 'OR'
        let queryString:string = "";
        genreList.map((selected) => {
            queryString += selected.id.toString() + pipe;
        })
        console.log(queryString)
    }
    const dateFIlter = () => {

    }
    const rateFilter = () => {

    }

    return (
        <Button variant="contained" 
                sx={{ width: "100%", height: "100%"}} 
                onClick={onClick}>
            Search
        </Button>
    )
}