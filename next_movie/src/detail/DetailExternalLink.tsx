import { Home, InsertLink } from "@mui/icons-material";
import { Box, Link, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function DetailExternalLink ({theme, detail} : { theme : boolean, detail: MovieDetail}) {

    return (
        <Box width="15%" display="flex" flexDirection="row" alignItems="center">
            {detail?.homepage ? (
                <Link
                    href={detail && detail.homepage }
                    target='_blank'
                    rel='noreferrer'>
                    <Box 
                        display="flex"
                        flexDirection="column"
                        borderRadius={4}
                        bgcolor={theme ? grey[800] : grey[200]}
                        alignItems="center"
                        justifyContent="center"
                        width="4rem"
                        mr="1rem"
                        height="4rem"                      
                        sx={{
                            ":hover" : {
                                bgcolor : theme ? grey[700] : grey[300] },
                            my : 1,
                            cursor : 'pointer'
                        }}>
                        <Home
                            sx={{   width : "2rem", 
                                    height : "2rem",
                                    color : theme ? 'white' : 'black'
                                    }}/>
                        <Typography 
                            sx={{ fontSize : '10px', color : theme ? 'white' : 'black'}}>
                            HomePage
                        </Typography>
                    </Box>
                </Link>
                ) : (
                <Box 
                    display="flex"
                    flexDirection="column"
                    borderRadius={4}
                    bgcolor={theme ? grey[800] : grey[200]}
                    alignItems="center"
                    justifyContent="center"
                    width="4rem"
                    height="4rem"
                    mr="1rem">
                        <Typography flexWrap={'wrap'} fontSize='13px' color={theme ? 'white' : 'black'} >
                            No Hompage
                        </Typography>
                </Box>        
            )}
            {detail?.imdb_id ? (
                <Link
                    href={`https://www.imdb.com/title/${detail.imdb_id}`} 
                    target='_blank' 
                    rel='noreferrer'>
                    <Box 
                        display="flex"
                        flexDirection="column"
                        borderRadius={4}
                        bgcolor={theme ? grey[800] : grey[200]}
                        alignItems="center"
                        justifyContent="center"
                        width="4rem"
                        height="4rem"                      
                        sx={{
                            ":hover" : {
                                bgcolor : theme ? grey[700] : grey[300] },
                            my : 1,
                            cursor : 'pointer'
                        }}>
                        <InsertLink 
                            sx={{
                                width : "2rem",
                                height : "2rem",
                                color : theme ? 'white' : 'black'
                            }}
                        />
                        <Typography 
                            sx={{
                                fontSize : '10px', 
                                color : theme ? 'white' : 'black'
                            }}>
                            IMDB Page
                        </Typography>
                    </Box>
                </Link>
                ) : (
                    <Box 
                        display="flex"
                        flexDirection="column"
                        borderRadius={4}
                        bgcolor={theme ? grey[800] : grey[200]}
                        alignItems="center"
                        justifyContent="center"
                        width="4rem"
                        height="4rem">
                        <Typography
                            sx={{
                                fontSize : '10px', 
                                color : theme ? 'white' : 'black'
                            }}>
                            No IMDB
                        </Typography>
                    </Box>
                )
            }
        </Box>
    )
}