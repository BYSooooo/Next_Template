import React from 'react';
import { Box, colors, Tab, Tabs, Typography } from "@mui/material";


const TabPanel = (props : {children? : React.ReactNode, index : number, value : number} )=> {
    const { children, value, index, ...other } = props;
    return (
        <div 
            role="tabpanel"
            hidden={value !== index}
            id={`simple-palen-${index}`}
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
                <Box display="flex" flexDirection='row' alignItems='center'>
                    <Typography 
                        variant="h6" 
                        fontWeight='bold'>
                        Media
                    </Typography>
                    <Tabs value={index} onChange={handleChange}>
                        <Tab style={tabStyle} label="Video" value={0}/>
                        <Tab style={tabStyle} label="Poster" value={1}/>
                    </Tabs>
                </Box>
                <Box>
                    <TabPanel value={index} index={0}>
                        <Box display="flex" flexDirection="row">

                        </Box>
                    </TabPanel>
                    <TabPanel value={index} index={1}>
                        <Typography>
                            Hello2
                        </Typography>
                    </TabPanel>
                </Box>    
            </Box>

        </Box>
        
    )
}