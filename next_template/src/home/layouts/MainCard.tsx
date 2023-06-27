"use client";

import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import * as React from 'react';

export default function MainCard({path} : {path: string}) {
    const [url, setUrl] = React.useState("");
    React.useEffect(()=> {
        setUrl(path)
    },[])
    return (
        <Card sx={{maxWidth : 350}}>
            <CardActionArea href={`${url}`}>
                <CardMedia
                    component="img"
                    height="200"
                    image=''
                    alt='' />
                <CardContent>
                    <Typography gutterBottom variant='h5' component="div">
                        Movie Page
                    </Typography>
                    <Typography variant='body2' color="text.secondary">
                        This is Movie_Info Card<br />
                        If you click this Card, you route to Movie_Info Page
                    </Typography>
                </CardContent>

            </CardActionArea>
        </Card>
    )

}