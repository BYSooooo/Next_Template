import React from 'react';

import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


import { useAppSelector } from '@/redux/hook';

export default function PopularList() {
    const popular : Array<any> = useAppSelector((state) => state.moviePopular);

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handlePopOverOpen = (event : React.MouseEvent<HTMLElement>, movie : MovieInfo) => {
        setAnchorEl(event.currentTarget);

        return (
            <Popover 
                id="mouse-over-popover"
                sx={{pointerEvents : 'none'}}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{vertical : 'center', horizontal: 'right'}}
                transformOrigin={{vertical : 'top', horizontal: 'right'}}
                onClose={handlePopOverClose}
                disableRestoreFocus>
                    <Box>
                        <Typography>
                            {movie.original_title}
                        </Typography>
                    </Box>
            </Popover>
        )
    };

    const handlePopOverClose = ()=> {
        setAnchorEl(null);
    }
    const open = Boolean(anchorEl);

    return (
        <ImageList sx={{ width : "100%"}} cols={5}>
            {popular.map((movie : MovieInfo)=> {
                return (
                    <ImageListItem key={movie.id} >
                        <img 
                            aria-owns={open ? 'mouse-over-popover' : undefined}
                            aria-haspopup="true"
                            onMouseEnter={(e)=> handlePopOverOpen(e,movie)}
                            onMouseLeave={handlePopOverClose}
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            loading='lazy'
                            alt={movie.original_title}
                        />
                    </ImageListItem>
                    
                )
            })}
        </ImageList>
    )
}