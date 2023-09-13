import React from 'react'

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

import { useAppSelector } from '@/redux/hook';
import { CalendarMonth, Close, Tag } from '@mui/icons-material';

import MovieOverview from '../MovieOverview';



export default function PopularOverView({movie} :{movie : MovieInfo | null}) {
    const genreList : MovieGenreInfo[] = useAppSelector((state) => state.movieGenre);
    const [open, setOpen] = React.useState(false);
    const overviewMovie = React.useRef<MovieInfo>(null);

    React.useEffect(()=> {
        setOpen(false)
        overviewMovie.current = null;
     },[movie])

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

     const onClick= (selMovie : MovieInfo) => {
        setOpen(true)
        overviewMovie.current = selMovie;
     } 
     const closeFn = () => {
        setOpen(false)
     }
     const genreSelect = (id : number) => {
        console.log(id)
     }

    return (
        
        <Card key={movie.id} sx={{display : 'block', minWidth : 300, maxWidth : 300, borderRadius : "1rem",p : 2 }}>
                <Stack direction='column' rowGap={1}>
                    <Typography variant='h6' fontWeight='bold' lineHeight={1}>
                        {movie.original_title}
                    </Typography>
                    <Divider />
                    <Box sx={{ p : 1}} >
                        <Stack direction='row'>
                            <CalendarMonth sx={{ width:20, height : 20}} />
                            <Typography component='div' variant='subtitle2'>
                                Release
                            </Typography>
                        </Stack>
                        <Box sx={{ mt : 1}}>
                            <Chip label={movie.release_date}/>
                        </Box>
                    </Box>
                
                    <Box sx={{p : 1}}>
                        <Stack direction='row'>
                            <Tag sx={{ width : 20, height : 20}}/>
                            <Typography component='div' variant='subtitle2'>
                                Genre
                            </Typography>
                        </Stack>
                        <Stack flexWrap="wrap" direction="row" spacing={0.5} sx={{p:0.5}} rowGap={1}>
                            {movie.genre_ids.map((id) => {       
                                return (
                                    <Chip key={id} label={getName(id)} variant='filled' component='button' onClick={()=>genreSelect(id)} />
                                    )
                                })}
                        </Stack>

                    </Box>
                    <Button 
                        variant='contained' 
                        color='primary'
                        onClick={()=>onClick(movie)}>
                        OverView
                    </Button>
            </Stack>
            {overviewMovie.current && <MovieOverview movie={overviewMovie.current} openYn={open} closeFn={closeFn}/>}
        </Card>
        
    )   
}