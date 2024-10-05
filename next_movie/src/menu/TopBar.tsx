import React from 'react';


import { GitHub } from '@mui/icons-material';
import { AppBar, Link } from '@mui/material';
import ModeSwitch from './ModeSwitch';
import HomeIcon from './HomeIcon';
import ModeIcon from './ModeIcon';
import SearchBar from './SearchBar';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

export default function TopBar() {
    
    return (
        <AppBar position='fixed'>
            <Grid 
                container 
                sx={{ px : 2, py : 1, alignItems : 'center'}}>
                <Grid 
                    xs={3}
                    container
                    sx={{
                        justifyContent : 'start',
                        alignItems : 'center'
                    }}>
                    <HomeIcon />
                </Grid>
                <Grid 
                    container
                    xs={6} 
                    sx={{ justifyContent : 'center'}}>
                    <SearchBar />
                </Grid>
                <Grid 
                    container
                    xs={3}
                    sx={{ 
                        justifyContent : 'end',
                        alignItems : 'center'}}>    
                    <ModeIcon />                    
                    <ModeSwitch />
                    <Link
                        target="_blank"
                        rel="noopener"
                        href="https://github.com/BYSooooo/Next_Template">
                        <GitHub sx={{ color : 'ghostwhite'}} fontSize='large' />
                    </Link>
                
                </Grid>
                
            </Grid>
        </AppBar>        
    )
}