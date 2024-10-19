import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function SearchItem({theme, inform} : {theme : boolean, inform : MovieOverview}) {

    return (
        <Box
            flexDirection={"row"} 
            borderRadius={4}
            bgcolor={theme ? grey[800] : grey[200]}>
            <Typography>
                {inform.title}
            </Typography>
        </Box>
    )
}