import React from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';

import Home from '@mui/icons-material/Home';
import LinkIcon from '@mui/icons-material/Link';

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

            { detail.imdb_id ? 
                <Tooltip title="Visit IMDB">
                    <Link href={`https://www.imdb.com/title/${detail.imdb_id}`} target='_blank' rel='noreferrer'>
                        <LinkIcon sx={{width : 30, height : 30, color :'black'}} />
                    </Link>
                </Tooltip>
            :
                <Tooltip title="No Information">
                    <LinkIcon sx={{ width: 30, height : 30, color : "gray"}} />
                </Tooltip>
            }
            
        </Grid>

    )
}