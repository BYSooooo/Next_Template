"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { GitHub, Info, MenuOpenRounded } from '@mui/icons-material';
import { AppBar, Box, Container, Divider, Icon, IconButton, Link, List, ListItem, ListItemButton, ListItemText, Modal, Stack, SwipeableDrawer, Toolbar, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import MovieInform from '../components/MovieInform';


const basicMenuItem : menuItem[] = 
[
    { path : "/", text : "Home"},
    { path : "/about", text: "About"} 
]
const contentMenuItem : menuItem[] = 
[
    { path: "/movie", text : "Movie" }, 
    { path : "/sample01", text : "Making..."}
]

export default function Menu() {
    const router = useRouter();
    const [open, setOpen] = React.useState(false)

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

    const onClick = (event : React.MouseEvent, item : string)=> {
        event.preventDefault()
        router.push(item)
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

    const toggleInform = ()=> {
        setOpen(true)
    }
    

    return (
        <Stack sx={{ paddingInline : 5 }} direction='row' alignItems='baseline' >
            <IconButton
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

            <IconButton 
                size='large'
                color='inherit'
                aria-label='information'
                edge='start'
                onClick={toggleInform}>
                    <Info fontSize='large'/>
            </IconButton>
            <Modal
                open={open}
                onClose={()=>setOpen(false)}>
                    <MovieInform />
            </Modal>
            <Link 
                target='_blank' rel='noopener'
                href='https://github.com/BYSooooo/Next_Template'>
                <GitHub color='inherit' fontSize='large'/>
            </Link>
            
        </Stack>
    )
}