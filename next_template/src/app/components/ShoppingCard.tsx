import { Avatar, Card, CardActionArea, CardContent, Divider, Stack, SxProps, Theme, Typography } from "@mui/material";

export default function ShoppingCard({path} : {path : string}) {
    const iconStyle : SxProps<Theme>  = {
        width : 30,
        height : 30,
        boxShadow : 1
    }

    return (
        <Card sx={{maxWidth : 350, borderRadius : 1, minHeight : 350}}>
            <CardActionArea href={`${path}`}>
                <CardContent>
                    <Stack direction='column' rowGap={0.5}>
                        <Typography gutterBottom={false} variant='h5' component='div' fontWeight='bold'>
                            Shopping
                        </Typography>
                        <Typography variant="body2" color="GrayText">
                            (In Dev) Product search and detailed information viewing, shopping cart function
                        </Typography>
                        <Divider />
                        <Stack direction={'row'} columnGap={3}>
                            <Typography variant="subtitle1" color="gray">
                                Stack
                            </Typography>
                            <Stack direction={'column'} rowGap={1}>
                                <Stack direction='row' columnGap={1} alignItems='center'>
                                    <Avatar 
                                        sx={iconStyle} 
                                        src="https://raw.githubusercontent.com/nextui-org/nextui/main/apps/docs/public/isotipo.png">
                                    </Avatar>
                                    <Typography variant="body2">
                                        Next UI
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
                                        src="https://avatars.githubusercontent.com/u/14985020?s=200&v=4"/>
                                    <Typography variant='body2'>
                                        Vercel Storage
                                    </Typography>
                                </Stack>
                                <Stack direction='row' columnGap={1} alignItems='center'>
                                    <Avatar
                                        sx={iconStyle}
                                        src="https://www.postgresql.org/media/img/about/press/elephant.png"/>
                                    <Typography variant='body2'>
                                        PostgresSQL
                                    </Typography>
                                </Stack>
                                <Stack direction='row' columnGap={1} alignItems='center'>
                                    <Avatar
                                        alt='TS' 
                                        sx={iconStyle} 
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png"/>
                                    <Typography variant='body2'>
                                        TypeScript
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>                        
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    )

}