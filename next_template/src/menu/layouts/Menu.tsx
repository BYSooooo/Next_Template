"use client";

import * as React from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem  from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';


import { useRouter } from 'next/navigation';
import { GitHub, LightMode, MenuOpenRounded } from '@mui/icons-material';
import ModeSwitch from '../components/ModeSwitch';

const basicMenuItem : menuItem[] = 
[
    { path : "/", text : "Home"},
    // { path : "/about", text: "About"} 
]
const contentMenuItem : menuItem[] = 
[
    { path: "/movie", text : "Movie" }, 
    { path : "/messenger", text : "Messenger"},
    { path : "/shopping", text : "Shopping" }
]

export default function Menu() {
    const router = useRouter();
    const [state, setState] = React.useState({
        top : false,
        left : false,
        bottom : false,
        right : false
    })
    
    const toggleDrawer = (anchor: string, open: boolean) => (
        event : React.KeyboardEvent | React.MouseEvent
    ) => {
        if( event && 
            event.type === 'keydown' &&
            (   
                (event as React.KeyboardEvent).type === 'Tab' ||
                (event as React.KeyboardEvent).type === 'Shift'
            ))
        { return; }
         setState({...state, [anchor] : open})
    }

    
    const list = (anchor : string) => (
        <Box sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)} >
            <List>
                {basicMenuItem.map(item => 
                <ListItem disablePadding key={item.path}>
                    <ListItemButton component="a" href={item.path}>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                </ListItem>
                )}
            </List>
            <Divider />
            <List>
                {contentMenuItem.map(item => <ListItem disablePadding key={item.path}>
                    <ListItemButton component="a" href={item.path}>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                </ListItem>
                )}
            </List>
        </Box>    
    )

    return (
        <AppBar position='fixed'>
            <Container sx={{ display : 'flex'}}>
                <Box sx={{ flexGrow : 1}}>
                    <IconButton
                        sx={{ ml : 2 }}
                        size='large'
                        edge="start"
                        color='inherit'
                        aria-label='menu'
                        onClick={toggleDrawer('left', true)}>
                        <MenuOpenRounded fontSize='large'/>
                    </IconButton>
                    <React.Fragment>    
                        <SwipeableDrawer
                            anchor="left"
                            open={state['left']}
                            onClose={toggleDrawer('left', false)}
                            onOpen={toggleDrawer('left', true)}>
                            {list('left')}
                        </SwipeableDrawer>
                    </React.Fragment>
                </Box>
                <Box sx={{ flexGrow : 0, pt : 1.5}}>
                    <Stack direction='row' alignItems='center'>
                        <LightMode />
                        <ModeSwitch />
                        <Link 
                            target='_blank' rel='noopener'
                            href='https://github.com/BYSooooo/Next_Template'>
                            <GitHub sx={{ color : 'ghostwhite'}} fontSize='large'/>
                        </Link> 
                    </Stack>
                    </Box>
            </Container>
        </AppBar>
    )
}

            