import React from 'react';
import { LocalizationProvider, YearCalendar } from '@mui/x-date-pickers';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { changeFilter } from '@/redux/features/movieReducer';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';

export default function YearFilter() {
    /** Control Release Year Filter  */
    const releaseYear = useAppSelector((state)=> state.selectedYear);   
    const useSearchFilter : {name : string, useFilter : boolean}[] = useAppSelector((state) => state.searchFilter);

    const filterState = useSearchFilter[useSearchFilter.findIndex((item) => item.name === "year")]
    const dispatch = useAppDispatch()

    const clickAllCheckBox = (name: string, useFilter : boolean) => {
        dispatch(changeFilter({name: name, useFilter : !useFilter}))
    }

    return (
        <Grid container direction='column' sx={{width : "30%", m: 0.5, minWidth : "10rem"}}>
            <Grid container direction='row' alignItems='Center' sx={{pl : "1rem"}}>
                <Typography sx={{ mr: "1rem"}}>
                    Release Year
                </Typography>
                <FormControlLabel control={<Checkbox checked={!filterState.useFilter} onChange={()=> clickAllCheckBox("year",filterState.useFilter)} />} label="All"/>  
            </Grid>
            <Box sx={{ width : "80%", m: 1, p: 1, border: '1px solid gray', borderRadius : "1rem"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>    
                    <YearCalendar sx={{ width : "8rem"}} minDate={dayjs(new Date('1950-01-01'))} maxDate={dayjs(new Date())} disableFuture={true} disabled={!filterState.useFilter}/>
                </LocalizationProvider>
            </Box>
        </Grid>
    )
}