import * as React from 'react'

import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import SearchMain from './searchFilter/FilterMain';


export default function CriteriaBtn() {

    const [state, setState] = React.useState({
        top : false, left : false, bottom : false, right : false
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

    return (
        <>
            <Button sx={{ width : '100%' }}onClick={toggleDrawer('left', true)} variant='contained'>
                <KeyboardArrowDown />
                <Typography variant='subtitle2'>
                    Filter
                </Typography>
            </Button>
            <React.Fragment>    
                <SwipeableDrawer
                    anchor="left"
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                    onOpen={toggleDrawer('left', true)}>
                    {<SearchMain />}
                </SwipeableDrawer>
            </React.Fragment>
            
        </>           
    )
}