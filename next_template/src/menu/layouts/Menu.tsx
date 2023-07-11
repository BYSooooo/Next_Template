"use client";

import { MenuOpenRounded } from '@mui/icons-material';
import { AppBar, Box, Button, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, SwipeableDrawer, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
interface menuItem {
    path : string,
    text : string
}


export default function Menu() {
    const basicMenuItem : menuItem[] = 
        [
            { path : "/", text : "Home"},
            { path : "about", text: "About"} 
        ]
    const contentMenuItem : menuItem[] = 
        [
            { path: "movie", text : "Movie_Info" }, 
            { path : "sample01", text : "Making..."}
        ]

    const [state, setState] = React.useState({
        top : false,
        left : false,
        bottom : false,
        right : false
    })

    const toggleDrawer = (anchor : string, open : boolean) => (
        event : React.KeyboardEvent | React.MouseEvent
    ) => {
        if( event &&
            event.type === 'keydown' &&
            ( (event as React.KeyboardEvent).type === 'Tab' ||
                (event as React.KeyboardEvent).type === 'Shift')) 
        {
            return;
        }
        setState({...state, [anchor] : open})
    }

    const list = (anchor : string) => (
        <Box 
            sx={{width: 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}>
            <List>
                { basicMenuItem.map(item => 
                    <ListItem disablePadding key={item.path}>
                        <ListItemButton component="a" href={item.path}>
                            <ListItemText  primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ) } 
            </List>
            <Divider />
            <List>
            { contentMenuItem.map(item => 
                    <ListItem disablePadding key={item.path}>
                        <ListItemButton component="a" href={item.path} >
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ) } 

            </List>
        </Box>    
    )
    return (
        <AppBar position='fixed' enableColorOnDark >
            <Toolbar>
                <IconButton
                    size='large'
                    edge="start"
                    color='inherit'
                    aria-label='menu'
                    onClick={toggleDrawer('left', true)}>
                    <MenuOpenRounded />
                </IconButton>
            </Toolbar>
            <React.Fragment>    
                <SwipeableDrawer
                    anchor="left"
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                    onOpen={toggleDrawer('left', true)}>
                    {list('left')}
                </SwipeableDrawer>
            </React.Fragment>
        </AppBar>
    )
}