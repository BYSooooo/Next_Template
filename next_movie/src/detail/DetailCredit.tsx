import { Person } from "@mui/icons-material";
import { alpha, Box, ImageList, ImageListItem, Skeleton, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function DetailCredit({theme, path} : {theme : boolean, path? : {cast : Cast[], crew : Crew[]}}) {
    
    return (
        <Box
            textAlign='start' 
            sx={{
                my : 1,
                py : 1,
                px : 2
            }}>
            <Typography
                variant='h6'
                fontWeight='bold' 
                sx={{ 
                    textDecoration : 'underline'}}
                display={'inline'}>
                {`Cast (${path ? path.cast.length : 0})`}
            </Typography>
            <Box width="100%" overflow="scroll">
                <Box>
                    <ImageList
                        gap={10} 
                        cols={path && path.cast.length}>
                        {path?.cast.length > 0 && 
                            path.cast.map((cast : Cast)=> {
                                return ( cast && (
                                        <ImageListItem 
                                            sx={{
                                                width : 130,
                                                borderRadius : 4,
                                                display : 'inline-flex',
                                                overflow : 'hidden',
                                                ":hover" : {
                                                    cursor : 'pointer'
                                                }
                                            }}
                                            key={cast.cast_id}>
                                            {cast.profile_path ? (
                                                <img src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`} />
                                            ) : (
                                                <Box
                                                    textAlign="center"
                                                    justifyContent="center"
                                                    height="100%"
                                                    bgcolor={theme ? grey[800] : grey[200]}
                                                    >
                                                    <Person 
                                                        sx={{
                                                            mt : '40%', 
                                                            fontSize : '70px'
                                                        }}
                                                    />
                                                </Box>
                                            )}
                                            
                                            <Box
                                                position='absolute'
                                                bottom='0'
                                                sx={{
                                                    width : "100%", 
                                                    paddingInline : 1,
                                                    bgcolor : theme ? alpha('rgb(0,0,0)',0.5) : alpha('rgb(255,255,255)',0.5),
                                                    
                                                }}>
                                                <Typography variant="subtitle2" noWrap >
                                                    {cast.name}
                                                </Typography>
                                                <Typography 
                                                    variant="subtitle2" noWrap>
                                                    {cast.character}
                                                </Typography>
                                            
                                            </Box>
                                        </ImageListItem>
                                )
                                    
                                )
                            })
                        }
                    </ImageList>    
                </Box>
            </Box>
            


        </Box>
    )
}