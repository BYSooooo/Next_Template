import { Avatar, Card, CardActionArea, Stack, Typography } from "@mui/material";



export default function MessengerCard() {

    const ICON_TAILWIND = ''


    return (
        <CardActionArea>
            <Card sx={{ p: 2, borderRadius : 1}}>
                <Stack direction={'column'}>
                    <Typography 
                        variant="h5"
                        fontWeight='bold'>
                        Next Messenger
                    </Typography>
                    <Typography variant="subtitle2">
                        Chat with other user and manage frineds
                    </Typography>
                    <Stack direction='column' rowGap={1}>
                        <Typography variant='body1'>
                            Stack
                        </Typography>
                        <Stack direction='row' columnGap='1' alignItems='center'>
                            <Avatar 
                                sx={{width : 30, height : 30, boxShadow : 1 }}
                                src='https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg'>

                            </Avatar>
                        </Stack>
                    </Stack>
                </Stack>
            </Card>
        </CardActionArea>
    )
}