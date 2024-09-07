"use client"

import { Box, Button, DialogActions, DialogContent, DialogTitle, Tab, Tabs, Typography } from "@mui/material"
import { useAppDispatch } from "../../../redux/hooks"
import { controlDialog } from "../../../redux/features";
import React from "react";

export default function MediaInfo({theme} : {theme: boolean }) {
    const [index, setIndex] = React.useState(0)
    const dispatch = useAppDispatch();
    
    const onClickClose = ()=> {
        dispatch(controlDialog({ openYn : false, name : ""}))
    }

    const TabPanel =(props : {children? : React.ReactNode, index : number, value : number})=> {
        const { children, value, index, ...other} = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-panel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}>
                { value === index && <Box>{children}</Box>}
            </div>
        )
    }

    const handleChange = (event : React.SyntheticEvent, newValue : number)=> {
        setIndex(newValue)
    }

    const tabStyle: React.CSSProperties = {
        borderRadius : 5,
        fontSize : '0.8rem',
        width : '50%'
    }

    return (
        <>
            <DialogTitle>
                Media
            </DialogTitle>
            <DialogContent>
                <Tabs value={index} onChange={handleChange}>
                    <Tab style={tabStyle} label="Video" value={0} />
                    <Tab style={tabStyle} label="Image" value={1} />
                </Tabs>
                <Box>
                    <TabPanel value={index} index={0}>
                        <Box width="100%" height="50vh">

                        </Box>
                    </TabPanel>
                    <TabPanel value={index} index={1}>
                        panel2
                    </TabPanel>
                </Box>
                <Typography variant="subtitle1">
                    List
                </Typography>
                <Box width="100%" display="flex" flexDirection="row">
                    <Box width="100%" overflow="scroll" display="flex">
                        
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=> onClickClose()}>
                    close
                </Button>
            </DialogActions>
        </>
    )
}