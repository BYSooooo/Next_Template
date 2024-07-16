import React from 'react';

import { GitHub } from '@mui/icons-material';
import { AppBar, Box, Link, Stack, Typography } from '@mui/material';
import ModeSwitch from './ModeSwitch';
import ModeIcon from './ModeIcon';
import SearchBar from './SearchBar';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

export default function TopBar() {
    
    return (
        <AppBar position='static'>
            <Grid container sx={{ px : 2, py : 1}}>
                <Grid xs={3}>

                </Grid>
                <Grid xs={6} alignItems={'center'}>
                    <SearchBar />
                </Grid>
                <Grid xs={3}>
                <Stack
                    spacing={0.5}
                    direction='row' 
                    alignItems='center' 
                    justifyContent='end'>
                    <ModeIcon />                    
                    <ModeSwitch />
                    <Link
                        target="_blank"
                        rel="noopener"
                        href="https://github.com/BYSooooo/Next_Template">
                        <GitHub sx={{ color : 'ghostwhite'}} fontSize='large' />
                    </Link>
                </Stack>
                </Grid>
                
            </Grid>
        </AppBar>        
    )
}