import { SwipeableDrawer } from "@mui/material";
import * as React from "react";

/**
 * Now Working Component
 * @param anchor The starting point where the screen will be displayed
 * @param component The Component to Display
 * 
 */
export default function ToggleDrawer({anchor, component} : {anchor : 'top' | 'left' | 'bottom' | 'right' , component : React.JSX.Element}) {

    const [state, setState] = React.useState({
        top : false, left : false,bottom : false, right : false
    })
    return function Drawer(event : React.KeyboardEvent | React.MouseEvent) {
        if( event && 
            event.type === 'keydown' &&
            (   
                (event as React.KeyboardEvent).type === 'Tab' ||
                (event as React.KeyboardEvent).type === 'Shift'
            ))
        { return; }
         setState({...state, [anchor] : open})
         console.log(event)
        return (
            <React.Fragment>
            <SwipeableDrawer
                anchor={anchor}
                open={state[anchor]}
                onClose={this(anchor, false)}
                onOpen={this(anchor, true)}>
                {component}
            </SwipeableDrawer>
        </React.Fragment>
        )
    }        
}