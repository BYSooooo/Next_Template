
import { EventAvailable, EventBusy, Schedule, Tag } from "@mui/icons-material";
import { Box, Chip, Skeleton, Typography } from "@mui/material";
import { brown, green, grey, indigo, red } from "@mui/material/colors";
import { useAppSelector } from "../redux/hooks";

export default function DetailInfo({theme,path}:{theme: boolean, path : MovieDetail}) {
    
    const innerBoxStyle = ()=> theme ? grey[800] : grey[300];
    const getName = (id : number)=> {
        const genreSlice = useAppSelector((state)=> state.genreReducer)
        const result = genreSlice.find((item)=> item.id === id)
        return result.name
    }

    return (
        <>
            {path ? (
                <Box 
                    ml={2}
                    px={2}
                    width="100%" 
                    bgcolor={theme ? grey[900]: grey[100] }
                    borderRadius={4}
                    >
                    <Box 
                        sx={{ p : 1}}
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
                        <Box 
                            width="20%" 
                            bgcolor={innerBoxStyle}
                            borderRadius={4}
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
                            {/* {path.genres.map((item)=> {
                                return (
                                    <Chip
                                        size="small" 
                                        icon={ <Tag sx={{ fontSize : 'small'}} /> }
                                        label={item.name}
                                        component={'span'} 
                                        sx={{ m : 1}}
                                    />
                                )
                            })} */}
                        </Box>
                        <Box width="20%" 
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