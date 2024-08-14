
import React from 'react';
import { AttachMoney, EventAvailable, EventBusy, Language, Paid, Schedule, Tag } from "@mui/icons-material";
import { Box, ClickAwayListener, Skeleton, Typography } from "@mui/material";
import { brown, deepOrange, green, grey, indigo, lightBlue, lightGreen, red } from "@mui/material/colors";
import MoviePopper from "../common/popper/MoviePopper";


export default function DetailInfo({theme,path}:{theme: boolean, path : MovieDetail}) {
    const [anchorEl, setAnchorEl]= React.useState<HTMLElement | null>(null)
    const [anchorElSe, setAnchorElSe] = React.useState<HTMLElement | null>(null)
    const innerBoxStyle = ()=> theme ? grey[800] : grey[300];
    
    const genreBoxClick = (event : React.MouseEvent<HTMLElement>)=> setAnchorEl(event.currentTarget);
    const genreBoxClickAway = ()=> setAnchorEl(null)

    const langBoxClick = (event : React.MouseEvent<HTMLElement>)=> setAnchorElSe(event.currentTarget);
    const langBoxClickAway = ()=> setAnchorElSe(null)


    return (
        <>
            {path ? (
                <Box 
                    ml={2}
                    px={2}
                    width="100%" 
                    bgcolor={theme ? grey[900]: grey[100] }
                    borderRadius={4}>
                    <Box flexDirection='column'>
                        <Box 
                            sx={{ p : 1 }}
                            height="50%"
                            display='flex' 
                            flexDirection='row'
                            justifyContent='space-between'>
                            <Box 
                                width="20%" 
                                bgcolor={innerBoxStyle}
                                borderRadius={4}
                                sx={{ p : 1}}>
                                <Typography 
                                    variant="subtitle2" 
                                    textAlign='start'
                                    gutterBottom>
                                    Release Date
                                </Typography>
                                { path.status === "Released" 
                                    ? <EventAvailable 
                                        sx={{ 
                                            color : theme ? green[300] : green[700],
                                            fontSize : '50px',
                                        }}/> 
                                    : <EventBusy 
                                        sx={{
                                            color : theme ? red[300] : red[700],
                                            fontSize : '50px'
                                        }}/>
                                }
                                <Typography fontWeight='bold'>
                                    {path.release_date}
                                </Typography>
                            </Box>
                            <Box 
                                width="20%" 
                                bgcolor={innerBoxStyle}
                                borderRadius={4}
                                sx={{ p : 1}}>
                                <Typography 
                                    variant="subtitle2" 
                                    textAlign='start'
                                    gutterBottom>
                                    Running Time
                                </Typography>
                                <Schedule 
                                    sx={{
                                        color : theme ? brown[300] : brown[700],
                                        fontSize : '50px'
                                }}/>
                                <Typography fontWeight='bold'>
                                    {path.runtime} Min
                                </Typography>
                            </Box>
                            <ClickAwayListener onClickAway={genreBoxClickAway}>
                                <Box 
                                    width="20%" 
                                    bgcolor={innerBoxStyle}
                                    borderRadius={4}
                                    onClick={genreBoxClick}
                                    sx={{ p : 1,}}>
                                    <Typography 
                                        variant="subtitle2" 
                                        textAlign='start'
                                        gutterBottom>
                                        Genre
                                    </Typography>
                                    <Tag 
                                        sx={{
                                            color : theme ? indigo[300] : indigo[700],
                                            fontSize : '50px'
                                    }}/>
                                    <Typography fontWeight='bold'>
                                        {path.genres.length} Genres
                                    </Typography>
                                </Box>
                            </ClickAwayListener>
                            <MoviePopper anchorEl={anchorEl} name="Genres" extra={path.genres} />
                            <ClickAwayListener onClickAway={langBoxClickAway}>
                                <Box 
                                    width="20%" 
                                    bgcolor={innerBoxStyle}
                                    borderRadius={4}
                                    onClick={langBoxClick}
                                    sx={{ p : 1}}>
                                    <Typography
                                        variant="subtitle2"
                                        textAlign='start'
                                        gutterBottom>
                                        Spoken Language
                                    </Typography>
                                    <Language 
                                        sx={{
                                            color : theme ? lightBlue[300] : lightBlue[700],
                                            fontSize : '50px'
                                        }} 
                                    />
                                    <Typography fontWeight='bold'>
                                        {path.spoken_languages.length} Languages
                                    </Typography>
                                </Box>
                            </ClickAwayListener>
                            <MoviePopper anchorEl={anchorElSe} name="Languages" extra={path.spoken_languages}/>
                        </Box>
                    </Box>
                    <Box
                        sx={{ p : 1 }}
                        height="50%"
                        display='flex' 
                        flexDirection='row'
                        justifyContent='space-between'>
                        <Box 
                             width="20%" 
                             bgcolor={innerBoxStyle}
                             borderRadius={4}
                             sx={{ p : 1}}>
                            <Typography
                                variant="subtitle2"
                                textAlign='start'
                                gutterBottom>
                                Budget
                            </Typography>
                            <Paid
                                sx={{
                                    color : theme ? deepOrange[300] : deepOrange[700],
                                    fontSize : '50px'
                                }}
                            />
                            <Typography fontWeight='bold'>
                                {path.budget}
                            </Typography>
                        </Box>
                        <Box
                            width="20%" 
                            bgcolor={innerBoxStyle}
                            borderRadius={4}
                            sx={{ p : 1}}>
                            <Typography
                                variant="subtitle2"
                                textAlign='start'
                                gutterBottom>
                                Revenue
                            </Typography>
                            <AttachMoney 
                                sx={{
                                    color : theme ? lightGreen[300] : lightGreen[700],
                                    fontSize : '50px'
                                }}
                            />
                            <Typography fontWeight='bold'>
                                {Number(path.revenue)}
                            </Typography>
                        </Box>
                        <Box
                            width="20%" 
                            bgcolor={innerBoxStyle}
                            borderRadius={4}
                            sx={{ p : 1}}>

                        </Box>
                        <Box
                            width="20%" 
                            bgcolor={innerBoxStyle}
                            borderRadius={4}
                            sx={{ p : 1}}>

                        </Box>
                    </Box>
                </Box>
            ) : (
                <Skeleton 
                    variant="rectangular" 
                    width="100%"
                    sx={{
                        ml : 1
                    }}/>
            )}
        
        </>
    )
}