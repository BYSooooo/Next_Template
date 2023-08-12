import React from 'react'

import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

import { useAppSelector } from '@/redux/hook';

export default function MovieOverview({movie, openYn, closeFn} : {movie: MovieInfo, openYn : boolean, closeFn : Function}) {
    const [open, setOpen] = React.useState(false);
    const [overOpen, setOverOpen] = React.useState(false);
    const genreList : MovieGenreInfo[] = useAppSelector((state) => state.movieGenre);
    
    React.useEffect(()=> {
        {openYn && handleOpen()}
    },[openYn])

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        closeFn(false)
        setOpen(false)
        handleOverClose()
    };

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

     const onClick = () => setOverOpen(true);

     const handleOverClose = () => setOverOpen(false);
     const detailClick = (id : number) => {
        console.log(`Movie ID : ${id}`)
     }


    const titleTypo = {
        p : 0.7,
        fontWeight : 'bold',
        backgroundColor : "snow", 
        color : "black", 
        borderRadius : 1, 
        boxShadow : '2px 2px 6px black'
    }

    const menuStyle = {
        mr: 2, 
        p : 1, 
        backgroundColor : "black", 
        color : "white",  
        borderRadius : 1,
        boxShadow : '2px 2px 3px black'
    }

    const contentTypo = {
        p : 1, 
        backgroundColor : "snow", 
        color : "black", 
        borderRadius : 1,
        boxShadow : '2px 2px 3px black'        
    }

    return (
        <div>
            <ClickAwayListener onClickAway={handleClose}>
                <Modal
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{backdrop : Backdrop}}
                    slotProps={{ backdrop : { timeout : 500 }}}
                    >
                    <Fade in={open}>
                        <Box
                            sx={{
                                position: 'absolute' as 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '100vw',
                                height : '30vw',
                                backgroundImage : `url(https://image.tmdb.org/t/p/original${movie.backdrop_path}),linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7))`,
                                backgroundSize : "100%",
                                backgroundRepeat : "no-repeat",
                                backgroundPosition : '30%',
                                backgroundBlendMode : "overlay",
                                }}
                            overflow='hidden'>
                            <Grid direction='row' container>
                                <Grid 
                                    xs={10}
                                    container
                                    spacing={2} 
                                    sx={{ paddingInline : 2, paddingTop : 4}} 
                                    direction='column'>
                                    <Grid xs="auto">
                                        <Typography 
                                            sx={titleTypo}
                                            variant={window.innerWidth > 1045 ? "h4" : "h5"} 
                                            component="span">
                                            {movie.original_title}
                                        </Typography>
                                    </Grid>
                                    <Grid direction='row' xs={3}>
                                        <Typography 
                                            sx={menuStyle} 
                                            variant={window.innerWidth > 1045 ? "body1" : "body2"} 
                                            component="span">
                                            Release 
                                        </Typography>
                                        <Typography 
                                            sx={contentTypo} 
                                            variant={window.innerWidth > 1045 ? "body1" : "body2"} 
                                            component="span">
                                            {movie.release_date}
                                        </Typography>
                                    </Grid>
                                    <Grid direction='row'>
                                        <Typography 
                                            sx={menuStyle} 
                                            variant={window.innerWidth > 1045 ? "body1" : "body2"} 
                                            component="span">
                                            Genres 
                                        </Typography>
                                        {movie.genre_ids.map((item)=> {
                                            return (
                                                <Chip key={item} label={getName(item)} sx={{ mr : 0.5, backgroundColor : "snow", boxShadow : "2px 2px 2px black"}}/>
                                            )
                                        })}
                                    </Grid>
                                    <Grid direction='column'>
                                        <Typography 
                                            sx={menuStyle} 
                                            variant={window.innerWidth > 1045 ? "body1" : "body2"} 
                                            component="span">
                                            Rate
                                        </Typography>
                                        <Typography 
                                            sx={contentTypo} 
                                            variant={window.innerWidth > 1045 ? "body1" : "body2"} 
                                            component="span">
                                            {movie.vote_average}
                                        </Typography>
                                    </Grid>
                                    {window.innerWidth > 1045 &&
                                        <Grid direction='column'>
                                            <Typography
                                                sx={menuStyle}
                                                variant={window.innerWidth > 1045 ? "body1" : "body2"}
                                                component="span">
                                                Overview
                                            </Typography>
                                            <Box 
                                                display="flex"
                                                sx={{scrollbarGutter : "state", p : 1, mt : 2, backgroundColor : "white", width : "40vw", height : "40%", borderRadius : 2}} 
                                                >
                                                <Typography 
                                                    variant={window.innerWidth > 1045 ? "body2": "caption"}
                                                    sx={{overflow : 'hidden', textOverflow : "ellipsis", display: '-webkit-box', WebkitLineClamp : "2", WebkitBoxOrient : "vertical"}}>
                                                    {movie.overview}
                                                </Typography>
                                                <Button sx={{}}variant='text' onClick={onClick}>
                                                    More
                                                </Button>
                                            </Box>
                                        </Grid>}
                                </Grid>
                                <Grid container direction='column-reverse' xs={2}
                                    sx={{ height: '30vw', pb : 3}}>
                                    <Box>
                                        <Button variant='contained' onClick={()=>detailClick(movie.id)}>
                                            View Detail
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Modal
                                open={overOpen}
                                onClose={handleOverClose}
                                closeAfterTransition
                                slots={{backdrop : Backdrop}}
                                slotProps={{ backdrop : {timeout : 300}}}>
                                    <Box sx={{
                                        position : 'absolute' as 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width : "20rem",
                                        backgroundColor : "snow",
                                        borderRadius : 1,
                                        p : 2
                                    }}>
                                        <Typography 
                                            sx={{background : 'black', color:'white', p : 1, borderRadius : 1}} 
                                            component='span'>
                                            Overview
                                        </Typography>
                                        <Divider sx={{background : "black", mt : 1, mb : 1}}/>
                                        <Typography>
                                            {movie.overview}
                                        </Typography>
                                    </Box>
                            </Modal>
                        </Box>
                    </Fade>
                </Modal>
            </ClickAwayListener>
        </div>
    )
}