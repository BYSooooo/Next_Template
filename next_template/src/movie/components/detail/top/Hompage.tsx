import React from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Link from '@mui/material/Link';
import Home from '@mui/icons-material/Home';
import Tooltip from '@mui/material/Tooltip';

export default function Homepage({url} : {url : string}) {

    return (
        <Grid container direction='row-reverse'>
            {url ?
                <Tooltip title="Visit HomePage">
                    <Link href={url} target='_blank' rel='noreferrer'>
                        <Home sx={{ width: 30, height : 30, color : 'black'}}/>
                    </Link> 
                </Tooltip>
            :   
                <Tooltip title="No Information">
                    <Home sx={{ width: 30, height : 30, color : "gray"}} />
                </Tooltip>
            }
        </Grid>
    )
}