import { Box } from "@mui/material";
import ReactPlayer from "react-player";

export default function DetailMediaList({theme,path,sort}: {theme: boolean, path : MovieDetail, sort : "Video" | "Image"}) {
    const idx = path && path.videos.results.findIndex((item)=> item.type === 'Trailer');

    return(
        <Box>
            {path &&
            <ReactPlayer 
                height='30vh' 
                width='auto' 
                url={`https://www.youtube.com/watch?v=${path.videos.results[idx]?.key}`} />}
        </Box>
    )

}