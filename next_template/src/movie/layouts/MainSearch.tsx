import { Box, Button, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { KeyboardArrowDown } from "@mui/icons-material";

export default function MainSearch() {

    return (

        <Box sx={{ m : 3 }} >
            <Grid container spacing={2}> 
                <Grid  xs>
                    <Button sx={{ width: "100%", height : "100%" }}>
                        <KeyboardArrowDown />
                        <Typography>
                            Detail
                        </Typography>
                    </Button>

                </Grid>
                <Grid xs={8}>
                    <TextField label="Search" variant="outlined" sx={{width : "100%" , height: "100%"}} />
                </Grid>
                <Grid xs>
                    <Button variant="outlined" sx={{ width: "100%", height: "100%"}}>
                        Search
                    </Button>
                </Grid>
            </Grid>

                
               
        </Box>
        
    )
}