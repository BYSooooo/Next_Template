import React from 'react';

import { GitHub } from '@mui/icons-material';
import { AppBar, Box, Link, Stack } from '@mui/material';
import ModeSwitch from './ModeSwitch';


export default function TopBar() {
    
    
    return (
        <AppBar position='fixed'>
            <Box sx={{ px : 2, py : 1}}>
                <Stack direction='row' alignItems='center' justifyContent='end'>
                    <ModeSwitch />
                    <Link
                        target="_blank"
                        rel="noopener"
                        href="https://github.com/BYSooooo/Next_Template">
                        <GitHub sx={{ color : 'ghostwhite'}} fontSize='large' />
                    </Link>
                </Stack>
            </Box>
        </AppBar>        
    )
}