import React from 'react'

import Paper from "@mui/material/Paper";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';

export default function DetailRate({rating} : {rating : number}) {
    const [rate, setRate] = React.useState(0)
    
    React.useEffect(()=> {
        setRate(rating)
    },[rating])
    console.log(rate)

    return (
        <Paper elevation={3} sx={{borderRadius : "0.5rem", height : 'auto', mt : 1}}>
            <Stack direction='column' sx={{ p : 1}}>
                <Typography variant='h6' fontWeight='bold'>
                    Rate
                </Typography>
                <Stack direction='row'>                    
                    <Stack 
                        direction='column' 
                        alignItems='center'
                        justifyContent='center' 
                        sx={{ borderRadius : '0.5rem', width : "40%", height : '20vh', backgroundColor : 'ghostwhite'}}>
                        <Typography variant= 'h3' fontWeight='bold' sx={{}}>
                            {rate}
                        </Typography>
                        <Rating readOnly value={rate} precision={0.25} max={10}/>
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    )
}