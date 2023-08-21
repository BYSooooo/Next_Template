import React from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';

import Home from '@mui/icons-material/Home';
import VideoLibrary from '@mui/icons-material/VideoLibrary';

export default function TopIcon({detail} : {detail : MovieDetail}) {

    return (
        <Grid container direction='row-reverse'>
            { detail.homepage ?
                <Tooltip title="Visit HomePage">
                    <Link href={detail.homepage} target='_blank' rel='noreferrer'>
                        <Home sx={{ width: 30, height : 30, color : 'black'}}/>
                    </Link> 
                </Tooltip>
            :   
                <Tooltip title="No Information">
                    <Home sx={{ width: 30, height : 30, color : "gray"}} />
                </Tooltip>
            }

            { detail.video ? 
                <Tooltip title="Videos">
                    <Link href={null} target='_blank' rel='noreferrer'>
                        <VideoLibrary sx={{width : 30, height : 30, color :'black'}} />
                    </Link>
                </Tooltip>
            :
                <Tooltip title="No Videos">
                    <VideoLibrary sx={{ width: 30, height : 30, color : "gray"}} />
                </Tooltip>
            }
            
        </Grid>

    )
}