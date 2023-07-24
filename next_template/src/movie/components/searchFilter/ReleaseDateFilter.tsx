import React from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs,{ Dayjs } from 'dayjs';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { changeFilter, setSelectedFromDate, setSelectedToDate } from '@/redux/features/movieReducer';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


export default function ReleaseDateFilter() {
    /**Control From, To Date Part */
    const releaseDate = useAppSelector((state) => state.selectedDateRange);
    console.log(releaseDate)
    const dispatch = useAppDispatch()
    
    const onChangeDate =(name : string, date : string) => {
        switch (name) {
            case "fromDate" : 
                dispatch(setSelectedFromDate(date))
                break;
            case "toDate" : 
                dispatch(setSelectedToDate(date))
                break;
            default :
                break;
        }
    }

    /** Control Select All Check Box Part */
    const useSearchFilter : {name : string, useFilter : boolean}[] = useAppSelector((state) => state.searchFilter);
    const filterState = useSearchFilter[useSearchFilter.findIndex((item) => item.name === "date")]

    const clickAllCheckBox = (name: string, useFilter : boolean) => {
        dispatch(changeFilter({name: name, useFilter : !useFilter}))
    }

    return (
        <Grid container direction='column' sx={{width : "30%", m: 0.5, minWidth : "10rem"}}>
            <Grid container direction='row' alignItems='Center' sx={{pl : "1rem"}}>
                <Typography sx={{ mr: "1rem"}}>
                    Release Date
                </Typography>
                <FormControlLabel control={<Checkbox checked={!filterState.useFilter} onChange={()=> clickAllCheckBox("date",filterState.useFilter)} />} label="All"/>     
            </Grid>
            <Box sx={{ width : "80%", m: 1, p: 1, border: '1px solid gray', borderRadius : "1rem"}}>
                <Grid container direction='column'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="From Date" value={dayjs(releaseDate[0].date).toDate()} onChange={(newValue) => onChangeDate("fromDate",newValue.toString())} sx={{m : "0.5rem"}} disabled={!filterState.useFilter}/>
                        <DatePicker label="To Date" value={dayjs(releaseDate[1].date).toDate()} onChange={(newValue) => onChangeDate("toDate",newValue.toString())} sx={{m : "0.5rem"}} disabled={!filterState.useFilter} /> 
                    </LocalizationProvider>
                </Grid>
            </Box>
        </Grid>
)   
}