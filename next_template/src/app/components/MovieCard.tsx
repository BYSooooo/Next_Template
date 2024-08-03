import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';

import { SxProps, Theme } from '@mui/material';

/**
 * Component for Route to Movie Page
 * 
 * @param {string} path - Movie Page's URL 
 * 
 */
export default function MovieCard({path} : {path: string}) {
    const iconStyle : SxProps<Theme> = {
        width : 30, 
        height : 30,
        boxShadow : 1
    }

    return (
        <Card sx={{maxWidth : 350, borderRadius : 1, minHeight : 350}}>
            <CardActionArea 
                LinkComponent={'a'}
                href={'https://next-movie-l452m4erm-bysooooos-projects.vercel.app'}>
                <CardContent>
                    <Stack direction='column' rowGap={0.5}>
                        <Typography gutterBottom={false} variant='h5' component="div" fontWeight='bold'>
                            Movie Info
                        </Typography>
                        <Typography variant='body2' color='GrayText'>
                            Search Movie by Keyword, Cast Info, Collection and View Detail Information
                        </Typography>
                        <Divider />
                        <Stack direction='row' columnGap={3}>
                            <Typography variant='subtitle1' color='gray' >
                                Stack
                            </Typography>
                            <Stack direction='column' rowGap={1}>
                                <Stack direction='row' columnGap={1} alignItems='center'>
                                    <Avatar 
                                        sx={iconStyle} 
                                        src="https://avatars.githubusercontent.com/u/33663932?s=200&v=4"/>
                                    <Typography variant='body2'>
                                        Material-UI
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
                                    src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"/>
                                    <Typography variant='body2'>
                                        The Movie DB_API
                                    </Typography>
                                </Stack>
                                <Stack direction='row' columnGap={1} alignItems='center'>
                                    <Avatar
                                        sx={{ width : 30, height : 30, boxShadow : 1, backgroundColor : 'purple'}}
                                        src="https://d33wubrfki0l68.cloudfront.net/97f337956b87f4589dbf68591f22f5f3dacf2736/55f2a/img/redux_white.svg"/>
                                    <Typography variant='body2'>
                                        Redux-Toolkit
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