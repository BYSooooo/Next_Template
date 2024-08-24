import { Avatar, Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function DetailCompany({theme,path} : {theme : boolean, path : MovieDetail}) {
    
    return (
        <Box display='flex' flexDirection='row' justifyContent={'space-between'} sx={{ px : 2}}>
            <Box width="45%" flexDirection='column' >
                <Box display='flex' flexDirection='column' alignItems='start' >
                    <Typography variant="h6" fontWeight='bold' sx={{ mt : 1, px :2}}>
                        Company
                    </Typography>
                    <Box
                        mt={1}
                        display="flex"
                        borderRadius={4}
                        width = "100%"
                        height = "15rem"
                        bgcolor={theme ? grey[800] : grey[200]}
                        >
                        
                    </Box>
                </Box>
            </Box>
            <Box width="45%" flexDirection='column' >
                <Box display='flex' flexDirection='column' alignItems='start'>
                    <Typography variant="h6" fontWeight='bold' sx={{ mt : 1, px :2}}>
                        Collection
                    </Typography>
                    { path ? (
                        <Box
                            mt={1}
                            display="flex"
                            borderRadius={4}
                            sx={{
                                backgroundImage : `url(https://image.tmdb.org/t/p/original${path.belongs_to_collection.backdrop_path})`,
                                backgroundSize : "100%",
                                backgroundRepeat : 'no-repeat',
                                opacity : 0.2  
                            }}
                            justifyContent="center"
                            width = "100%"
                            height = "15rem"
                            bgcolor={theme ? grey[800] : grey[200]}>
                            <Avatar
                                sx={{ position : 'absolute' }}
                                src={`https://image.tmdb.org/t/p/w500${path.belongs_to_collection.poster_path}`}
                            />
                            
                        </Box>

                    ) : (
                        <Box>
                        </Box>
                    )}
                </Box>
            </Box>
            
        </Box>
    )
}