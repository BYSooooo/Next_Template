import React from 'react';

import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';


export default function showAlert({message} : {message : string}) {    
    const [open, setOpen] = React.useState(false);
    const containRef = React.useRef(null);

    const handleChange =()=> {
        setOpen((prev)=> !prev)
    }
    
    return (
        <Slide direction='up' in={open} onChange={handleChange} container={containRef.current}>
            <Stack sx={{width : "100%"}} spacing={2}>
                <Alert variant='outlined' severity='error'>
                    {message}
                </Alert>
            </Stack>
        </Slide>
    )

}

