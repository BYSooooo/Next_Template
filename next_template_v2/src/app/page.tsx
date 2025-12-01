import { Title } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Container, Grid, Typography } from "@mui/material";
import MessengerCard from "../cards/MessengerCard";

export default function Page() {
    return (
            <Grid container sx={{ mt : 3}} spacing={2}>
                <MessengerCard />
                
                
            </Grid>
        
    )
}