import { Box, Card, CardMedia, Stack, Typography } from "@mui/material";
import ReactPlayer from "react-player";

export default function DetailVideoList({theme,path}: {theme: boolean, path : MovieDetail }) {
    const idxArray = path ? path.videos.results.filter((item)=> item.type === 'Trailer') : [];

    return(
        <Box width="100%" display="flex" flexDirection="row">
            <Box width="80%" overflow="scroll" display='flex' flexDirection='row'>
                {idxArray.map((item)=> {
                    return (
                        <Card key={item.id} sx={{ my : 1, mr : 1, borderRadius : 4 }}>
                            {item &&
                                <CardMedia>
                                <ReactPlayer
                                    width="auto"
                                    height="13rem"
                                    url={`https://www.youtube.com/watch?v=${item.key}`}  
                                />
                                </CardMedia>
                            }
                        </Card>
                    )
                })}
            </Box> 
            <Box width="20%">
                <Typography>
                    More
                </Typography>
            </Box>  
        </Box>
    )

        
        // <Box>
        //     {path &&
        //     <ReactPlayer 
        //         height='30vh' 
        //         width='auto' 
        //         url={`https://www.youtube.com/watch?v=${path.videos.results[idx[0]]?.key}`} />}
        // </Box>
    

}