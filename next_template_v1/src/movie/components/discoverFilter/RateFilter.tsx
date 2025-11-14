import React from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';

import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { changeFilter, setRateRange } from '@/redux/features/movieReducer';

export default function RateFilter() {
    /** Control Select Movie Rate Part */
    const rateRange = useAppSelector((state) => state.selectedRateRange);
    const dispatch = useAppDispatch();
    
    const handleValue = (event : Event, newValue : number[] ) => {
        dispatch(setRateRange(newValue as number[]))
    }

    /** Control Select All Check Box Part */
    const useSearchFilter : {name : string, useFilter : boolean}[] = useAppSelector((state) => state.searchFilter);
    const filterState = useSearchFilter[useSearchFilter.findIndex((item) => item.name === "rate")]

    const clickAllCheckBox = (name: string, useFilter : boolean) => {
        dispatch(changeFilter({name: name, useFilter : !useFilter}))
    }
    
    return (
        <Grid container direction='column' sx={{width : "20%", m: 0.5, minWidth: "10rem"}}>
            <Grid container direction='row' alignItems='Center' sx={{pl : "1rem"}}>
                <Typography sx={{ mr: "1rem"}}> 
                    Rate
                </Typography>
                <FormControlLabel control={<Checkbox checked={!filterState.useFilter} onChange={()=> clickAllCheckBox("rate",filterState.useFilter)} />} label="All"/>
            </Grid>
            <Box sx={{ width : "80%", m: 1, p: 1, border: '1px solid gray', borderRadius : "1rem"}}>
                <Grid container direction='column' alignItems='center'>
                    <Slider value={rateRange} onChange={handleValue} valueLabelDisplay="auto" marks step={1} min={0} max={10} sx={{ width: "80%"}} disabled={!filterState.useFilter}/>
                        <Grid container direction='row' sx={{ mt : "1rem"}} justifyContent='center' columnGap={2}>
                            <TextField label="From"size="small" sx={{width: "40%"}} aria-readonly={true} value={rateRange[0]} />
                            <TextField label="To" size="small" sx={{width: "40%"}} aria-readonly={true} value={rateRange[1]} />
                        </Grid>
                </Grid>
            </Box>
        </Grid>
    )
}