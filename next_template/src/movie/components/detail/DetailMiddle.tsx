import React from 'react';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';

import { SxProps, Theme} from '@mui/material';
import { useAppSelector } from '@/redux/hook';
import DetailCrew from './middle/DetailCrew';
import DetailRate from './middle/DetailRate';

//Middle : Top Popular Crew
export default function DetailMiddle() {
    const movieDetail = useAppSelector((state)=>state.movieDetail);
    const [detail, setDetail] = React.useState<MovieDetail>(null);
    React.useEffect(()=> {
        setDetail(movieDetail[0])
    },[movieDetail])
    console.log(detail)

    const gridStyle : SxProps<Theme>= {
        border : '2px solid grey',
        borderRadius : '0.5rem',
        height : 160,
        overflow : '-moz-hidden-unscrollable'
    }

    return (
        <Stack direction='column'>
            { detail && <DetailCrew credit={detail.credits}/> }
            { detail && <DetailRate rating={detail.vote_average} count={detail.vote_count}/>}
        </Stack>


        // <Paper elevation={3} sx={{borderRadius : "0.5rem", height : 'auto', mt : 1}}>
        //    {detail ? (
        //         <Grid container sx={{p :1 }} columnGap={2} rowGap={2} justifyContent='center' >
        //             <Grid xs={12} md={2.7} sx={gridStyle} >
        //                 <Stack direction='column' alignItems='center' sx={{ mt : 2}}>
        //                     <Typography variant='h5' fontWeight='bold'>
        //                         Homepage
        //                     </Typography>
        //                     <Link href={detail.homepage} underline='hover' target='_blank' rel='noreferrer' sx={{ mt : 2}}>
        //                         <Typography variant='caption'>
        //                             {detail.homepage.split('/')[2]}
        //                         </Typography>
        //                     </Link>
        //                 </Stack>
        //             </Grid>
        //             <Grid xs={12} md={2.7} sx={gridStyle}>
        //                 <Stack direction='column' alignItems='center'sx={{ mt : 2}}>
        //                     <Typography variant='h5' fontWeight='bold'>
        //                         Production
        //                     </Typography>
        //                     <Grid container direction='row' sx={{ m: 1}}>
        //                         {detail.production_companies.map((pd) => {
        //                             return (
        //                                 <Tooltip key={pd.id} title={pd.name}>
        //                                     <Avatar
        //                                         key={pd.id} 
        //                                         alt={pd.name}
        //                                         sx={{width : 30, height : 30, m : 1, boxShadow: 1}}
        //                                         src={`https://image.tmdb.org/t/p/w300/${pd.logo_path}`}/>    
        //                                 </Tooltip>
        //                             )
        //                         })}
        //                     </Grid>
        //                 </Stack>
        //             </Grid>
        //             <Grid xs={12} md={2.7}sx={gridStyle}>
        //                 <Stack direction='column' alignItems='center' sx={{mt : 2}} >
        //                     <Typography variant='h5' fontWeight='bold'>
        //                         Genre
        //                     </Typography>
        //                     <Grid container width="100%" direction='row' justifyContent='center' sx={{p : 1}} rowGap={1} columnGap={1} >
        //                         {detail.genres.map((genre)=> {
        //                             return (
        //                                 <Grid key={genre.id}>
        //                                     <Chip size='small' key={genre.id} label={genre.name}/>
        //                                 </Grid>
        //                             )
        //                         })}
        //                     </Grid>
        //                 </Stack>
        //             </Grid>
        //             <Grid xs={12} md={2.7}sx={gridStyle}>
        //                 <Stack direction='column' alignItems='center' sx={{mt : 2}}>
        //                     <Typography variant='h5' fontWeight='bold'>
        //                         Language
        //                     </Typography>
        //                     <Grid container width="100%" direction='row' justifyContent='center' sx={{p : 1}} rowGap={1} columnGap={1} >
        //                         {detail.spoken_languages.map((lang)=> {
        //                             return (
        //                                 <Tooltip key={lang.name} title={lang.english_name}>
        //                                     <Chip label={lang.iso_639_1.toUpperCase()} />
        //                                 </Tooltip>
        //                             )
        //                         })}
        //                     </Grid>
        //                 </Stack>
        //             </Grid>
        //         </Grid>
                
        //         ) : (
        //         <Grid>
        //             <Grid direction='row' flexDirection='row'>
                    
        //             </Grid>
        //         </Grid>
        //         )
        //         }
            
        // </Paper>
    )
}