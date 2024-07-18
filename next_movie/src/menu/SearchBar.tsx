"use client"

import { TextField } from "@mui/material";

export default function SearchBar() {
    
    return (
        <TextField
            sx={{
                '& .MuiInputBase-input' : {
                    width : '13rem',
                    transition : '0.5s ease-in-out',
                    '&:focus' : {
                        width : '20rem'
                    }
                }
            }}
            // onKeyDown={(event)=> {
            //     (event.key === 'Enter' && setKeyDown(true))
            // }}
            placeholder="Search Movie..."
            color="primary"
            margin="none"
            hiddenLabel
            variant="filled"
            size="small"
        />
    )
}