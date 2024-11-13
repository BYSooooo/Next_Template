import { Add, ImageNotSupported } from "@mui/icons-material";
import { Box, Card, ImageList, ImageListItem, Link, Typography } from "@mui/material";
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
            <Box width="100%" overflow="scroll" display="flex" flexDirection="row">
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
                        <ImageListItem>
                            <Card
                                sx={{
                                    width : '20rem',
                                    height : '14.2rem',
                                    textAlign : 'center',
                                    alignItems : 'center',
                                    justifyContent : 'center',
                                    my : 1, mr :1, borderRadius : 4}}>
                                    <Box
                                        display='flex'
                                        width='130'
                                        flexDirection='column' 
                                        alignItems='center' justifyContent='center' height="100%">
                                    <ImageNotSupported
                                        sx={{ width : "6rem", height : "6rem"}}/>
                                    <Typography>
                                        No Image
                                    </Typography>
                                </Box>
                            </Card>
                        </ImageListItem>
                    )}
                </ImageList>
            </Box>        
        </Box>
    )
}