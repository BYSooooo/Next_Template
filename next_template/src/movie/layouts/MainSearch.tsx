import { Box, Button, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { KeyboardArrowDown } from "@mui/icons-material";

export default function MainSearch() {

    return (
        <div> 
            <Grid container spacing={2}> 
                <Grid xs={2}>
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
                <Grid xs={2}>
                    <Button variant="outlined" sx={{ width: "100%", height: "100%"}}>
                        Search
                    </Button>
                </Grid>
            </Grid>       
        </div>    
    )
}