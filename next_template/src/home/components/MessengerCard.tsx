"use client";

import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';
import React from 'react';

/**
 * Component for Route to Messenger Page
 * (Not Developed)
 * 
 * @param {string} path - Messenager Page's URL
 * 
 */
export default function MessengerCard({path} : {path : string}) {
    const [url, setUrl] = React.useState('');
    
    React.useEffect(()=> {
        setUrl(path)
    },[])

    const iconStyle : SxProps<Theme> = {
        width : 30, 
        height : 30,
        boxShadow : 1
    }
    
    return (
        <Card sx={{maxWidth : 350, borderRadius : 1}}> 
            <CardActionArea href={`${url}`}>
                <CardContent>
                    <Stack direction='column' rowGap={0.5}>
                        <Typography gutterBottom={false} variant='h5' component="div" fontWeight='bold'>
                            Messenger
                        </Typography>
                        <Typography variant='body2' color='GrayText'>
                            (In Development...) Write & Send Message to Other People
                        </Typography>
                        <Divider />
                        <Stack direction='row' columnGap={3}>
                            <Typography variant='subtitle1' color='gray' >
                                Core
                            </Typography>
                            <Stack direction='column' rowGap={1}>
                                <Stack direction='row' columnGap={1} alignItems='center'>
                                    <Avatar 
                                        sx={iconStyle}
                                        src='https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg'/>
                                     <Typography variant='body2'>
                                        Tailwind CSS
                                    </Typography>    
                                </Stack>
                                <Stack direction='row' columnGap={1} alignItems='center'>
                                    <Avatar
                                        sx={iconStyle}
                                        src="https://camo.githubusercontent.com/39791c3e4c4387b8b913628a8f258768ea3a4a71fc815ced2219f81c22c71f6a/68747470733a2f2f6173736574732e76657263656c2e636f6d2f696d6167652f75706c6f61642f76313636323133303535392f6e6578746a732f49636f6e5f6c696768745f6261636b67726f756e642e706e67"/>
                                    <Typography variant='body2'>
                                        Next.js
                                    </Typography>
                                </Stack>
                                <Stack direction='row' columnGap={1} alignItems='center'>
                                    <Avatar 
                                        sx={iconStyle}
                                        src="https://firebase.google.com/static/images/brand-guidelines/logo-logomark.png"
                                    />
                                    <Typography variant='body2'>
                                        Firebase
                                    </Typography>

                                </Stack>
                            </Stack>
                        </Stack>
                        <Divider />
                        <Typography variant='subtitle1' color='gray' >
                            Other
                        </Typography>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}