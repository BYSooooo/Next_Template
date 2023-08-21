import React from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import { AccessTime, Language, NoAdultContent } from '@mui/icons-material';


export default function TopHeader({detail} : {detail : MovieDetail}) {

    return (
        <Grid>
            <Typography variant='h4' fontWeight='bold' >
                {`${detail.original_title} (${detail.release_date.slice(0,4)})`} 
            </Typography>        
            <Typography variant='subtitle1' color='gray'>
                {detail.tagline}
            </Typography>
            <Grid container direction='row' columnGap={1} sx={{mt : 1}}>
                <Tooltip title="Runtime">
                    <Chip icon={<AccessTime />} label={`${detail.runtime}m`}/>
                </Tooltip>
                <Tooltip title="Original Language">
                    <Chip icon={<Language />} label={detail.original_language.toUpperCase()} />
                </Tooltip>
                <Tooltip title="Adult">
                    <Chip icon={<NoAdultContent />} label={detail.adult ? "ADULT" : "ALL" }/>
                </Tooltip>
            </Grid>
        </Grid>
    )
}