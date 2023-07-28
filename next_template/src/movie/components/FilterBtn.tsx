import * as React from 'react'
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { SwipeableDrawer } from '@mui/material';
import SearchFilterMain from './searchFilter/SearchFilterMain';

export default function FilterBtn() {

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
            <Button sx={{ width: "100%", height : "100%" }} onClick={toggleDrawer('bottom', true)} >
                <KeyboardArrowDown />
                <Typography>
                    Filter
                </Typography>
            </Button>
            <React.Fragment>    
                <SwipeableDrawer
                    anchor="bottom"
                    open={state['bottom']}
                    onClose={toggleDrawer('bottom', false)}
                    onOpen={toggleDrawer('bottom', true)}>
                    {<SearchFilterMain />}
                </SwipeableDrawer>
            </React.Fragment>
            
        </>           
    )
}