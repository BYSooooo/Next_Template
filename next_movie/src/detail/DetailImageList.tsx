import { Add } from "@mui/icons-material";
import { Box, ImageList, ImageListItem, Link, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useAppDispatch } from "../redux/hooks";
import { controlDialog } from "../redux/features";

export default function DetailImageList({theme,path} : {theme: boolean, path : MovieDetail}) {
    const initImageArr = path.images.posters.filter((item,idx)=> idx < 20);
    const dispatch = useAppDispatch();
    
    const onClickMoreImage = ()=> {
        dispatch(controlDialog({openYn : true, name : "Media", extraInfo : path}))    
    }

    return (
        <Box width="100%" display="flex" flexDirection="row">
            <Box width="90%" overflow="scroll" display="flex" flexDirection="row">
                <ImageList cols={20}>
                    {initImageArr.length > 0 ? (
                        initImageArr.map((img)=> {
                            return (
                                img && (
                                    <Link 
                                        href={`https://image.tmdb.org/t/p/original${img.file_path}`}
                                        target='_blank'
                                        rel='noreferrer'>
                                        <ImageListItem
                                            sx={{
                                                width : 130,
                                                borderRadius : 4,
                                                overflow : 'hidden',
                                                display : 'inline-flex',
                                                my : 1,
                                                mr : 1,
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
                                    </Link>
                                )
                            )
                        })
                    ):(
                        <ImageListItem
                            sx={{
                                width : 130,
                                height : '100%',
                                borderRadius : 4,
                                overflow : 'hidden',
                                display : 'inline-flex',
                                my : 1,
                                mr : 1}}>
                            <Box 
                                sx={{
                                    width : 780
                                }}>
                                <Typography>
                                    No Image
                                </Typography>

                            </Box>

                        </ImageListItem>
                    )}
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
                    cursor : 'pointer',
                    bgcolor : theme ? grey[700] : grey[300] },
                    my : 1,
                    mr : 2
                }}
                onClick={()=>onClickMoreImage()}
                >
                <Add />
                <Typography variant="h6" fontWeight='bold'>
                    More
                </Typography>
            </Box>  
        </Box>
    )
}