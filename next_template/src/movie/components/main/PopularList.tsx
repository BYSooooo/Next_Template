import React from 'react';

import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"
import Popper from '@mui/material/Popper';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import ClickAwayListener from '@mui/base/ClickAwayListener'

import { useAppSelector } from '@/redux/hook';
import PopularOverView from './PopularOverview';


export default function PopularList() {
    const popular : Array<any> = useAppSelector((state) => state.moviePopular);
    const [hoverMovie, setHoverMovie] = React.useState<MovieInfo |null>(null);

    const anchorEl = React.useRef<HTMLElement | null>(null);
    
    const handleOpen = (event : React.MouseEvent<HTMLElement>, movie : MovieInfo) => {
        anchorEl.current = event.currentTarget;
        setHoverMovie(movie)
    };

    const handleClose = (event : Event | React.SyntheticEvent)=> {
        if(anchorEl.current.contains(event.target as HTMLElement)) {
            return;
        }
        anchorEl.current = null
        setHoverMovie(null)
    }
    const open = Boolean(anchorEl);

    return (
        <ImageList sx={{ width : "100%"}} cols={5}>
            {popular.map((movie : MovieInfo)=> {
                return (
                    <ImageListItem key={movie.id}>
                        <img
                            aria-owns={open ? 'mouse-over-popover' : undefined}
                            aria-haspopup="true"
                            onClick={(e)=>handleOpen(e,movie)}
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            loading='lazy'
                            alt={movie.original_title}
                        />
                    </ImageListItem>            
                )
            })}
            {hoverMovie && 
            <ClickAwayListener onClickAway={handleClose}>
                <Popper
                open={open}
                anchorEl={anchorEl.current}
                placement='auto'
                transition>                    
                    {({TransitionProps})=> (
                        <Fade {...TransitionProps} timeout={400} in={open}>
                            <Box>
                                <PopularOverView movie={hoverMovie}/>
                            </Box>
                        </Fade>
                    )}             
                </Popper>
            </ClickAwayListener>
        }
        </ImageList>

    )
}