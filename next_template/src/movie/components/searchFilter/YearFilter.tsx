import React from 'react';
import { LocalizationProvider, YearCalendar } from '@mui/x-date-pickers';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { changeUseYn, changeValue } from '@/redux/features/movieReducer';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';

export default function YearFilter() {
    /** Control Release Year Filter  */
    const searchFilter : {name : string, useFilter : boolean}[] = useAppSelector((state) => state.searchFilter);
    const filterState = searchFilter[searchFilter.findIndex((item) => item.name === "year")]
    const dispatch = useAppDispatch()

    React.useEffect(()=> {
        selectYear("year", dayjs(new Date()))
    },[])
    /** Control Click All Check Box */
    const clickAllCheckBox = (name: string, useFilter : boolean) => {
        dispatch(changeUseYn({name: name, useFilter : !useFilter}))
    }
    /** Dispatch Selected Year to Redux state */
    const selectYear = (name : string, value : dayjs.Dayjs) => {
        dispatch(changeValue({name : name, value : dayjs(value).format('YYYY')}))
    }

    return (
        <Grid container direction='column' sx={{width : "100%"}}>
            <Grid container direction='row' alignItems='Center' sx={{pl : "1rem"}}>
                <Typography sx={{ mr: "1rem"}}>
                    Release Year
                </Typography>
                <FormControlLabel 
                    control={<Checkbox checked={!filterState.useFilter} onChange={()=> clickAllCheckBox("year",filterState.useFilter)} />} 
                    label="All"
                />  
            </Grid>
            <Box sx={{ width : "80%", m: 1, p: 1, border: '1px solid gray', borderRadius : "1rem"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>    
                    <YearCalendar 
                        sx={{ width : "100%"}} 
                        disabled={!filterState.useFilter}
                        disableFuture={true}
                        minDate={dayjs(new Date('1950-01-01'))} 
                        maxDate={dayjs(new Date())}
                        onChange={(value)=>selectYear("year",value)}
                    />
                </LocalizationProvider>
            </Box>
        </Grid>
    )
}