import React from 'react';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

import { getCastInfo } from '../../FetchData';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { CalendarMonth, Man, Place } from '@mui/icons-material';
import ModalTopIcon from './ModalTopIcon';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';
import { closeDetailModal } from '@/redux/features/movieReducer';

export default function DetailCastModal() {
    const detailModal = useAppSelector((state) => state.detailModal);
    const [cast, setCast] = React.useState<PersonInfo>(null);
    const [themeMode, setThemeMode] = React.useState('');
    const dispatch = useAppDispatch();
    const router = useRouter()
    
    React.useEffect(()=> {
        getPersonInfo()
        setThemeMode(window.localStorage.getItem('mode'))
        
    },[])

    const getPersonInfo = () => {
        getCastInfo(detailModal.value[0]).then((result) => {
            setCast(result)
        })
    }

    const genderText = () => {
        switch (cast.gender) {
            case 0 : return 'No Info';
            case 1 : return 'Female';
            case 2 : return 'Male';
            case 3 : return 'Non-binary'
            default : break;       
        }
    }

    const onClick =(id : number) => {
        dispatch(closeDetailModal());
        router.push(`/movie/detail/${id}`)
    }

    return (
        <Container disableGutters sx={{ p : 1}}>
            { cast ? 
                <Grid direction='column'>
                    <Grid container direction='row'>
                        <Grid >
                            {cast.profile_path ?
                                <img 
                                    loading='lazy'
                                    src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`}
                                    style={{ width : 150, height : 225, borderRadius : '0.5rem'}}/>
                             :
                                <Box sx={{ width : 150, height : 225, borderRadius : '0.5rem', border : '1px solid gray'}}
                                    alignItems='stretch'>
                                    <Typography>
                                        Not Image
                                    </Typography>
                                </Box>
                             }
                        </Grid>
                        <Grid direction='column' sx={{ paddingInline : 1 }} >
                            <Grid>
                                <ModalTopIcon cast={cast} mode={themeMode}/>
                            </Grid>
                            <Typography variant='h4' fontWeight='bold'>
                                {cast.name}
                            </Typography>
                            <Typography variant='body1' color='gray'>
                                {cast.known_for_department}
                            </Typography>
                            <Grid container direction='row' sx={{ mt : 1}} columnGap={1} >
                                <Tooltip title='Birthday'>
                                    <Chip icon={<CalendarMonth />} label={cast.birthday ? cast.birthday : 'Not Informed'} size='small'/>
                                </Tooltip>
                                <Tooltip title='Gender'>
                                    <Chip icon={<Man />} label={genderText()} size='small'/>
                                </Tooltip>
                            </Grid>
                            <Grid container direction='row' sx={{ mt : 1}} columnGap={1}>
                                <Tooltip title='Place of Birth'>
                                    <Chip icon={<Place />} label={cast.place_of_birth ? cast.place_of_birth : 'Not Informed'} size='small' />
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid>
                        <Typography variant='subtitle1' color='gray'>
                            Cast ({cast.combined_credits.cast.length})
                        </Typography>
                        <Stack direction='row' overflow='scroll' spacing={1} width="100%">
                            {cast.combined_credits.cast.map((item) => {
                                return (
                                    <Card key={item.id} sx={{ width : 'auto', height : 'auto', minWidth : 92}} >
                                        <CardActionArea onClick={()=> onClick(item.id)}>
                                            <Box >
                                                <CardMedia
                                                    alt={item.original_title}
                                                    component='img'
                                                    image={`https://image.tmdb.org/t/p/w92${item.poster_path}`}>
                                                </CardMedia>
                                            </Box>
                                        </CardActionArea>
                                    </Card>
                                )
                            })}

                        </Stack>
                    </Grid>
                    <Grid>
                        <Typography variant='subtitle1'>
                            Crew ({cast.combined_credits.crew.length})
                        </Typography>
                        <Stack direction='row' overflow='scroll' spacing={1} width="100%">
                            {cast.combined_credits.crew.map((item) => {
                                return (
                                    <Card key={item.id} sx={{ width : 'auto', height : 'auto', minWidth : 92}} >
                                        <CardActionArea onClick={()=> onClick(item.id)}>
                                            <Box >
                                                <CardMedia
                                                    alt={item.original_title ? item.original_title : 'Not Informed Poster'}
                                                    component='img'
                                                    image={`https://image.tmdb.org/t/p/w92${item.poster_path}`}>
                                                </CardMedia>
                                            </Box>
                                        </CardActionArea>
                                    </Card>
                                )
                            })}

                        </Stack>

                    </Grid>
                    
                </Grid>
                :
                <Grid container direction='row' width={600} height={600} alignItems='center' justifyContent='center' >
                    <CircularProgress />
                </Grid>
                
                
            }
            
        </Container>
        
    )
}