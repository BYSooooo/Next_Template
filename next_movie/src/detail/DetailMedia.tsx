import React from 'react';
import { Box, colors, Tab, Tabs, Typography } from "@mui/material";
import DetailVideoList from './DetaiVideoList';
import DetailImageList from './DetailImageList';
import { grey } from '@mui/material/colors';
import { useAppDispatch } from '../redux/hooks';
import { controlDialog } from '../redux/features';


const TabPanel = (props : {children? : React.ReactNode, index : number, value : number} )=> {
    const { children, value, index, ...other } = props;
    return (
        <div 
            role="tabpanel"
            hidden={value !== index}
            id={`simple-panel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && <Box>{children}</Box>}
        </div>
    )
}

export default function DetailMedia({theme, path} : {theme : boolean, path : MovieDetail}) {
    const [index, setIndex] = React.useState(0)
    const dispatch = useAppDispatch();
    const handleChange = (event : React.SyntheticEvent, newValue : number)=> {
        setIndex(newValue)
    }

    const onClickMediaMore = ()=> {
        dispatch(controlDialog({ openYn : true, name : "Media", extraInfo : path}))
    }

    const tabStyle : React.CSSProperties = {
        borderRadius : 4,
        fontSize : '1rem',
        fontWeight : 'bold',
        
    }
    return (
        <Box 
            display='flex'
            textAlign='start' 
            flexDirection='row'
            sx={{
                px : 2
            }}>
            <Box display='flex' flexDirection='column' width="90%">
                <Box display="flex" flexDirection='column' alignItems='start'>
                    <Typography 
                        variant="h6" 
                        fontWeight='bold'>
                        Media
                    </Typography>
                    <Tabs value={index} onChange={handleChange}>
                        <Tab style={tabStyle} label="Videos" value={0}/>
                        <Tab style={tabStyle} label="Images" value={1}/>
                    </Tabs>
                </Box>
                <Box>
                    <TabPanel value={index} index={0}>
                        <Box display="flex" flexDirection="row">
                            <DetailVideoList theme={theme} path={path}/>
                        </Box>
                    </TabPanel>
                    <TabPanel value={index} index={1}>
                        <Box display="flex" flexDirection="row">
                            <DetailImageList theme={theme} path={path} />
                        </Box>
                    </TabPanel>
                </Box>    
            </Box>
            <Box 
                display="flex" 
                width="10%"
                alignItems='end'>
                <Box 
                    display='flex'
                    flexDirection='column'
                    borderRadius={4}
                    bgcolor={theme ? grey[800] : grey[200]} 
                    alignItems='center'
                    justifyContent='center'
                    height="70%"
                    width="70%"
                    onClick={onClickMediaMore}
                    sx={{ ":hover" : {
                        bgcolor : theme ? grey[700] : grey[300] },
                        my : 1,
                        cursor : 'pointer'
                    }}>
                    <Typography>
                        More
                    </Typography>
                </Box>
            </Box>

        </Box>
        
    )
}