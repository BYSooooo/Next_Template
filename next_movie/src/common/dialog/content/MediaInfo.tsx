"use client"

import { Box, Button, DialogActions, DialogContent, DialogTitle, List, ListItemButton, ListItemIcon, ListItemText, Tab, Tabs, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { controlDialog } from "../../../redux/features";
import React from "react";
import { SmartDisplay } from "@mui/icons-material";
import ReactPlayer from "react-player";

export default function MediaInfo({theme} : {theme: boolean }) {
    const [index, setIndex] = React.useState(0)
    const [selList, setSelList] = React.useState<{idx : number, videoPath : string}>()
    const dialogReducer = useAppSelector((state)=> state.dialogReducer).extraInfo;
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
                <Box display="flex" flexDirection="row">
                    <Box flexDirection="column">
                        <Tabs value={index} onChange={handleChange}>
                            <Tab style={tabStyle} label="Video" value={0} />
                            <Tab style={tabStyle} label="Image" value={1} />
                        </Tabs>
                        <TabPanel value={index} index={0}>
                            <Box width="100%" display="flex" flexDirection="row">
                                {selList ?(
                                    <ReactPlayer 
                                        width="auto" height="50vh"
                                        url={`https://www.youtube.com/watch?v=${selList.videoPath}`}
                                    />
                                ):(
                                    <Box width="20rem" height="50vh">
                                        Select List
                                    </Box>    
                                ) }
                                
                                <List sx={{ width : "10rem", height : "50vh", overflowY : "scroll"}}>
                                    {dialogReducer.videos.results.map((video :VideoInfo, idx: number)=> {
                                        return (
                                            <ListItemButton 
                                                key={video.id} 
                                                selected={selList ? selList.idx === idx : false}
                                                onClick={()=> setSelList({idx : idx, videoPath : video.key})} 
                                                sx={{ borderRadius : 4}}>
                                                <ListItemIcon>
                                                    <SmartDisplay />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={video.name} 
                                                    secondary={video.type} 
                                                    sx={{ textOverflow : 'clip', textWrap : "nowrap"}}/>
                                            </ListItemButton>
                                        )
                                    })}
                                </List>
                            </Box>
                        </TabPanel>
                        <TabPanel value={index} index={1}>
                            panel2
                        </TabPanel>

                        
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