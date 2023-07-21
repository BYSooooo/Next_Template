import React from "react";
import { delSelectedGenre, setSelectedGenre, changeFilter } from "@/redux/features/movieReducer";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Box, FormControlLabel, Slider, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import DoneIcon from '@mui/icons-material/Done'
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from "dayjs";
import Checkbox from "@mui/material/Checkbox";
import GenreFilter from "./GenreFIlter";

export default function SearchFilterMain() {
    const genreList : MovieGenreInfo[] = useAppSelector((state) => state.movieGenre);
    const selGenreList : MovieGenreInfo[] = useAppSelector((state) => state.selectedGenre)
    const dispatch = useAppDispatch();

    function onClickAddGenre(genre : MovieGenreInfo){
        /** if Genre not selected, add Store */
        if(selGenreList.findIndex(
            (selected) => selected.id === genre.id) === -1) {
            dispatch(setSelectedGenre(genre))
        /** if Genre seleted already, delete in Store*/    
        } else {
            dispatch(delSelectedGenre(genre.id))
        }
        
    }

    const checkSelList = (genreId : number) => {
        const check = selGenreList.findIndex((genre) => genre.id === genreId)
        return check === -1 ? false : true ;
        
    }

    const [fromDate, setFromDate] = React.useState<Dayjs | null>(dayjs(new Date()))
    const [toDate, setToDate] = React.useState<Dayjs | null>(dayjs(new Date()))
    
    const [allGenre, setAllGenre] = React.useState(true);
    const [allDate, setAllDate] = React.useState(true);
    const [allRate, setAllRate] = React.useState(true);

    const onClickAllCheckBox = (name : string, useFilter : boolean) => {
        switch (name) {
            case "genre":   setAllGenre(useFilter);
                break;
            case "date" :   setAllDate(useFilter);
                break;
            case "rate" :   setAllRate(useFilter);
                break;
            default     :   break;
        }
        dispatch(changeFilter({name : name, useFilter : !useFilter}))
        
    }

    const [rateValue, setRateValue] = React.useState<number[]>([0,10]);

    const handleValue = (event : Event, newValue : number[] ) => {
        setRateValue(newValue as number[])
    }

    console.log(selGenreList)
    return (
        <Box sx={{ width : "100%"}} >
            <Grid container direction='row'>
                <GenreFilter />
                <Grid container direction='column' sx={{width : "30%", m: 0.5, minWidth : "10rem"}}>
                    <Grid container direction='row' alignItems='Center' sx={{pl : "1rem"}}>
                        <Typography sx={{ mr: "1rem"}}>
                            Release Date
                        </Typography>
                        <FormControlLabel control={<Checkbox checked={allDate} onChange={()=> onClickAllCheckBox("date",!allDate)} />} label="All"/>     
                    </Grid>
                    <Box sx={{ width : "80%", m: 1, p: 1, border: '1px solid gray', borderRadius : "1rem"}}>
                        <Grid container direction='column'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker label="From Date" value={fromDate} onChange={(newValue) => setFromDate(newValue)} sx={{m : "0.5rem"}} disabled={allDate}/>
                                <DatePicker label="To Date" value={toDate} onChange={(newValue) => setToDate(newValue)} sx={{m : "0.5rem"}} disabled={allDate} /> 
                            </LocalizationProvider>
                        </Grid>
                    </Box>
                </Grid>
                <Grid container direction='column' sx={{width : "20%", m: 0.5, minWidth: "10rem"}}>
                    <Grid container direction='row' alignItems='Center' sx={{pl : "1rem"}}>
                        <Typography sx={{ mr: "1rem"}}> 
                            Rate
                        </Typography>
                        <FormControlLabel control={<Checkbox checked={allRate} onChange={()=> onClickAllCheckBox("rate",!allRate)} />} label="All"/>
                    </Grid>
                    <Box sx={{ width : "80%", m: 1, p: 1, border: '1px solid gray', borderRadius : "1rem"}}>
                        <Grid container direction='column' alignItems='center'>
                            <Slider value={rateValue} onChange={handleValue} valueLabelDisplay="auto" marks step={1} min={0} max={10} sx={{ width: "80%"}} disabled={allRate}/>
                                <Grid container direction='row' sx={{ mt : "1rem"}} justifyContent='center' columnGap={2}>
                                    <TextField label="From"size="small" sx={{width: "40%"}} aria-readonly={true} value={rateValue[0]} />
                                    <TextField label="To" size="small" sx={{width: "40%"}} aria-readonly={true} value={rateValue[1]} />
                                </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}