import * as React from 'react'
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, SwipeableDrawer } from '@mui/material';
import ToggleDrawer from './ToggleDrawer';




export default function FilterBtn() {

    const filterBar = (anchor : string) => (
        <Box sx={{width : "100%"}}
            role="presentation">
        <Typography>
            Hello
        </Typography>
        </Box>
    )
    

    return (
        <>
            <Button sx={{ width: "100%", height : "100%" }} onClick={ToggleDrawer('bottom', true)}>
                <KeyboardArrowDown />
                <Typography>
                    Filter
                </Typography>
            </Button>
            <React.Fragment>
                <SwipeableDrawer
                    anchor="bottom"
                    open={false}
                    onClose={ToggleDrawer('bottom', false)}
                    onOpen={ToggleDrawer('bottom',true)}>
                {filterBar('bottom')}
                </SwipeableDrawer>
            </React.Fragment>
        </>           
    )
}