import React from 'react';
import { Box, Tab, Tabs, Typography } from "@mui/material";

export default function DetailMedia({theme, path} : {theme : boolean, path : MovieDetail}) {
    const [index, setIndex] = React.useState(0)
    const handleChange = (event : React.SyntheticEvent, newValue : number)=> {
        setIndex(newValue)
    }
    return (
        <Box 
            display='row'
            textAlign='start' 
            sx={{
                py : 1,
                px : 2
            }}>
            <Box display="column" flexDirection='column'>
                <Typography variant="h6" fontWeight='bold'>
                    Media
                </Typography>
                <Tabs value={index} onChange={handleChange}>
                    <Tab 
                        label="Video" value={0}/>
                    <Tab label="Poster" value={1}/>
                </Tabs>
                
                <Box>
                    
                </Box>
            </Box>    
        </Box>
        
    )
}