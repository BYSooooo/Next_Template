"use client";

import { MenuOpenRounded } from '@mui/icons-material';
import { Box, Button, List, ListItem, ListItemButton, ListItemText, SwipeableDrawer, Toolbar } from '@mui/material';
import * as React from 'react';

function toChageLow(item : string) {
    return item.toLocaleLowerCase();
}

export default function Menu() {
    const menuItem = ["Home", "About", "Sample01", "Sample02"]

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
                { menuItem.map(item => 
                    <ListItem disablePadding>
                        <ListItemButton component="a" href={toChageLow(item)}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ) } 
            </List>
        </Box>    
    )
    return (
        <div>
            <React.Fragment>
                <Button onClick={toggleDrawer('left', true)} >
                    <MenuOpenRounded />
                </Button>
                <SwipeableDrawer
                    anchor="left"
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                    onOpen={toggleDrawer('left', true)}>
                    {list('left')}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    )
}