import React from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { changeUseYn } from '@/redux/features/movieReducer';

export default function AdultFilter() {
    /** Control Adult Grade Filter */
    const searchFilter : {name : string, useFilter : boolean, value: string|boolean}[] = useAppSelector((state) => state.searchFilter);
    const filterState = searchFilter[searchFilter.findIndex((item) => item.name === "adult")];
    const dispatch = useAppDispatch();

    /** Control Click All Check Box */
    const clickAllCheckBox = (name: string, useFilter : boolean) => {
        dispatch(changeUseYn({name: name, useFilter : !useFilter}))
    }

    return (
        <Grid container direction='column' sx={{width : "100%"}}>
            <Grid container direction='row' alignItems='center' sx={{pl : '1rem'}}>
                <Typography sx={{mr : "1rem"}}>
                    Adults
                </Typography>
            </Grid>
            <Box 
                sx={{ width : "80%", m:1, p:1, border : '1px solid gray', borderRadius : "1rem"}}
                alignItems='Center'>
            <FormControlLabel 
                    control={<Checkbox checked={!filterState.useFilter} onChange={()=> clickAllCheckBox("adult", filterState.useFilter)}/>}
                    label="Include Adult" 
                />
            </Box>
        </Grid>    
    )
}