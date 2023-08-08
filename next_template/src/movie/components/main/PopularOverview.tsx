import React from 'react'

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useAppSelector } from '@/redux/hook';
import GenreBox from '../GenreBox';
import MovieOverview from '../MovieOverview';



export default function PopularOverView({movie} :{movie : MovieInfo | null}) {
    const genreList : MovieGenreInfo[] = useAppSelector((state) => state.movieGenre);
        
    const [open, setOpen] = React.useState(false);
    const overviewMovie = React.useRef<MovieInfo>(null);
     
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

     React.useEffect(()=> {
        setOpen(false)
     },[movie])

    
     
     const onClick= (selMovie : MovieInfo) => {
        console.log("Click Event Occured")
        console.log(selMovie)
        overviewMovie.current = selMovie;
        setOpen(true)
     } 

    return (
        <Card key={movie.id} sx={{display : 'block', maxWidth : 300, borderRadius : "1rem", p : 1 }}>
            <Stack direction='column'>
                <Box sx={{display : 'flex', flexDirection : 'column', p: 1}}>
                    <Typography component='div' variant='h5' noWrap>
                        {movie.original_title}
                    </Typography>
                    <Typography component='div' variant='subtitle2' noWrap>
                        {`Release : ${movie.release_date}`}
                    </Typography>
                    <Typography component='div' variant='subtitle2'>
                        Genre
                    </Typography>
                    <Stack flexWrap="wrap" direction="row" spacing={0.5} sx={{p:0.5}}>
                        {movie.genre_ids.map((id) => {       
                            return (
                                <GenreBox 
                                    id={id}
                                    key={id}
                                    name={getName(id)} />
                            )
                        })}
                    </Stack>
                    <Button 
                        variant='contained' 
                        color='secondary'
                        onClick={()=>onClick(movie)}>
                        View OverView
                    </Button>
                </Box>
            </Stack>
            {overviewMovie.current && <MovieOverview movie={overviewMovie.current} openYn={open} />}
        </Card>
        
    )   
}