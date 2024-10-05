import { Box, Skeleton } from "@mui/material";

export default function DetailPoster({theme, path} : {theme : boolean, path : string}) {
    
    return (
        <Box 
            textAlign='start'
            maxWidth="30%">
            {path ? (
                <img
                    style={{
                        borderRadius : 5,
                        width : "13rem",
                        cursor : 'pointer'
                    }}
                    alt={"Loading..."}
                    
                    src={`https://image.tmdb.org/t/p/w500${path}&fit=crop`}/>
            ) : (
                <Skeleton 
                    variant="rectangular" 
                    width="13rem" 
                    height={"20rem"}
                />
            )} 
        
        </Box>
        

    )
}