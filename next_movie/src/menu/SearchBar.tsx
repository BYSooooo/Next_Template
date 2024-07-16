import { Box,TextField } from "@mui/material";

export default function SearchBar() {
    
    return (
        
            <TextField 
                sx={{
                    ":focus" : {
                        width : '100%'
                    }
                }}
                margin="none"
                hiddenLabel
                variant="filled"
                size="small"/>
        
    )
}