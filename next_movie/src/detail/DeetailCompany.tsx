import { Avatar, Box, Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function DetailCompany({theme,path} : {theme : boolean, path : MovieDetail}) {
    
    return (
        <Box display='flex' flexDirection='row' justifyContent={'space-between'} sx={{ px : 2, mb : 10}}>
            <Box width="45%" flexDirection='column' >
                <Box display='flex' flexDirection='column' alignItems='start' >
                    <Typography variant="h6" fontWeight='bold' sx={{ mt : 1, px :2}}>
                        Company
                    </Typography>
                    <Box
                        mt={1}
                        display="flex"
                        flexDirection={"column"}
                        borderRadius={4}
                        width = "100%"
                        height = "15rem"
                        bgcolor={theme ? grey[800] : grey[200]}>
                        {path.production_companies.map((item,idx)=> {
                            return ( idx < 3 &&
                                <Box
                                    borderRadius={4}
                                    bgcolor={ theme ? grey[700] : grey[300]}
                                    display={"flex"}
                                    width="100%"
                                    height="20%"
                                    sx={{ m : 1  }}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}
                                    />

                                    
                                </Box>
                            )
                        })}
                        
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
                            display='flex'
                            justifyContent="center"
                            width = "100%"
                            height = "15rem">
                            <Box
                                borderRadius={4}
                                width = "100%"
                                overflow='hidden'
                                zIndex={-1}
                                sx={{
                                    backgroundImage : `url(https://image.tmdb.org/t/p/original${path.belongs_to_collection.backdrop_path})`,
                                    backgroundSize : "100%",
                                    backgroundRepeat : 'no-repeat',
                                    opacity : 0.5,
                                }} 
                            />
                            <Box
                                justifyContent="center"
                                alignItems="center"
                                sx={{ position : 'absolute', mt : 5, zIndex : 1, display : "flex", flexDirection: "column"}}>
                                <Avatar
                                    sx={{
                                        width : "5rem", 
                                        height : "5rem",
                                        opacity : 1,
                                    }}
                                    src={`https://image.tmdb.org/t/p/w500${path.belongs_to_collection.poster_path}`}
                                />
                                <Typography variant="h5" noWrap fontWeight="Bold">
                                    {path.belongs_to_collection.name}
                                </Typography>
                                <Button 
                                    sx={{ 
                                        borderRadius : 2, 
                                        bgcolor : theme ? grey[800] : grey[300],
                                        color : theme ? "white" : "black"}}>
                                    Detail
                                </Button>
                            </Box>

                            
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