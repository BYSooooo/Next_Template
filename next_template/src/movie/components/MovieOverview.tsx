import React, { useEffect } from 'react'

import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ClickAwayListener from '@mui/base/ClickAwayListener';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius : "1rem",
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


export default function MovieOverview({movie, openYn} : {movie: MovieInfo, openYn : boolean}) {
    const [open, setOpen] = React.useState(false);
    console.log(openYn)

    React.useEffect(()=> {
        {openYn && handleOpen()}
    },[openYn])

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
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
                        <Box sx={style}>
                            <Typography>
                                {movie.original_title}
                            </Typography>
                        </Box>
                    </Fade>
                </Modal>
            </ClickAwayListener>
        </div>
    )
}