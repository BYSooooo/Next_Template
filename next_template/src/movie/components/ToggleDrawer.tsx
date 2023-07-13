import * as React from "react";

export default function ToggleDrawer(anchor : string, open : boolean) {
    
    const [state, setState] = React.useState({
        top : false,
        left : false,
        bottom : false,
        right : false
    })
        
    return function (event : React.KeyboardEvent | React.MouseEvent ) {

        if( event && 
            event.type === 'keydown' &&
            (   
                (event as React.KeyboardEvent).type === 'Tab' ||
                (event as React.KeyboardEvent).type === 'Shift'
            )
        )
        {
            return;
        }
         setState({...state, [anchor] : open})
    }
}
