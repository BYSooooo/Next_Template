
import * as React from 'react';
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Grid from '@mui/material/Unstable_Grid2';
import DetailBtn from '../components/DetailBtn';

export default function MainSearch() {

    return (
        <div> 
            <Grid container spacing={2} direction='row'> 
                <Grid xs={2}>
                    <DetailBtn />
                </Grid>
                <Grid xs={8}>
                    <Input fullWidth />
                </Grid>
                <Grid xs={2}>
                    <Button variant="contained" sx={{ width: "100%", height: "100%"}}>
                        Search
                    </Button>
                </Grid>
            </Grid>       
        </div>    
    )
}