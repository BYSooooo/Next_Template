import { Box, Skeleton } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function DetailPoster({theme, path} : {theme : boolean, path : string}) {

    return (
        <Box sx={{
            width : "50%",
            textAlign : 'start',
            borderRadius : 4,
            px : 2,
            pt : 1,
            bgcolor : theme ? grey[900] : grey[100]

            }}>
            {path ? (
                <img 
                    style={{
                        borderRadius : 5,
                        width : "13rem" }}
                    alt={"Loading..."}
                    src={`https://image.tmdb.org/t/p/w500${path}&fit=crop`}/>
            ) : (
                <Skeleton variant="rectangular" width="13rem" height={"20rem"}/>
            )} 
        </Box>
    )
}