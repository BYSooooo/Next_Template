import { Add } from "@mui/icons-material";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import ReactPlayer from "react-player";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { controlDialog } from "../redux/features";

export default function DetailVideoList({theme,path}: {theme: boolean, path : MovieDetail }) {
    const idxArray = path ? path.videos.results.filter((item)=> item.type === 'Trailer') : [];
    const dispatch = useAppDispatch();

    const onClickMoreVideo =()=> {
        dispatch(controlDialog({openYn : true, name : "Media", extraInfo : path}))
    }

    return(
        <Box width="100%" display="flex" flexDirection="row">
            <Box width="90%" overflow="scroll" display='flex' flexDirection='row'>
                {idxArray.map((item)=> {
                    return (
                        <Card key={item.id} sx={{ my : 1, mr : 1, borderRadius : 4 }}>
                            {item &&
                                <CardMedia>
                                <ReactPlayer
                                    width="auto"
                                    height="14.2rem"
                                    url={`https://www.youtube.com/watch?v=${item.key}`}
                                    controls={true}
                                />
                                </CardMedia>
                            }
                        </Card>
                    )
                })}
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
                    my : 1,
                    cursor : 'pointer'
                }}
                onClick={()=>onClickMoreVideo()}>
                <Add sx={{ color : theme ? 'snow' : 'black'}}/>
                <Typography 
                    variant="h6" 
                    fontWeight='bold'>
                    More
                </Typography>
            </Box>  
        </Box>
    )
}