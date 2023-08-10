import React, { useEffect } from 'react'

import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2/Grid2';


export default function MovieOverview({movie, openYn, closeFn} : {movie: MovieInfo, openYn : boolean, closeFn : Function}) {
    const [open, setOpen] = React.useState(false);
    console.log(movie)
    React.useEffect(()=> {
        {openYn && handleOpen()}
    },[openYn])

    const handleClose = () => {
        closeFn(false)
        setOpen(false)
    };
    const handleOpen = () => setOpen(true);

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
                        <Box sx={{
                                position: 'absolute' as 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '100vw',
                                height : '40vw',
                                backgroundImage : `url(https://image.tmdb.org/t/p/original${movie.backdrop_path}),linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7))`,
                                backgroundSize : "100%",
                                backgroundRepeat : "no-repeat",
                                backgroundPosition : '30%',
                                backgroundBlendMode : "overlay",
                                }}
                            overflow='hidden'>
                            <Grid 
                                container
                                spacing={2} 
                                sx={{ width:"80%", paddingInline : 2, paddingTop : 4}} 
                                direction='column'>
                                <Grid xs="auto">
                                    <Typography 
                                        sx={titleTypo}
                                        variant={outerWidth > 800 ? "h4": "h5"} 
                                        component="span">
                                        {movie.original_title}
                                    </Typography>
                                </Grid>
                                <Grid direction='row' xs={3}>
                                    <Typography 
                                        sx={menuStyle} 
                                        variant={window.innerWidth > 800 ? "h6" : "body2"} 
                                        component="span">
                                        Release 
                                    </Typography>
                                    <Typography 
                                        sx={contentTypo} 
                                        variant={window.innerWidth > 800 ? "h6" : "body2"} 
                                        component="span">
                                        {movie.release_date}
                                    </Typography>
                                </Grid>
                                <Grid direction='column'>
                                    <Typography 
                                        sx={menuStyle} 
                                        variant={window.innerWidth > 800 ? "h6" : "body2"} 
                                        component="span">
                                        Rate 
                                    </Typography>
                                    <Typography 
                                        sx={contentTypo} 
                                        variant={window.innerWidth > 800 ? "h6" : "body2"} 
                                        component="span">
                                        {movie.vote_average}
                                    </Typography>
                                </Grid>
                                {window.innerWidth > 800 &&
                                    <Grid direction='column'>
                                        <Typography
                                            sx={menuStyle}
                                            variant={window.innerWidth > 800 ? "h6" : "body2"}
                                            component="span">
                                            Overview
                                        </Typography>
                                        <Box 
                                            sx={{scrollbarGutter : "state", p : 1, mt : 2, backgroundColor : "white", width : "50vw", height : "10%", borderRadius : 2}} 
                                            overflow="hidden">
                                            <Typography >
                                                {movie.overview}
                                            </Typography>
                                        </Box>
                                    </Grid>}
                            </Grid>
                            

                        </Box>
                    </Fade>
                </Modal>
            </ClickAwayListener>
        </div>
    )
}