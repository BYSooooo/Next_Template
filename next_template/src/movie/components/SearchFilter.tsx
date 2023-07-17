import React from "react";
import { delSelectedGenre, setSelectedGenre } from "@/redux/features/movieReducer";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Box, Chip, FormControlLabel, Slider, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import DoneIcon from '@mui/icons-material/Done'
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from "dayjs";
import Checkbox from "@mui/material/Checkbox";

export default function SearchFilter() {
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

    console.log(selGenreList)
    return (
        <Box sx={{ width : "100%"}} >
            <Grid container direction='row'>
                <Grid container direction='column' sx={{width : "45%", m: 0.5}}>    
                    <Grid container direction='row' alignItems='Center' sx={{pl : "1rem"}}>
                        <Typography sx={{ mr: "1rem"}}> 
                            Genre
                        </Typography>
                        <FormControlLabel control={<Checkbox checked={allGenre} onChange={()=> setAllGenre(!allGenre)} />} label="All"/>
                    </Grid>
                    <Grid direction='row'>
                        <Box sx={{ m: 1, p : 1, border : '1px solid gray', borderRadius : "1rem"}}>
                            {genreList.map((genre : MovieGenreInfo) => {
                                return (
                                    <Chip
                                        icon={checkSelList(genre.id) === true ? <DoneIcon /> : null}
                                        sx={{ margin : "0.3rem" }} 
                                        label={genre.name} 
                                        onClick={() => onClickAddGenre(genre)}
                                        color={checkSelList(genre.id) === true ? "primary" : "default" }
                                        disabled={allGenre}
                                    />
                                )
                            })}
                        </Box>
                    </Grid>
                </Grid>
                <Grid container direction='column' sx={{width : "30%", m: 0.5, minWidth : "10rem"}}>
                    <Grid container direction='row' alignItems='Center' sx={{pl : "1rem"}}>
                        <Typography sx={{ mr: "1rem"}}>
                            Release Date
                        </Typography>
                        <FormControlLabel control={<Checkbox checked={allDate} onChange={()=> setAllDate(!allDate)} />} label="All"/>     
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
                        <FormControlLabel control={<Checkbox checked={allRate} onChange={()=> setAllRate(!allRate)} />} label="All"/>
                    </Grid>
                    <Box justifyItems="stretch" sx={{ width : "80%", m: 1, p: 1, border: '1px solid gray', borderRadius : "1rem"}}>
                        <Slider valueLabelDisplay="auto" marks step={1} min={0} max={5} sx={{ width: "80%"}} disabled={allRate}/>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}