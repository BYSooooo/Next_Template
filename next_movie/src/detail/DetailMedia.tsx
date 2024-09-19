import React from 'react';
import { Box, colors, Tab, Tabs, Typography } from "@mui/material";
import DetailVideoList from './DetaiVideoList';
import DetailImageList from './DetailImageList';


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
    const handleChange = (event : React.SyntheticEvent, newValue : number)=> {
        setIndex(newValue)
    }

    const tabStyle : React.CSSProperties = {
        borderRadius : 4,
        fontSize : '1rem',
        fontWeight : 'bold',
        
    }
    return (
        <Box 
            display='row'
            textAlign='start' 
            sx={{
                px : 2
            }}>
            <Box display='flex' flexDirection='column'>
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

        </Box>
        
    )
}