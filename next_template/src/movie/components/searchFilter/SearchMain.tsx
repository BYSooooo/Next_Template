import React from 'react';

import Box from "@mui/material/Box";
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import YearFilter from './YearFilter';
import AdultFilter from './AdultFilter';

export default function SearchMain() {

    return (
        <Box sx={{width : 200, height : "100%"}}>
           <Grid container direction='column'>
                <YearFilter />
                <AdultFilter />
            </Grid> 
        </Box>       
    )
}