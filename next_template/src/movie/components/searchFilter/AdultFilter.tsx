import React from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import RadioGroup from '@mui/material/RadioGroup';

import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { changeUseYn, changeValue } from '@/redux/features/movieReducer';
import Radio from '@mui/material/Radio';

export default function AdultFilter() {
    /** Control Adult Grade Filter */
    const searchFilter : {name : string, useFilter : boolean, value: string|boolean}[] = useAppSelector((state) => state.searchFilter);
    const filterState = searchFilter[searchFilter.findIndex((item) => item.name === "adult")];
    const dispatch = useAppDispatch();
    const [adult, setAdult] = React.useState("true");

    React.useEffect(()=> {
        const preState = filterState.value.toString()
        setAdult(preState)
    })
    /** Control Click All Check Box */
    const clickAllCheckBox = (name: string, useFilter : boolean, value : string) => {
        dispatch(changeUseYn({name: name, useFilter : !useFilter}))
        dispatch(changeValue(({name : name, value : value})));
    }

    const onChange= (event : React.ChangeEvent<HTMLInputElement>) => {
        const useYn = (event.target as HTMLInputElement).value
        setAdult(useYn);
        dispatch(changeValue({name : "adult", value : useYn}))
    }

    return (
        <Grid container direction='column' sx={{width : "100%"}}>
            <Grid container direction='row' alignItems='center' sx={{pl : '1rem'}}>
                <Typography sx={{mr : "1rem"}}>
                    Adults
                </Typography>
                <FormControlLabel 
                    control={<Checkbox checked={!filterState.useFilter} onChange={()=> clickAllCheckBox("adult", filterState.useFilter, adult)}/>}
                    label="All" 
                />
            </Grid>
            <Box sx={{ width : "80%", m:1, p:1, border : '1px solid gray', borderRadius : "1rem"}} alignItems='Center'>
                <RadioGroup
                    value={adult}
                    onChange={onChange}>
                    <FormControlLabel disabled={!filterState.useFilter} label="include Adult" control={<Radio />}value="true" />
                    <FormControlLabel disabled={!filterState.useFilter} label="exclude Adult" control={<Radio />}value="false" />
                </RadioGroup>
            </Box>
        </Grid>    
    )
}