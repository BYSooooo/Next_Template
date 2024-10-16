import { Box, Button } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function ResultOverview({theme} : {theme : boolean}) {

    return (
        <Box
            width="20%" 
            height="20rem"
            sx={{
                borderRadius : 4,
                bgcolor : theme ? grey[700] : grey[300],
                p : 2
            }}> 
                {/* <Button>
                    Movie : {result[0]?.total_results}
                </Button> */}
            <Box>
            </Box>
        </Box>   
    )
}