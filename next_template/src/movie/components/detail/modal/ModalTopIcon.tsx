import React from 'react';

import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import Home from '@mui/icons-material/Home';
import LinkIcon from '@mui/icons-material/Link';

export default function ModalTopIcon ({cast,mode} : {cast : PersonInfo, mode : string}) {
    const homepageYn = () => {
        return  (
            cast.homepage !== null
            ?
                <Tooltip title="Visit Homepage">
                    <Link href={cast.homepage} target='_blank' rel='noreferrer'>
                        <Home sx={{ width : 30, height : 30, color : mode === 'light' ?' black' : 'white'}} />
                    </Link>
                </Tooltip>
            :
                <Tooltip title="No Information">
                    <Home sx={{ width: 30, height : 30, color : "gray"}} />
                </Tooltip>
        )
    }

    const imdbYn = () => {

        return (
            cast.imdb_id !== null 
            ?
                <Tooltip title="Visit IMDB">
                    <Link href={`https://www.imdb.com/name/${cast.imdb_id}`} target='_blank' rel='noreferrer'>
                        <LinkIcon sx={{width : 30, height : 30, color : mode === 'light' ? 'black' : 'white'}} />
                    </Link>
                </Tooltip>
            :
                <Tooltip title="No Information">
                    <LinkIcon sx={{ width: 30, height : 30, color : "gray"}} />
                </Tooltip>
        )
    }

    return ( 
        <Grid container direction='row-reverse'>
            {homepageYn()}
            {imdbYn()}
        </Grid>        
    )

}