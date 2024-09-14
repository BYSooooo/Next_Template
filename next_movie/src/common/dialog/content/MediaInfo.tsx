"use client"

import { Box, Button, DialogActions, DialogContent, DialogTitle, Link, List, ListItemButton, ListItemIcon, ListItemText, Tab, Tabs, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { controlDialog } from "../../../redux/features";
import React from "react";
import { Image, ImageNotSupported, NotStarted, SmartDisplay } from "@mui/icons-material";
import ReactPlayer from "react-player";
import { grey } from "@mui/material/colors";

export default function MediaInfo({theme} : {theme: boolean }) {
    const [index, setIndex] = React.useState(0)
    const [selVideo, setSelVideo] = React.useState<{idx : number, path : string}>()
    const [selImage, setSelImage] = React.useState<{idx : number, path : string}>()
    
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
        if(newValue === 1) setSelVideo(null)
        if(newValue === 0) setSelImage(null)
    }

    const onClickItemImage = (idx : number, path : string)=> {
        setSelImage({idx : idx, path : path})
    }

    const tabStyle: React.CSSProperties = {
        borderRadius : 5,
        fontSize : '0.8rem',
        
    }

    return (
        <>
            <DialogTitle>
                Media
            </DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="row">
                    <Box flexDirection="column" width="100%">
                        <Tabs value={index} onChange={handleChange}>
                            <Tab style={tabStyle} label="Video" value={0} />
                            <Tab style={tabStyle} label="Image" value={1} />
                        </Tabs>
                        <TabPanel value={index} index={0}>
                            <Box width="auto" display="flex" flexDirection="row">
                                <Box 
                                    display="flex"
                                    flexDirection="column"
                                    minWidth="70%" 
                                    height="50vh" 
                                    bgcolor={theme ? grey[800] : grey[200]}
                                    alignItems="center"
                                    justifyContent="center"
                                    overflow="hidden"
                                    borderRadius={4}>
                                    {selVideo 
                                    ?(
                                        <ReactPlayer 
                                            width="100%" height="50vh"
                                            url={`https://www.youtube.com/watch?v=${selVideo.path}`}
                                        />
                                    ):(
                                        <>
                                            <NotStarted sx={{ fontSize : 100}}/>
                                            <Typography>
                                                Select List
                                            </Typography>    
                                        </>
                                    )}
                                </Box>
                                <List sx={{ width : "30%", height : "50vh", overflowY : "scroll", textOverflow : 'ellipsis', textWrap : 'hidden', overflowX : 'hidden', ml : "1rem"}}>
                                    {dialogReducer.videos.results.map((video :VideoInfo, idx: number)=> {
                                        return (
                                            <ListItemButton 
                                                key={video.id} 
                                                selected={selVideo ? selVideo.idx === idx : false}
                                                onClick={()=> setSelVideo({idx : idx, path : video.key})} 
                                                sx={{ borderRadius : 4 , textOverflow : 'ellipsis'}}>
                                                <ListItemIcon>
                                                    <SmartDisplay />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={video.name} 
                                                    secondary={video.type}
                                                    sx={{ textWrap : 'nowrap', textOverflow : 'ellipsis'}} />
                                            </ListItemButton>
                                        )
                                    })}
                                </List>
                            </Box>
                        </TabPanel>
                        <TabPanel value={index} index={1}>
                            <Box width="auto" display="flex" flexDirection="row">
                                <Box 
                                    display="flex"
                                    flexDirection="column"
                                    maxWidth="70%" 
                                    height="50vh" 
                                    bgcolor={theme ? grey[800] : grey[200]}
                                    alignItems="center"
                                    justifyContent="center"
                                    borderRadius={4}
                                    position="relative"
                                    overflow="hidden">
                                    {selImage ? (
                                        <Box
                                            maxWidth="100%"
                                            maxHeight="100%"
                                            textAlign="center">
                                            <Link
                                                href={`https://image.tmdb.org/t/p/original${selImage.path}`} 
                                                target='_blank' 
                                                rel='noreferrer'>
                                                <Box
                                                    component="img"
                                                    src={`https://image.tmdb.org/t/p/w780${selImage.path}`}
                                                    borderRadius={4}
                                                    sx={{
                                                        maxWidth: "100%",
                                                        maxHeight: "100%",
                                                        objectFit: "contain", 
                                                        width: "auto", 
                                                        height: "auto", 
                                                    }}>
                                                </Box>
                                            </Link>
                                        </Box>
                                    ) : (
                                        <>
                                            <ImageNotSupported sx={{ fontSize : 100}}/>
                                            <Typography>
                                                Select List
                                            </Typography>    
                                        </>
                                    )}
                                </Box>
                                <List 
                                    sx={{ 
                                        width : "30%", 
                                        height : "50vh", 
                                        overflowY : "scroll", 
                                        overflowX : 'hidden', 
                                        textOverflow : 'ellipsis', 
                                        textWrap : 'hidden', 
                                        ml : "1rem"}}>
                                    {dialogReducer.images.posters.map((item : ImageInfo, idx: number)=> {
                                        return (
                                            <ListItemButton
                                                key={item.file_path}
                                                selected={selImage ? selImage.idx === idx : false}
                                                onClick={()=> onClickItemImage(idx,item.file_path)}
                                                sx={{
                                                    borderRadius : 4
                                                }}>
                                                <ListItemIcon>
                                                    <Image />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={`Image_${idx}`}
                                                
                                                />
                                            </ListItemButton>
                                        )
                                    })}
                                </List>
                            </Box>
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