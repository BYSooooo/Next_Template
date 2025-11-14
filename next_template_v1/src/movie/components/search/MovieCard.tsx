"use client";

import * as React from 'react'

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';

import MovieOverview from '../MovieOverview';

export default function MovieCard({movie} : { movie : MovieInfo }) {
    const genreList : MovieGenreInfo[] = JSON.parse(window.sessionStorage.getItem('genres'))
    const [open, setOpen] = React.useState(false);

    const getName = (selected : number) => {
       // Must Modify!
       let selName = ""
        for(var i=0; i<genreList.length; i++) {
            if(genreList[i].id === selected) {
                selName = genreList[i].name
            }
        }
        return selName;
    }

    const onClick=()=> {
        setOpen(true);
    }
    const closeFn = () => setOpen(false);

    return (
        <Card key={movie.id} sx={{display : 'block', width: 350, height : 106}} variant='outlined' onClick={onClick}>
            <CardActionArea >
                <Stack sx={{ dieplay : 'flex', flexDirection : 'row'}}>
                    <CardMedia 
                        key={`${movie.id}_key`} 
                        sx={{ width: 80}} 
                        component="img"
                        image={movie.poster_path === null ? null : `https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
                    <Box sx={{display : 'block', flexDirection : 'column', width : "75%"}}>
                        <CardContent>
                            <Typography noWrap variant="h6" component='div'>
                                {movie.original_title}
                            </Typography>
                            <Box sx={{flexDirection : 'row'}} >
                                {movie.genre_ids.map((item) => {
                                    return <Chip key={`${movie}_${item}`} label={getName(item)} size="small" sx={{m : 0.2}}/>
                                })}

                            </Box>
                        </CardContent>
                    </Box>
                </Stack>
            </CardActionArea>
            {movie && <MovieOverview key={movie.id} movie={movie} openYn={open} closeFn={closeFn} />}
        </Card>


        // <Card key={key} variant='outlined' sx={{ width: "100%", display : 'block', flexDirection : 'column', borderRadius : 1}} onClick={onClick}>
        //     <Stack maxWidth="100%" direction="row">
        //         <CardMedia
        //             key={key}
        //             sx={{ width: 100}}
        //             component="img"
        //             image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        //         />
        //          <Box overflow='visible' sx={{ width : '100%', display : 'flex', flexDirection : 'column', p : 2, }} >
        //                 <Typography noWrap variant="h6" component='div'>
        //                     {movie.original_title}
        //                 </Typography>
        //             <Stack flexWrap='wrap' direction="row" spacing={0.5}>
        //                 {genre.map((id) => {       
        //                     return (
        //                         <GenreBox id={id} key={id} name={getName(id)} />
        //                     )
        //                 })}
        //             </Stack>
        //         </Box>
        //     </Stack>
        // </Card>
    )
}