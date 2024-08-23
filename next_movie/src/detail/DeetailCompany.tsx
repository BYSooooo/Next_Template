import { Box, Typography } from "@mui/material";

export default function DetailCompany({theme,path} : {theme : boolean, path : MovieDetail}) {
    
    return (
        <Box display='flex' flexDirection='column'>
            <Box display='flex' flexDirection='column' alignItems='start'>
                <Typography variant="h6" fontWeight='bold' sx={{ mt : 1, px :2}}>
                    Company
                </Typography>  
                <Box width="100%" overflow="scroll">
                    <Box>
                        
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}