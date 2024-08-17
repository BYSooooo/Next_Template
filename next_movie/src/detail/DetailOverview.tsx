import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function DetailOverview({theme, path} : {theme : boolean, path : string}) {
    const innerBoxStyle = ()=> theme ? grey[800] : grey[300];
    
    return (
        <Box 
            borderRadius={4}
            bgcolor={theme ? grey[900]: grey[100] }
            sx={{
                my : 1,
                py : 1,
                px : 2
            }}
            >
            <Typography 
                textAlign='start'
                variant='h6'
                fontWeight='bold' 
                sx={{ 
                    textDecoration : 'underline'}}
                >
                Overview
            </Typography>
            <Box 
                borderRadius={4}
                textAlign='start'
                bgcolor={innerBoxStyle}
                sx={{ p : 2}}>
                <Typography >
                    {path}
                </Typography>
            </Box>
        </Box>
    )
}