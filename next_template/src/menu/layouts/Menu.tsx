"use client";

import ToggleDrawer from '@/movie/components/ToggleDrawer';
import { MenuOpenRounded } from '@mui/icons-material';
import { AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, SwipeableDrawer, Toolbar, Typography } from '@mui/material';
import * as React from 'react';

export default function Menu() {
    const [toggleMenu, setToggleMenu] = React.useState(false);

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

    const list = (anchor : string) => (
        <Box sx={{ width: 250 }}
            role="presentation"
            onClick={ToggleDrawer(anchor, false)}
            onKeyDown={ToggleDrawer(anchor, false)} >
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
        <AppBar position='fixed' enableColorOnDark >
            <Toolbar>
                <IconButton
                    size='large'
                    edge="start"
                    color='inherit'
                    aria-label='menu'
                    onClick={ToggleDrawer('left', true)}>
                    <MenuOpenRounded />
                </IconButton>
            </Toolbar>
            <React.Fragment>    
                <SwipeableDrawer
                    anchor="left"
                    open={state['left']}
                    onClose={ToggleDrawer('left', false)}
                    onOpen={ToggleDrawer('left', true)}>
                    {list('left')}
                </SwipeableDrawer>
            </React.Fragment>
        </AppBar>
    )
}