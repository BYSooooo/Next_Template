import { Add } from "@mui/icons-material";
import { Box, ImageList, ImageListItem, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function DetailImageList({theme,path} : {theme: boolean, path : MovieDetail}) {
    const initImageArr = path.images.posters.filter((item,idx)=> idx < 20);
    
    return (
        <Box width="100%" display="flex" flexDirection="row">
            <Box width="90%" overflow="scroll" display="flex" flexDirection="row">
                <ImageList cols={20}>
                    {initImageArr.length > 0 && initImageArr.map((img)=> {
                        return (
                            img && (
                                <ImageListItem
                                    sx={{
                                        width : 130,
                                        borderRadius : 4,
                                        overflow : 'hidden',
                                        display : 'inline-flex',
                                        ":hover" : {
                                            cursor : 'pointer'
                                        }
                                    }}
                                    key={img.file_path}>
                                    <img 
                                        aria-haspopup="true"
                                        src={`https://image.tmdb.org/t/p/w780${img.file_path}`}
                                    />
                                </ImageListItem>
                            )
                        )
                    })}
                </ImageList>
            </Box>
            <Box
                display='flex'
                flexDirection='column'
                borderRadius={4}
                bgcolor={theme ? grey[800] : grey[200]} 
                alignItems='center'
                justifyContent='center'
                width="10%"
                
                sx={{ ":hover" : {
                    bgcolor : theme ? grey[700] : grey[300] },
                    my : 1
                }}
                >
                <Add />
                <Typography variant="h6" fontWeight='bold'>
                    More
                </Typography>
            </Box>  
        </Box>
    )
}