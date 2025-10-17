import { VideocamOff } from "@mui/icons-material";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import ReactPlayer from "react-player";
import { useAppDispatch } from "../redux/hooks";
import { controlDialog } from "../redux/features";

export default function DetailVideoList({theme,path}: {theme: boolean, path : MovieDetail }) {
    const idxArray = path ? path.videos.results.filter((item)=> item.type === 'Trailer') : [];
    const dispatch = useAppDispatch();

    const onClickMoreVideo =()=> {
        dispatch(controlDialog({openYn : true, name : "Media", extraInfo : path}))
    }
    
    return(
        <Box width="100%" display="flex" flexDirection="row">
            <Box overflow="scroll" display='flex' flexDirection='row'>
                {idxArray.length > 0 ? (
                    idxArray.map((item)=> {
                        return (
                            <Card key={item.id}
                                sx={{ my : 1, mr : 1, borderRadius : 4 }}>
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
                    })
                ):(
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
                                flexDirection='column' 
                                alignItems='center' justifyContent='center' height="100%">
                                <VideocamOff 
                                    sx={{ width : "6rem", height : "6rem"}}/>
                                <Typography>
                                    No Video
                                </Typography>
                            </Box>
                    </Card>  
                )}
            </Box>
        </Box>
    )
}